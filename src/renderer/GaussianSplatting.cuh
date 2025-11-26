/**
 * @file GaussianSplatting.cuh
 * @brief Single-header include for Gaussian Splatting CUDA implementation
 * @author Seungwon Choi
 * @date 2025-11-26
 * 
 * Modern C++/CUDA implementation of 3D Gaussian Splatting for real-time
 * radiance field rendering.
 * 
 * Usage:
 * ```cpp
 * #include "cuda_ours/GaussianSplatting.cuh"
 * 
 * // Create rasterizer
 * gs::GaussianRasterizer rasterizer;
 * rasterizer.setup(width, height, num_gaussians);
 * 
 * // Prepare input parameters
 * gs::GaussianParams gaussians{...};
 * gs::CameraParams camera{...};
 * gs::RenderSettings settings{...};
 * gs::RenderOutput output{...};
 * 
 * // Render
 * int num_rendered = rasterizer.render(gaussians, camera, settings, output);
 * ```
 * 
 * Features:
 * - RAII-based GPU memory management (GPUBuffer)
 * - Modern C++ style with namespaces
 * - Clean separation of concerns
 * - Type-safe interfaces
 * - Efficient tile-based rendering
 * - Spherical harmonics evaluation (up to degree 3)
 * 
 * Based on: 3D Gaussian Splatting for Real-Time Radiance Field Rendering
 * Original implementation: GRAPHDECO research group, Inria
 */

#pragma once

// Core types and constants
#include "Types.cuh"

// GPU memory management
#include "GPUBuffer.cuh"

// Render state management
#include "RenderState.cuh"

// CUDA kernels
#include "Kernels.cuh"

// Main rasterizer interface
#include "Rasterizer.cuh"

namespace gs {

/**
 * @brief Library version
 */
constexpr int VERSION_MAJOR = 1;
constexpr int VERSION_MINOR = 0;
constexpr int VERSION_PATCH = 0;

/**
 * @brief Get library version string
 */
inline const char* getVersionString() {
    return "1.0.0";
}

/**
 * @brief Initialize CUDA context (call once at startup)
 */
inline void initialize() {
    // Set CUDA device (use device 0 by default)
    cudaSetDevice(0);
    
    // Enable peer access if multiple GPUs
    int device_count;
    cudaGetDeviceCount(&device_count);
    (void)device_count;  // Unused for now
}

} // namespace gs
