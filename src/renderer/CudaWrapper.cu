/**
 * @file CudaWrapper.cu
 * @brief C++ wrapper for CUDA Gaussian Splatting functions
 * @author Seungwon Choi
 * @date 2025-11-26
 * 
 * This file provides C++ linkable functions that wrap the CUDA implementation.
 * The .cu file is compiled by nvcc, but provides extern "C++" functions
 * that can be called from regular .cpp files compiled by gcc.
 */

#include "GaussianSplatting.cuh"

namespace gs {

//=============================================================================
// Global State
//=============================================================================

static bool g_initialized = false;
static GaussianRasterizer* g_rasterizer = nullptr;

//=============================================================================
// Wrapper Implementations
//=============================================================================

void wrapper_initialize() {
    if (!g_initialized) {
        initialize();
        g_initialized = true;
    }
}

void wrapper_shutdown() {
    if (g_rasterizer) {
        delete g_rasterizer;
        g_rasterizer = nullptr;
    }
    g_initialized = false;
}

bool wrapper_setup_rasterizer(int width, int height, int num_gaussians) {
    wrapper_shutdown();
    g_rasterizer = new GaussianRasterizer();
    g_rasterizer->setup(width, height, num_gaussians);
    return true;
}

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
) {
    if (!g_rasterizer) {
        return -1;
    }
    
    GaussianParams gaussians{
        d_means3D, d_shs, d_opacities, d_scales, d_rotations,
        P, sh_degree, M
    };
    
    CameraParams camera{
        d_viewmatrix, d_projmatrix, d_campos,
        width, height,
        tan_fovx, tan_fovy,
        focal_x, focal_y
    };
    
    RenderSettings settings{
        scale_modifier,
        prefiltered,
        antialiasing,
        d_background
    };
    
    RenderOutput output{
        d_out_color,
        d_out_depth,
        nullptr,
        nullptr
    };
    
    return g_rasterizer->render(gaussians, camera, settings, output);
}

//=============================================================================
// GPU Buffer Wrappers (Simple malloc/free wrappers)
//=============================================================================

void* wrapper_gpu_alloc(size_t bytes) {
    void* ptr = nullptr;
    cudaMalloc(&ptr, bytes);
    return ptr;
}

void wrapper_gpu_free(void* ptr) {
    if (ptr) cudaFree(ptr);
}

void wrapper_gpu_upload(void* d_ptr, const void* h_ptr, size_t bytes) {
    cudaMemcpy(d_ptr, h_ptr, bytes, cudaMemcpyHostToDevice);
}

void wrapper_gpu_download(void* h_ptr, const void* d_ptr, size_t bytes) {
    cudaMemcpy(h_ptr, d_ptr, bytes, cudaMemcpyDeviceToHost);
}

void wrapper_gpu_clear(void* d_ptr, size_t bytes) {
    cudaMemset(d_ptr, 0, bytes);
}

void wrapper_gpu_sync() {
    cudaDeviceSynchronize();
}

} // namespace gs
