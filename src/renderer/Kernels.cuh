/**
 * @file Kernels.cuh
 * @brief CUDA kernel declarations for Gaussian Splatting
 * @author Seungwon Choi
 * @date 2025-11-26
 */

#pragma once

#include "Types.cuh"
#include <cooperative_groups.h>

namespace gs {
namespace kernels {

//=============================================================================
// Device Helper Functions (inline in header)
//=============================================================================

/**
 * @brief Compute RGB color from spherical harmonics
 */
__device__ void evaluateSH(
    int idx, 
    int deg, 
    int max_coeffs,
    const float* means, 
    const float* campos, 
    const float* shs,
    bool* clamped, 
    float* rgb
);

/**
 * @brief Compute 3D covariance matrix from scale and rotation
 */
__device__ void computeCov3D(
    const float* scale, 
    float mod, 
    const float* rot, 
    float* cov3D
);

/**
 * @brief Project 3D covariance to 2D screen space
 */
__device__ float3 computeCov2D(
    const float3& mean, 
    float focal_x, float focal_y,
    float tan_fovx, float tan_fovy, 
    const float* cov3D, 
    const float* viewmatrix
);

/**
 * @brief Check if point is inside view frustum
 */
__device__ bool inFrustum(
    int idx,
    const float* orig_points,
    const float* viewmatrix,
    const float* projmatrix,
    bool prefiltered,
    float3& p_view
);

//=============================================================================
// Kernel Declarations
//=============================================================================

/**
 * @brief Preprocess Gaussians: project, compute cov2D, SH to RGB
 */
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
);

/**
 * @brief Generate key/value pairs for tile-sorting
 */
__global__ void duplicateWithKeysKernel(
    int P,
    const float2* __restrict__ points_xy,
    const float* __restrict__ depths,
    const uint32_t* __restrict__ offsets,
    uint64_t* __restrict__ gaussian_keys_unsorted,
    uint32_t* __restrict__ gaussian_values_unsorted,
    int* __restrict__ radii,
    dim3 grid
);

/**
 * @brief Identify start/end indices for each tile in sorted list
 */
__global__ void identifyTileRangesKernel(
    int L,
    const uint64_t* __restrict__ point_list_keys,
    uint2* __restrict__ ranges
);

/**
 * @brief Tile-based alpha-blending render kernel
 */
template <uint32_t CHANNELS>
__global__ void renderKernel(
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
