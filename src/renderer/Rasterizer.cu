/**
 * @file Rasterizer.cu
 * @brief Modern Gaussian Splatting Rasterizer (Implementation)
 * @author Seungwon Choi
 * @date 2025-11-26
 */

#include "Rasterizer.cuh"
#include "Kernels.cuh"

#include <cub/cub.cuh>
#include <cub/device/device_radix_sort.cuh>

namespace gs {

//=============================================================================
// Utility Functions
//=============================================================================

uint32_t getHigherMsb(uint32_t n) {
    uint32_t msb = sizeof(n) * 4;
    uint32_t step = msb;
    while (step > 1) {
        step /= 2;
        if (n >> msb) msb += step;
        else msb -= step;
    }
    if (n >> msb) msb++;
    return msb;
}

//=============================================================================
// GaussianRasterizer Implementation
//=============================================================================

void GaussianRasterizer::setup(int width, int height, int num_gaussians) {
    width_ = width;
    height_ = height;
    num_gaussians_ = num_gaussians;

    // Allocate internal radii buffer
    radii_.resize(num_gaussians);
    
    // Setup render state
    state_.prepareGeometry(num_gaussians);
    state_.prepareImage(width, height);
}

int GaussianRasterizer::render(
    const GaussianParams& gaussians,
    const CameraParams& camera,
    const RenderSettings& settings,
    RenderOutput& output
) {
    const int P = gaussians.num_gaussians;
    const int D = gaussians.sh_degree;
    const int M = gaussians.num_sh_coeffs;

    const float focal_x = camera.focal_x;
    const float focal_y = camera.focal_y;

    dim3 tile_grid = state_.tileGrid();
    auto& geom = state_.geometry();
    auto& img = state_.image();

    // Use provided radii buffer or internal one
    int* radii = output.radii ? output.radii : radii_.data();

    //-------------------------------------------------------------------------
    // Stage 1: Preprocess
    //-------------------------------------------------------------------------
    
    geom.clear();  // Clear tiles_touched
    
    int block_size = 256;
    int grid_size = (P + block_size - 1) / block_size;
    
    kernels::preprocessKernel<NUM_CHANNELS><<<grid_size, block_size>>>(
        P, D, M,
        gaussians.means3D,
        gaussians.scales,
        settings.scale_modifier,
        gaussians.rotations,
        gaussians.opacities,
        gaussians.shs,
        geom.clamped(),
        camera.viewmatrix,
        camera.projmatrix,
        camera.campos,
        camera.width, camera.height,
        camera.tan_fovx, camera.tan_fovy,
        focal_x, focal_y,
        radii,
        geom.means2D(),
        geom.depths(),
        geom.cov3D(),
        geom.rgb(),
        geom.conic_opacity(),
        tile_grid,
        geom.tiles_touched(),
        settings.prefiltered
    );
    CUDA_CHECK(cudaGetLastError());

    //-------------------------------------------------------------------------
    // Stage 2: Prefix Sum (tile counts -> offsets)
    //-------------------------------------------------------------------------
    
    size_t scan_temp_size = geom.scan_temp_size();
    CUDA_CHECK(cub::DeviceScan::InclusiveSum(
        geom.scan_temp(), 
        scan_temp_size,
        geom.tiles_touched(), 
        geom.point_offsets(), 
        P
    ));

    // Get total number of rendered instances
    int num_rendered;
    CUDA_CHECK(cudaMemcpy(&num_rendered, geom.point_offsets() + P - 1, 
                          sizeof(int), cudaMemcpyDeviceToHost));

    if (num_rendered == 0) {
        // Clear output with background
        return 0;
    }

    //-------------------------------------------------------------------------
    // Stage 3: Binning (tile sorting)
    //-------------------------------------------------------------------------
    
    state_.prepareBinning(num_rendered);
    auto& binning = state_.binning();

    // Generate keys
    kernels::duplicateWithKeysKernel<<<(P + 255) / 256, 256>>>(
        P,
        geom.means2D(),
        geom.depths(),
        geom.point_offsets(),
        binning.point_list_keys_unsorted(),
        binning.point_list_unsorted(),
        radii,
        tile_grid
    );
    CUDA_CHECK(cudaGetLastError());

    // Sort by tile ID and depth
    int bit = getHigherMsb(tile_grid.x * tile_grid.y);
    size_t sort_temp_size = binning.sort_temp_size();
    
    CUDA_CHECK(cub::DeviceRadixSort::SortPairs(
        binning.sort_temp(),
        sort_temp_size,
        binning.point_list_keys_unsorted(),
        binning.point_list_keys(),
        binning.point_list_unsorted(),
        binning.point_list(),
        num_rendered,
        0, 32 + bit
    ));

    // Identify tile ranges
    img.clear();  // Clear ranges
    
    if (num_rendered > 0) {
        kernels::identifyTileRangesKernel<<<(num_rendered + 255) / 256, 256>>>(
            num_rendered,
            binning.point_list_keys(),
            img.ranges()
        );
        CUDA_CHECK(cudaGetLastError());
    }

    //-------------------------------------------------------------------------
    // Stage 4: Render
    //-------------------------------------------------------------------------
    
    dim3 render_block(BLOCK_X, BLOCK_Y, 1);
    
    kernels::renderKernel<NUM_CHANNELS><<<tile_grid, render_block>>>(
        img.ranges(),
        binning.point_list(),
        camera.width, camera.height,
        geom.means2D(),
        geom.rgb(),
        geom.conic_opacity(),
        img.accum_alpha(),
        img.n_contrib(),
        settings.background,
        output.color,
        geom.depths(),
        output.depth
    );
    CUDA_CHECK(cudaGetLastError());

    return num_rendered;
}

} // namespace gs
