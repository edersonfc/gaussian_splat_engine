/**
 * @file Types.cuh
 * @brief Modern type definitions for Gaussian Splatting
 * @author Seungwon Choi
 * @date 2025-11-26
 */

#pragma once

#include <cuda_runtime.h>
#include <cstdint>

namespace gs {

//=============================================================================
// Constants
//=============================================================================

constexpr int BLOCK_X = 16;
constexpr int BLOCK_Y = 16;
constexpr int BLOCK_SIZE = BLOCK_X * BLOCK_Y;
constexpr int NUM_CHANNELS = 3;
constexpr int NUM_WARPS = BLOCK_SIZE / 32;

//=============================================================================
// Spherical Harmonics Coefficients
//=============================================================================

namespace sh {
    __device__ constexpr float C0 = 0.28209479177387814f;
    __device__ constexpr float C1 = 0.4886025119029199f;
    
    __device__ constexpr float C2[5] = {
        1.0925484305920792f,
        -1.0925484305920792f,
        0.31539156525252005f,
        -1.0925484305920792f,
        0.5462742152960396f
    };
    
    __device__ constexpr float C3[7] = {
        -0.5900435899266435f,
        2.890611442640554f,
        -0.4570457994644658f,
        0.3731763325901154f,
        -0.4570457994644658f,
        1.445305721320277f,
        -0.5900435899266435f
    };
}

//=============================================================================
// Gaussian Parameters (Input)
//=============================================================================

struct GaussianParams {
    const float* means3D;      // [P, 3] - 3D positions
    const float* shs;          // [P, M, 3] - Spherical harmonics
    const float* opacities;    // [P] - Opacity values (after sigmoid)
    const float* scales;       // [P, 3] - Scale values (after exp)
    const float* rotations;    // [P, 4] - Quaternion rotations
    
    int num_gaussians;         // P
    int sh_degree;             // Maximum SH degree
    int num_sh_coeffs;         // M = (sh_degree + 1)^2
};

//=============================================================================
// Camera Parameters
//=============================================================================

struct CameraParams {
    const float* viewmatrix;   // [4, 4] - World to camera
    const float* projmatrix;   // [4, 4] - Full projection (proj * view)
    const float* campos;       // [3] - Camera position in world
    
    int width;                 // Image width
    int height;                // Image height
    float tan_fovx;            // tan(fov_x / 2)
    float tan_fovy;            // tan(fov_y / 2)
    float focal_x;             // Focal length x
    float focal_y;             // Focal length y
};

//=============================================================================
// Render Settings
//=============================================================================

struct RenderSettings {
    float scale_modifier = 1.0f;
    bool prefiltered = false;
    bool debug = false;
    float* background = nullptr;  // [3] - Background color
};

//=============================================================================
// Output Buffers
//=============================================================================

struct RenderOutput {
    float* color;              // [H, W, 3] or [3, H, W] - RGB image
    float* depth;              // [H, W] - Depth map (optional)
    int* radii;                // [P] - Projected radii (optional)
    int* n_touched;            // [P] - Number of tiles touched (optional)
};

//=============================================================================
// Tile Information
//=============================================================================

struct TileInfo {
    dim3 grid;                 // Grid of tiles
    int num_tiles;             // Total number of tiles
};

//=============================================================================
// Helper Functions (Device)
//=============================================================================

/**
 * @brief Convert NDC coordinate to pixel coordinate
 */
__device__ __forceinline__ float ndc2Pix(float v, int S) {
    return ((v + 1.0f) * S - 1.0f) * 0.5f;
}

/**
 * @brief Get tile rectangle for a 2D Gaussian
 */
__device__ __forceinline__ void getTileRect(
    float2 center, 
    int radius,
    dim3 grid,
    uint2& rect_min, 
    uint2& rect_max
) {
    rect_min.x = min(grid.x, max(0u, static_cast<uint32_t>((center.x - radius) / BLOCK_X)));
    rect_min.y = min(grid.y, max(0u, static_cast<uint32_t>((center.y - radius) / BLOCK_Y)));
    rect_max.x = min(grid.x, max(0u, static_cast<uint32_t>((center.x + radius + BLOCK_X - 1) / BLOCK_X)));
    rect_max.y = min(grid.y, max(0u, static_cast<uint32_t>((center.y + radius + BLOCK_Y - 1) / BLOCK_Y)));
}

/**
 * @brief Transform point by 4x4 matrix (return xyz)
 */
__device__ __forceinline__ float3 transformPoint4x3(const float3& p, const float* M) {
    return make_float3(
        M[0] * p.x + M[4] * p.y + M[8]  * p.z + M[12],
        M[1] * p.x + M[5] * p.y + M[9]  * p.z + M[13],
        M[2] * p.x + M[6] * p.y + M[10] * p.z + M[14]
    );
}

/**
 * @brief Transform point by 4x4 matrix (return xyzw)
 */
__device__ __forceinline__ float4 transformPoint4x4(const float3& p, const float* M) {
    return make_float4(
        M[0] * p.x + M[4] * p.y + M[8]  * p.z + M[12],
        M[1] * p.x + M[5] * p.y + M[9]  * p.z + M[13],
        M[2] * p.x + M[6] * p.y + M[10] * p.z + M[14],
        M[3] * p.x + M[7] * p.y + M[11] * p.z + M[15]
    );
}

/**
 * @brief Transform vector by 4x4 matrix (no translation)
 */
__device__ __forceinline__ float3 transformVec4x3(const float3& v, const float* M) {
    return make_float3(
        M[0] * v.x + M[4] * v.y + M[8]  * v.z,
        M[1] * v.x + M[5] * v.y + M[9]  * v.z,
        M[2] * v.x + M[6] * v.y + M[10] * v.z
    );
}

} // namespace gs
