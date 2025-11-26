/**
 * @file Kernels.cu
 * @brief CUDA kernel implementations for Gaussian Splatting
 * @author Seungwon Choi
 * @date 2025-11-26
 */

#include "Kernels.cuh"
#include <cooperative_groups.h>
#include <cooperative_groups/reduce.h>

namespace cg = cooperative_groups;

namespace gs {
namespace kernels {

//=============================================================================
// Spherical Harmonics Evaluation
//=============================================================================

__device__ void evaluateSH(
    int idx, 
    int deg, 
    int max_coeffs,
    const float* means, 
    const float* campos, 
    const float* shs,
    bool* clamped, 
    float* rgb
) {
    // View direction
    float3 pos = make_float3(means[3*idx], means[3*idx+1], means[3*idx+2]);
    float3 cam = make_float3(campos[0], campos[1], campos[2]);
    float3 dir = make_float3(pos.x - cam.x, pos.y - cam.y, pos.z - cam.z);
    
    float len = sqrtf(dir.x*dir.x + dir.y*dir.y + dir.z*dir.z);
    dir.x /= len; dir.y /= len; dir.z /= len;

    const float* sh = shs + idx * max_coeffs * 3;
    
    // DC term (l=0)
    float result[3] = { 
        sh::C0 * sh[0], 
        sh::C0 * sh[1], 
        sh::C0 * sh[2] 
    };

    // l=1 terms
    if (deg > 0) {
        float x = dir.x, y = dir.y, z = dir.z;
        result[0] += -sh::C1 * y * sh[3] + sh::C1 * z * sh[6] - sh::C1 * x * sh[9];
        result[1] += -sh::C1 * y * sh[4] + sh::C1 * z * sh[7] - sh::C1 * x * sh[10];
        result[2] += -sh::C1 * y * sh[5] + sh::C1 * z * sh[8] - sh::C1 * x * sh[11];

        // l=2 terms
        if (deg > 1) {
            float xx = x*x, yy = y*y, zz = z*z;
            float xy = x*y, yz = y*z, xz = x*z;
            
            result[0] += sh::C2[0] * xy * sh[12] + sh::C2[1] * yz * sh[15] + 
                         sh::C2[2] * (2.0f*zz - xx - yy) * sh[18] +
                         sh::C2[3] * xz * sh[21] + sh::C2[4] * (xx - yy) * sh[24];
            result[1] += sh::C2[0] * xy * sh[13] + sh::C2[1] * yz * sh[16] + 
                         sh::C2[2] * (2.0f*zz - xx - yy) * sh[19] +
                         sh::C2[3] * xz * sh[22] + sh::C2[4] * (xx - yy) * sh[25];
            result[2] += sh::C2[0] * xy * sh[14] + sh::C2[1] * yz * sh[17] + 
                         sh::C2[2] * (2.0f*zz - xx - yy) * sh[20] +
                         sh::C2[3] * xz * sh[23] + sh::C2[4] * (xx - yy) * sh[26];

            // l=3 terms
            if (deg > 2) {
                result[0] += sh::C3[0] * y * (3.0f*xx - yy) * sh[27] +
                             sh::C3[1] * xy * z * sh[30] +
                             sh::C3[2] * y * (4.0f*zz - xx - yy) * sh[33] +
                             sh::C3[3] * z * (2.0f*zz - 3.0f*xx - 3.0f*yy) * sh[36] +
                             sh::C3[4] * x * (4.0f*zz - xx - yy) * sh[39] +
                             sh::C3[5] * z * (xx - yy) * sh[42] +
                             sh::C3[6] * x * (xx - 3.0f*yy) * sh[45];
                result[1] += sh::C3[0] * y * (3.0f*xx - yy) * sh[28] +
                             sh::C3[1] * xy * z * sh[31] +
                             sh::C3[2] * y * (4.0f*zz - xx - yy) * sh[34] +
                             sh::C3[3] * z * (2.0f*zz - 3.0f*xx - 3.0f*yy) * sh[37] +
                             sh::C3[4] * x * (4.0f*zz - xx - yy) * sh[40] +
                             sh::C3[5] * z * (xx - yy) * sh[43] +
                             sh::C3[6] * x * (xx - 3.0f*yy) * sh[46];
                result[2] += sh::C3[0] * y * (3.0f*xx - yy) * sh[29] +
                             sh::C3[1] * xy * z * sh[32] +
                             sh::C3[2] * y * (4.0f*zz - xx - yy) * sh[35] +
                             sh::C3[3] * z * (2.0f*zz - 3.0f*xx - 3.0f*yy) * sh[38] +
                             sh::C3[4] * x * (4.0f*zz - xx - yy) * sh[41] +
                             sh::C3[5] * z * (xx - yy) * sh[44] +
                             sh::C3[6] * x * (xx - 3.0f*yy) * sh[47];
            }
        }
    }

    // Shift to [0.5, ...] and clamp
    result[0] += 0.5f;
    result[1] += 0.5f;
    result[2] += 0.5f;

    clamped[3*idx + 0] = (result[0] < 0);
    clamped[3*idx + 1] = (result[1] < 0);
    clamped[3*idx + 2] = (result[2] < 0);
    
    rgb[idx*3 + 0] = fmaxf(result[0], 0.0f);
    rgb[idx*3 + 1] = fmaxf(result[1], 0.0f);
    rgb[idx*3 + 2] = fmaxf(result[2], 0.0f);
}

//=============================================================================
// 3D Covariance Computation
//=============================================================================

__device__ void computeCov3D(
    const float* scale, 
    float mod, 
    const float* rot, 
    float* cov3D
) {
    // Scaling matrix
    float S[9] = {
        mod * scale[0], 0, 0,
        0, mod * scale[1], 0,
        0, 0, mod * scale[2]
    };

    // Quaternion to rotation matrix
    float r = rot[0], x = rot[1], y = rot[2], z = rot[3];
    
    float R[9] = {
        1.f - 2.f*(y*y + z*z), 2.f*(x*y - r*z), 2.f*(x*z + r*y),
        2.f*(x*y + r*z), 1.f - 2.f*(x*x + z*z), 2.f*(y*z - r*x),
        2.f*(x*z - r*y), 2.f*(y*z + r*x), 1.f - 2.f*(x*x + y*y)
    };

    // M = S * R
    float M[9];
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            M[i*3 + j] = S[i*3 + 0] * R[0*3 + j] + 
                         S[i*3 + 1] * R[1*3 + j] + 
                         S[i*3 + 2] * R[2*3 + j];
        }
    }

    // Sigma = M^T * M (symmetric, store upper triangle)
    cov3D[0] = M[0]*M[0] + M[3]*M[3] + M[6]*M[6]; // [0,0]
    cov3D[1] = M[0]*M[1] + M[3]*M[4] + M[6]*M[7]; // [0,1]
    cov3D[2] = M[0]*M[2] + M[3]*M[5] + M[6]*M[8]; // [0,2]
    cov3D[3] = M[1]*M[1] + M[4]*M[4] + M[7]*M[7]; // [1,1]
    cov3D[4] = M[1]*M[2] + M[4]*M[5] + M[7]*M[8]; // [1,2]
    cov3D[5] = M[2]*M[2] + M[5]*M[5] + M[8]*M[8]; // [2,2]
}

//=============================================================================
// 2D Covariance Computation (Projection)
//=============================================================================

__device__ float3 computeCov2D(
    const float3& mean, 
    float focal_x, float focal_y,
    float tan_fovx, float tan_fovy, 
    const float* cov3D, 
    const float* viewmatrix
) {
    // Transform to view space
    float3 t = transformPoint4x3(mean, viewmatrix);

    // Clamp to frustum
    const float limx = 1.3f * tan_fovx;
    const float limy = 1.3f * tan_fovy;
    t.x = fminf(limx, fmaxf(-limx, t.x / t.z)) * t.z;
    t.y = fminf(limy, fmaxf(-limy, t.y / t.z)) * t.z;

    // Jacobian of projection
    float J[6] = {
        focal_x / t.z, 0.0f, -(focal_x * t.x) / (t.z * t.z),
        0.0f, focal_y / t.z, -(focal_y * t.y) / (t.z * t.z)
    };

    // View rotation matrix (transposed from viewmatrix)
    float W[9] = {
        viewmatrix[0], viewmatrix[4], viewmatrix[8],
        viewmatrix[1], viewmatrix[5], viewmatrix[9],
        viewmatrix[2], viewmatrix[6], viewmatrix[10]
    };

    // T = W * J^T (transformed Jacobian)
    float T[6];
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            T[i*3 + j] = W[j] * J[i*3] + W[3+j] * J[i*3+1] + W[6+j] * J[i*3+2];
        }
    }

    // 3D covariance (symmetric)
    float Vrk[9] = {
        cov3D[0], cov3D[1], cov3D[2],
        cov3D[1], cov3D[3], cov3D[4],
        cov3D[2], cov3D[4], cov3D[5]
    };

    // cov2D = T^T * Vrk * T
    float temp[6];
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            temp[i*2 + j] = Vrk[i*3+0] * T[j*3+0] + 
                           Vrk[i*3+1] * T[j*3+1] + 
                           Vrk[i*3+2] * T[j*3+2];
        }
    }
    
    float cov00 = T[0]*temp[0] + T[1]*temp[2] + T[2]*temp[4];
    float cov01 = T[0]*temp[1] + T[1]*temp[3] + T[2]*temp[5];
    float cov11 = T[3]*temp[1] + T[4]*temp[3] + T[5]*temp[5];

    // Low-pass filter for anti-aliasing
    cov00 += 0.3f;
    cov11 += 0.3f;
    
    return make_float3(cov00, cov01, cov11);
}

//=============================================================================
// Frustum Culling
//=============================================================================

__device__ bool inFrustum(
    int idx,
    const float* orig_points,
    const float* viewmatrix,
    const float* projmatrix,
    bool prefiltered,
    float3& p_view
) {
    float3 p_orig = make_float3(
        orig_points[3*idx], 
        orig_points[3*idx+1], 
        orig_points[3*idx+2]
    );

    // Transform to view space
    p_view = transformPoint4x3(p_orig, viewmatrix);
    if (p_view.z <= 0.2f)
        return false;

    if (prefiltered)
        return true;

    // Transform to clip space
    float4 p_hom = transformPoint4x4(p_orig, projmatrix);
    float p_w = 1.0f / (p_hom.w + 1e-7f);

    // NDC coordinates
    float3 p_proj = make_float3(p_hom.x * p_w, p_hom.y * p_w, p_hom.z * p_w);

    return (p_proj.x >= -1.3f && p_proj.x <= 1.3f &&
            p_proj.y >= -1.3f && p_proj.y <= 1.3f);
}

//=============================================================================
// Preprocess Kernel
//=============================================================================

template<int C>
__global__ void preprocessKernel(
    int P, int D, int M,
    const float* __restrict__ orig_points,
    const float* __restrict__ scales,
    float scale_modifier,
    const float* __restrict__ rotations,
    const float* __restrict__ opacities,
    const float* __restrict__ shs,
    bool* __restrict__ clamped,
    const float* __restrict__ viewmatrix,
    const float* __restrict__ projmatrix,
    const float* __restrict__ cam_pos,
    int W, int H,
    float tan_fovx, float tan_fovy,
    float focal_x, float focal_y,
    int* __restrict__ radii,
    float2* __restrict__ points_xy_image,
    float* __restrict__ depths,
    float* __restrict__ cov3Ds,
    float* __restrict__ rgb,
    float4* __restrict__ conic_opacity,
    dim3 grid,
    uint32_t* __restrict__ tiles_touched,
    bool prefiltered
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= P) return;

    // Initialize outputs
    radii[idx] = 0;
    tiles_touched[idx] = 0;

    // Frustum culling
    float3 p_view;
    if (!inFrustum(idx, orig_points, viewmatrix, projmatrix, prefiltered, p_view))
        return;

    // Project to screen
    float3 p_orig = make_float3(
        orig_points[3*idx], 
        orig_points[3*idx+1], 
        orig_points[3*idx+2]
    );
    float4 p_hom = transformPoint4x4(p_orig, projmatrix);
    float p_w = 1.0f / (p_hom.w + 1e-7f);
    float3 p_proj = make_float3(p_hom.x * p_w, p_hom.y * p_w, p_hom.z * p_w);

    // Compute 3D covariance
    computeCov3D(scales + idx*3, scale_modifier, rotations + idx*4, cov3Ds + idx*6);

    // Compute 2D covariance
    float3 cov = computeCov2D(p_orig, focal_x, focal_y, tan_fovx, tan_fovy, 
                              cov3Ds + idx*6, viewmatrix);

    // Invert covariance to get conic
    float det = cov.x * cov.z - cov.y * cov.y;
    if (det == 0.0f) return;
    
    float det_inv = 1.f / det;
    float3 conic = make_float3(cov.z * det_inv, -cov.y * det_inv, cov.x * det_inv);

    // Compute screen-space radius from eigenvalues
    float mid = 0.5f * (cov.x + cov.z);
    float lambda1 = mid + sqrtf(fmaxf(0.1f, mid*mid - det));
    float lambda2 = mid - sqrtf(fmaxf(0.1f, mid*mid - det));
    float my_radius = ceilf(3.f * sqrtf(fmaxf(lambda1, lambda2)));

    // NDC to pixel coordinates
    float2 point_image = make_float2(ndc2Pix(p_proj.x, W), ndc2Pix(p_proj.y, H));
    
    // Compute tile overlap
    uint2 rect_min, rect_max;
    getTileRect(point_image, my_radius, grid, rect_min, rect_max);
    
    uint32_t tile_count = (rect_max.x - rect_min.x) * (rect_max.y - rect_min.y);
    if (tile_count == 0) return;

    // Evaluate spherical harmonics
    evaluateSH(idx, D, M, orig_points, cam_pos, shs, clamped, rgb);

    // Write outputs
    depths[idx] = p_view.z;
    radii[idx] = my_radius;
    points_xy_image[idx] = point_image;
    conic_opacity[idx] = make_float4(conic.x, conic.y, conic.z, opacities[idx]);
    tiles_touched[idx] = tile_count;
}

// Explicit instantiation
template __global__ void preprocessKernel<3>(
    int P, int D, int M,
    const float* __restrict__ orig_points,
    const float* __restrict__ scales,
    float scale_modifier,
    const float* __restrict__ rotations,
    const float* __restrict__ opacities,
    const float* __restrict__ shs,
    bool* __restrict__ clamped,
    const float* __restrict__ viewmatrix,
    const float* __restrict__ projmatrix,
    const float* __restrict__ cam_pos,
    int W, int H,
    float tan_fovx, float tan_fovy,
    float focal_x, float focal_y,
    int* __restrict__ radii,
    float2* __restrict__ points_xy_image,
    float* __restrict__ depths,
    float* __restrict__ cov3Ds,
    float* __restrict__ rgb,
    float4* __restrict__ conic_opacity,
    dim3 grid,
    uint32_t* __restrict__ tiles_touched,
    bool prefiltered
);

//=============================================================================
// Duplicate with Keys Kernel
//=============================================================================

__global__ void duplicateWithKeysKernel(
    int P,
    const float2* __restrict__ points_xy,
    const float* __restrict__ depths,
    const uint32_t* __restrict__ offsets,
    uint64_t* __restrict__ gaussian_keys_unsorted,
    uint32_t* __restrict__ gaussian_values_unsorted,
    int* __restrict__ radii,
    dim3 grid
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= P) return;

    if (radii[idx] > 0) {
        uint32_t off = (idx == 0) ? 0 : offsets[idx - 1];
        uint2 rect_min, rect_max;
        getTileRect(points_xy[idx], radii[idx], grid, rect_min, rect_max);

        for (uint32_t y = rect_min.y; y < rect_max.y; y++) {
            for (uint32_t x = rect_min.x; x < rect_max.x; x++) {
                uint64_t key = y * grid.x + x;
                key <<= 32;
                key |= *((uint32_t*)&depths[idx]);
                gaussian_keys_unsorted[off] = key;
                gaussian_values_unsorted[off] = idx;
                off++;
            }
        }
    }
}

//=============================================================================
// Identify Tile Ranges Kernel
//=============================================================================

__global__ void identifyTileRangesKernel(
    int L,
    const uint64_t* __restrict__ point_list_keys,
    uint2* __restrict__ ranges
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= L) return;

    uint64_t key = point_list_keys[idx];
    uint32_t currtile = key >> 32;

    if (idx == 0) {
        ranges[currtile].x = 0;
    } else {
        uint32_t prevtile = point_list_keys[idx - 1] >> 32;
        if (currtile != prevtile) {
            ranges[prevtile].y = idx;
            ranges[currtile].x = idx;
        }
    }
    
    if (idx == L - 1) {
        ranges[currtile].y = L;
    }
}

//=============================================================================
// Render Kernel
//=============================================================================

template <uint32_t CHANNELS>
__global__ void __launch_bounds__(BLOCK_X * BLOCK_Y)
renderKernel(
    const uint2* __restrict__ ranges,
    const uint32_t* __restrict__ point_list,
    int W, int H,
    const float2* __restrict__ points_xy_image,
    const float* __restrict__ features,
    const float4* __restrict__ conic_opacity,
    float* __restrict__ final_T,
    uint32_t* __restrict__ n_contrib,
    const float* __restrict__ bg_color,
    float* __restrict__ out_color,
    const float* __restrict__ depth,
    float* __restrict__ out_depth
) {
    auto block = cg::this_thread_block();
    
    uint32_t horizontal_blocks = (W + BLOCK_X - 1) / BLOCK_X;
    uint2 pix_min = make_uint2(block.group_index().x * BLOCK_X, 
                               block.group_index().y * BLOCK_Y);
    uint2 pix_max = make_uint2(min(pix_min.x + BLOCK_X, (uint32_t)W), 
                               min(pix_min.y + BLOCK_Y, (uint32_t)H));
    uint2 pix = make_uint2(pix_min.x + block.thread_index().x, 
                           pix_min.y + block.thread_index().y);
    uint32_t pix_id = W * pix.y + pix.x;
    float2 pixf = make_float2((float)pix.x, (float)pix.y);

    bool inside = pix.x < W && pix.y < H;
    bool done = !inside;

    // Get tile range
    uint2 range = ranges[block.group_index().y * horizontal_blocks + block.group_index().x];
    const int rounds = ((range.y - range.x + BLOCK_SIZE - 1) / BLOCK_SIZE);
    int toDo = range.y - range.x;

    // Shared memory for collective loading
    __shared__ int collected_id[BLOCK_SIZE];
    __shared__ float2 collected_xy[BLOCK_SIZE];
    __shared__ float4 collected_conic_opacity[BLOCK_SIZE];
    __shared__ float collected_depth[BLOCK_SIZE];

    // Per-pixel state
    float T = 1.0f;
    uint32_t contributor = 0;
    uint32_t last_contributor = 0;
    float C[CHANNELS] = { 0 };
    float D = 0.0f;

    // Iterate through batches
    for (int i = 0; i < rounds; i++, toDo -= BLOCK_SIZE) {
        // Early termination check
        int num_done = __syncthreads_count(done);
        if (num_done == BLOCK_SIZE) break;

        // Collectively load Gaussian data
        int progress = i * BLOCK_SIZE + block.thread_rank();
        if (range.x + progress < range.y) {
            int coll_id = point_list[range.x + progress];
            collected_id[block.thread_rank()] = coll_id;
            collected_xy[block.thread_rank()] = points_xy_image[coll_id];
            collected_conic_opacity[block.thread_rank()] = conic_opacity[coll_id];
            collected_depth[block.thread_rank()] = depth[coll_id];
        }
        block.sync();

        // Process batch
        for (int j = 0; !done && j < min(BLOCK_SIZE, toDo); j++) {
            contributor++;

            // Compute Gaussian contribution
            float2 xy = collected_xy[j];
            float2 d = make_float2(xy.x - pixf.x, xy.y - pixf.y);
            float4 con_o = collected_conic_opacity[j];
            
            float power = -0.5f * (con_o.x * d.x * d.x + con_o.z * d.y * d.y) 
                          - con_o.y * d.x * d.y;
            if (power > 0.0f) continue;

            float alpha = fminf(0.99f, con_o.w * expf(power));
            if (alpha < 1.0f / 255.0f) continue;

            // Transmittance test
            float test_T = T * (1 - alpha);
            if (test_T < 0.0001f) {
                done = true;
                continue;
            }

            // Accumulate color and depth
            for (int ch = 0; ch < CHANNELS; ch++) {
                C[ch] += features[collected_id[j] * CHANNELS + ch] * alpha * T;
            }
            D += collected_depth[j] * alpha * T;
            
            T = test_T;
            last_contributor = contributor;
        }
    }

    // Write outputs
    if (inside) {
        final_T[pix_id] = T;
        n_contrib[pix_id] = last_contributor;
        
        for (int ch = 0; ch < CHANNELS; ch++) {
            out_color[ch * H * W + pix_id] = C[ch] + T * bg_color[ch];
        }
        out_depth[pix_id] = D;
    }
}

// Explicit instantiation
template __global__ void renderKernel<3>(
    const uint2* __restrict__ ranges,
    const uint32_t* __restrict__ point_list,
    int W, int H,
    const float2* __restrict__ points_xy_image,
    const float* __restrict__ features,
    const float4* __restrict__ conic_opacity,
    float* __restrict__ final_T,
    uint32_t* __restrict__ n_contrib,
    const float* __restrict__ bg_color,
    float* __restrict__ out_color,
    const float* __restrict__ depth,
    float* __restrict__ out_depth
);

} // namespace kernels
} // namespace gs
