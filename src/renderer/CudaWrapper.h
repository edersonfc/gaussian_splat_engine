/**
 * @file CudaWrapper.h
 * @brief C++ header for CUDA Gaussian Splatting wrapper functions
 * @author Seungwon Choi
 * @date 2025-11-26
 * 
 * This header declares functions that can be called from regular C++ code
 * to use the CUDA Gaussian Splatting implementation.
 */

#pragma once

#include <cstddef>

namespace gs {

//=============================================================================
// Initialization
//=============================================================================

void wrapper_initialize();
void wrapper_shutdown();

//=============================================================================
// Rasterizer Interface
//=============================================================================

/**
 * @brief Setup the rasterizer for given image size and gaussian count
 */
bool wrapper_setup_rasterizer(int width, int height, int num_gaussians);

/**
 * @brief Render gaussians to image
 * @return Number of rendered gaussians, or -1 on error
 */
int wrapper_render(
    // Gaussian data (device pointers)
    float* d_means3D,
    float* d_shs,
    float* d_opacities,
    float* d_scales,
    float* d_rotations,
    int P,
    int sh_degree,
    int M,
    // Camera data (device pointers)
    float* d_viewmatrix,
    float* d_projmatrix,
    float* d_campos,
    int width, int height,
    float tan_fovx, float tan_fovy,
    float focal_x, float focal_y,
    // Settings
    float scale_modifier,
    bool prefiltered,
    bool antialiasing,
    float* d_background,
    // Output (device pointers)
    float* d_out_color,
    float* d_out_depth
);

//=============================================================================
// GPU Memory Helpers
//=============================================================================

void* wrapper_gpu_alloc(size_t bytes);
void wrapper_gpu_free(void* ptr);
void wrapper_gpu_upload(void* d_ptr, const void* h_ptr, size_t bytes);
void wrapper_gpu_download(void* h_ptr, const void* d_ptr, size_t bytes);
void wrapper_gpu_clear(void* d_ptr, size_t bytes);
void wrapper_gpu_sync();

} // namespace gs
