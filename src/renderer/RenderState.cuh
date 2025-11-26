/**
 * @file RenderState.cuh
 * @brief Modern render state management with RAII
 * @author Seungwon Choi
 * @date 2025-11-26
 */

#pragma once

#include "Types.cuh"
#include "GPUBuffer.cuh"
#include <cub/cub.cuh>
#include <cub/device/device_radix_sort.cuh>

namespace gs {

//=============================================================================
// GeometryState - Per-Gaussian intermediate data
//=============================================================================

/**
 * @brief Manages per-Gaussian intermediate computation results
 * 
 * Stores preprocess output for each Gaussian:
 * - 2D positions, depths, radii
 * - 3D covariance, 2D conic
 * - RGB color from SH
 * - Tile touch counts
 */
class GeometryState {
public:
    GeometryState() = default;
    
    void allocate(int num_gaussians) {
        P_ = num_gaussians;
        
        // Per-gaussian buffers
        depths_.resize(P_);
        clamped_.resize(P_ * 3);
        internal_radii_.resize(P_);
        means2D_.resize(P_);
        cov3D_.resize(P_ * 6);
        conic_opacity_.resize(P_);
        rgb_.resize(P_ * 3);
        tiles_touched_.resize(P_);
        point_offsets_.resize(P_);
        
        // Compute scan temp storage size
        size_t temp_size = 0;
        cub::DeviceScan::InclusiveSum(nullptr, temp_size, 
            tiles_touched_.data(), point_offsets_.data(), P_);
        scan_temp_.resize((temp_size + sizeof(char) - 1) / sizeof(char));
        scan_temp_size_ = temp_size;
    }
    
    void clear() {
        // Only tiles_touched needs to be cleared before preprocess
        tiles_touched_.clear();
    }
    
    //-------------------------------------------------------------------------
    // Accessors (raw pointers for kernel access)
    //-------------------------------------------------------------------------
    
    float* depths() { return depths_.data(); }
    bool* clamped() { return clamped_.data(); }
    int* internal_radii() { return internal_radii_.data(); }
    float2* means2D() { return means2D_.data(); }
    float* cov3D() { return cov3D_.data(); }
    float4* conic_opacity() { return conic_opacity_.data(); }
    float* rgb() { return rgb_.data(); }
    uint32_t* tiles_touched() { return tiles_touched_.data(); }
    uint32_t* point_offsets() { return point_offsets_.data(); }
    
    void* scan_temp() { return scan_temp_.data(); }
    size_t scan_temp_size() const { return scan_temp_size_; }
    
    int num_gaussians() const { return P_; }

private:
    int P_ = 0;
    
    GPUBuffer<float> depths_;
    GPUBuffer<bool> clamped_;
    GPUBuffer<int> internal_radii_;
    GPUBuffer<float2> means2D_;
    GPUBuffer<float> cov3D_;
    GPUBuffer<float4> conic_opacity_;
    GPUBuffer<float> rgb_;
    GPUBuffer<uint32_t> tiles_touched_;
    GPUBuffer<uint32_t> point_offsets_;
    GPUBuffer<char> scan_temp_;
    size_t scan_temp_size_ = 0;
};

//=============================================================================
// BinningState - Tile-sorted Gaussian list
//=============================================================================

/**
 * @brief Manages tile-based binning of Gaussians
 * 
 * After preprocess, Gaussians are sorted by tile ID and depth.
 * This allows efficient per-tile rendering.
 */
class BinningState {
public:
    BinningState() = default;
    
    void allocate(int num_rendered) {
        N_ = num_rendered;
        
        point_list_.resize(N_);
        point_list_unsorted_.resize(N_);
        point_list_keys_.resize(N_);
        point_list_keys_unsorted_.resize(N_);
        
        // Compute sort temp storage size
        size_t temp_size = 0;
        cub::DeviceRadixSort::SortPairs(
            nullptr, temp_size,
            point_list_keys_unsorted_.data(), point_list_keys_.data(),
            point_list_unsorted_.data(), point_list_.data(), N_);
        sort_temp_.resize((temp_size + sizeof(char) - 1) / sizeof(char));
        sort_temp_size_ = temp_size;
    }
    
    //-------------------------------------------------------------------------
    // Accessors
    //-------------------------------------------------------------------------
    
    uint32_t* point_list() { return point_list_.data(); }
    uint32_t* point_list_unsorted() { return point_list_unsorted_.data(); }
    uint64_t* point_list_keys() { return point_list_keys_.data(); }
    uint64_t* point_list_keys_unsorted() { return point_list_keys_unsorted_.data(); }
    
    void* sort_temp() { return sort_temp_.data(); }
    size_t sort_temp_size() const { return sort_temp_size_; }
    
    int num_rendered() const { return N_; }

private:
    int N_ = 0;
    
    GPUBuffer<uint32_t> point_list_;
    GPUBuffer<uint32_t> point_list_unsorted_;
    GPUBuffer<uint64_t> point_list_keys_;
    GPUBuffer<uint64_t> point_list_keys_unsorted_;
    GPUBuffer<char> sort_temp_;
    size_t sort_temp_size_ = 0;
};

//=============================================================================
// ImageState - Per-pixel data
//=============================================================================

/**
 * @brief Manages per-pixel intermediate and output data
 */
class ImageState {
public:
    ImageState() = default;
    
    void allocate(int width, int height, int num_tiles) {
        width_ = width;
        height_ = height;
        num_pixels_ = width * height;
        num_tiles_ = num_tiles;
        
        accum_alpha_.resize(num_pixels_);
        n_contrib_.resize(num_pixels_);
        ranges_.resize(num_tiles_);
    }
    
    void clear() {
        ranges_.clear();
    }
    
    //-------------------------------------------------------------------------
    // Accessors
    //-------------------------------------------------------------------------
    
    float* accum_alpha() { return accum_alpha_.data(); }
    uint32_t* n_contrib() { return n_contrib_.data(); }
    uint2* ranges() { return ranges_.data(); }
    
    int width() const { return width_; }
    int height() const { return height_; }
    int num_pixels() const { return num_pixels_; }
    int num_tiles() const { return num_tiles_; }

private:
    int width_ = 0;
    int height_ = 0;
    int num_pixels_ = 0;
    int num_tiles_ = 0;
    
    GPUBuffer<float> accum_alpha_;
    GPUBuffer<uint32_t> n_contrib_;
    GPUBuffer<uint2> ranges_;
};

//=============================================================================
// RenderState - Combined state manager
//=============================================================================

/**
 * @brief Unified render state manager
 * 
 * Combines geometry, binning, and image states into a single interface.
 * Handles allocation and provides convenient access.
 */
class RenderState {
public:
    RenderState() = default;
    
    /**
     * @brief Prepare geometry state for rendering
     */
    void prepareGeometry(int num_gaussians) {
        geometry_.allocate(num_gaussians);
        geometry_.clear();
    }
    
    /**
     * @brief Prepare image state for rendering
     */
    void prepareImage(int width, int height) {
        dim3 tile_grid((width + BLOCK_X - 1) / BLOCK_X, 
                       (height + BLOCK_Y - 1) / BLOCK_Y, 1);
        int num_tiles = tile_grid.x * tile_grid.y;
        
        image_.allocate(width, height, num_tiles);
        image_.clear();
        
        tile_grid_ = tile_grid;
    }
    
    /**
     * @brief Prepare binning state after preprocess
     */
    void prepareBinning(int num_rendered) {
        binning_.allocate(num_rendered);
    }
    
    //-------------------------------------------------------------------------
    // Accessors
    //-------------------------------------------------------------------------
    
    GeometryState& geometry() { return geometry_; }
    BinningState& binning() { return binning_; }
    ImageState& image() { return image_; }
    
    const GeometryState& geometry() const { return geometry_; }
    const BinningState& binning() const { return binning_; }
    const ImageState& image() const { return image_; }
    
    dim3 tileGrid() const { return tile_grid_; }
    
private:
    GeometryState geometry_;
    BinningState binning_;
    ImageState image_;
    dim3 tile_grid_{0, 0, 0};
};

} // namespace gs
