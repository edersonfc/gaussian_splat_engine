/**
 * @file Rasterizer.cuh
 * @brief Modern Gaussian Splatting Rasterizer (Header)
 * @author Seungwon Choi
 * @date 2025-11-26
 */

#pragma once

#include "Types.cuh"
#include "GPUBuffer.cuh"
#include "RenderState.cuh"

namespace gs {

//=============================================================================
// Utility Functions
//=============================================================================

/**
 * @brief Get highest MSB for radix sort bit range
 */
uint32_t getHigherMsb(uint32_t n);

//=============================================================================
// GaussianRasterizer - Main Interface
//=============================================================================

/**
 * @brief High-level interface for Gaussian Splatting rendering
 * 
 * Usage:
 * ```cpp
 * GaussianRasterizer rasterizer;
 * rasterizer.setup(width, height, num_gaussians);
 * int rendered = rasterizer.render(gaussians, camera, settings, output);
 * ```
 */
class GaussianRasterizer {
public:
    GaussianRasterizer() = default;
    ~GaussianRasterizer() = default;

    // Non-copyable, movable
    GaussianRasterizer(const GaussianRasterizer&) = delete;
    GaussianRasterizer& operator=(const GaussianRasterizer&) = delete;
    GaussianRasterizer(GaussianRasterizer&&) = default;
    GaussianRasterizer& operator=(GaussianRasterizer&&) = default;

    //-------------------------------------------------------------------------
    // Setup
    //-------------------------------------------------------------------------

    /**
     * @brief Prepare rasterizer for rendering
     * @param width Image width
     * @param height Image height  
     * @param num_gaussians Number of Gaussians
     */
    void setup(int width, int height, int num_gaussians);

    //-------------------------------------------------------------------------
    // Main Render Function
    //-------------------------------------------------------------------------

    /**
     * @brief Render Gaussians to image
     * @param gaussians Input Gaussian parameters
     * @param camera Camera parameters
     * @param settings Render settings
     * @param output Output buffers
     * @return Number of Gaussian instances rendered (after tile duplication)
     */
    int render(
        const GaussianParams& gaussians,
        const CameraParams& camera,
        const RenderSettings& settings,
        RenderOutput& output
    );

    //-------------------------------------------------------------------------
    // Accessors
    //-------------------------------------------------------------------------

    int width() const { return width_; }
    int height() const { return height_; }
    int numGaussians() const { return num_gaussians_; }
    
    RenderState& state() { return state_; }
    const RenderState& state() const { return state_; }

private:
    int width_ = 0;
    int height_ = 0;
    int num_gaussians_ = 0;

    RenderState state_;
    GPUBuffer<int> radii_;
};

} // namespace gs
