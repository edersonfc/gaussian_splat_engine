/**
 * @file TestCudaRender.cpp
 * @brief Test CUDA Gaussian Splatting Rasterizer
 * @author Seungwon Choi
 * @email csw3575@snu.ac.kr
 * @date 2025-11-26
 * 
 * This is a regular .cpp file compiled by gcc.
 * It uses the wrapper functions from CudaWrapper.h
 */

#include <iostream>
#include <chrono>
#include <cmath>
#include <algorithm>
#include <vector>
#include <Eigen/Dense>

#include "renderer/CudaWrapper.h"
#include "util/PLYUtils.h"
#include "util/JSONUtils.h"
#include "database/GaussianModel.h"

// Forward declarations for Pangolin functions (defined in PangolinViewer.cpp)
void InitPangolin(int width, int height, int W, int H);
void UpdatePangolinUI(int& current_camera, int num_cameras, float& scale_modifier, int& sh_degree);
void RenderPangolin3DView(const std::vector<Gaussian>& gaussians, 
                          const std::vector<Eigen::Vector3f>& camera_positions,
                          const Eigen::Vector3f& active_campos,
                          const Eigen::Matrix3f& active_rotation,
                          bool show_points, bool show_trajectory);
void RenderPangolinImageView(const unsigned char* image_data, int display_w, int display_h);
void UpdatePangolinStats(float render_time, int num_rendered);
bool ShouldQuitPangolin();
void FinishPangolinFrame();
void GetPangolinSettings(bool& show_points, bool& show_trajectory);

int main(int argc, char** argv) {
    if (argc < 3) {
        std::cerr << "Usage: " << argv[0] << " <ply_file> <cameras_json>" << std::endl;
        return 1;
    }
    
    std::string ply_path = argv[1];
    std::string json_path = argv[2];
    
    // Initialize CUDA via wrapper
    gs::wrapper_initialize();
    
    // Load Gaussians
    std::cout << "Loading Gaussians from: " << ply_path << std::endl;
    std::vector<Gaussian> gauss_list;
    if (!ply::LoadGaussians(ply_path, gauss_list)) {
        std::cerr << "Failed to load Gaussians!" << std::endl;
        return 1;
    }
    std::cout << "Loaded " << gauss_list.size() << " Gaussians" << std::endl;
    
    // Load cameras
    std::cout << "Loading cameras from: " << json_path << std::endl;
    std::vector<json_utils::CameraInfo> cam_list;
    if (!json_utils::LoadCamerasJSON(json_path, cam_list)) {
        std::cerr << "Failed to load cameras!" << std::endl;
        return 1;
    }
    std::cout << "Loaded " << cam_list.size() << " cameras" << std::endl;
    
    int P = static_cast<int>(gauss_list.size());
    int M = 16; // Number of SH coefficients per channel
    
    std::cout << "Preparing data for " << P << " gaussians..." << std::endl;
    
    // Prepare data arrays
    std::vector<float> means3D(static_cast<size_t>(P) * 3);
    std::vector<float> scales(static_cast<size_t>(P) * 3);
    std::vector<float> rotations(static_cast<size_t>(P) * 4);
    std::vector<float> opacities(P);
    std::vector<float> shs(static_cast<size_t>(P) * M * 3);
    
    for (int i = 0; i < P; i++) {
        const auto& g = gauss_list[i];
        means3D[i * 3 + 0] = g.position.x();
        means3D[i * 3 + 1] = g.position.y();
        means3D[i * 3 + 2] = g.position.z();
        scales[i * 3 + 0] = std::exp(g.scale.x());
        scales[i * 3 + 1] = std::exp(g.scale.y());
        scales[i * 3 + 2] = std::exp(g.scale.z());
        rotations[i * 4 + 0] = g.rotation.w();
        rotations[i * 4 + 1] = g.rotation.x();
        rotations[i * 4 + 2] = g.rotation.y();
        rotations[i * 4 + 3] = g.rotation.z();
        opacities[i] = 1.0f / (1.0f + std::exp(-g.opacity));
        shs[i * M * 3 + 0] = g.sh_dc.x();
        shs[i * M * 3 + 1] = g.sh_dc.y();
        shs[i * M * 3 + 2] = g.sh_dc.z();
        for (int j = 0; j < 15; j++) {
            shs[static_cast<size_t>(i) * M * 3 + (j + 1) * 3 + 0] = g.sh_rest[j];
            shs[static_cast<size_t>(i) * M * 3 + (j + 1) * 3 + 1] = g.sh_rest[j + 15];
            shs[static_cast<size_t>(i) * M * 3 + (j + 1) * 3 + 2] = g.sh_rest[j + 30];
        }
    }
    
    // Camera data
    std::vector<Eigen::Vector3f> camera_positions;
    std::vector<Eigen::Matrix3f> camera_rotations;
    for (const auto& cam : cam_list) {
        camera_positions.push_back(cam.position);
        camera_rotations.push_back(cam.rotation);
    }
    
    // Image dimensions
    int W = cam_list[0].width;
    int H = cam_list[0].height;
    
    //=========================================================================
    // GPU Memory Allocation using wrapper functions
    //=========================================================================
    
    float* d_means3D = static_cast<float*>(gs::wrapper_gpu_alloc(static_cast<size_t>(P) * 3 * sizeof(float)));
    float* d_scales = static_cast<float*>(gs::wrapper_gpu_alloc(static_cast<size_t>(P) * 3 * sizeof(float)));
    float* d_rotations = static_cast<float*>(gs::wrapper_gpu_alloc(static_cast<size_t>(P) * 4 * sizeof(float)));
    float* d_opacities = static_cast<float*>(gs::wrapper_gpu_alloc(static_cast<size_t>(P) * sizeof(float)));
    float* d_shs = static_cast<float*>(gs::wrapper_gpu_alloc(static_cast<size_t>(P) * M * 3 * sizeof(float)));
    float* d_viewmatrix = static_cast<float*>(gs::wrapper_gpu_alloc(16 * sizeof(float)));
    float* d_projmatrix = static_cast<float*>(gs::wrapper_gpu_alloc(16 * sizeof(float)));
    float* d_campos = static_cast<float*>(gs::wrapper_gpu_alloc(3 * sizeof(float)));
    float* d_background = static_cast<float*>(gs::wrapper_gpu_alloc(3 * sizeof(float)));
    float* d_out_color = static_cast<float*>(gs::wrapper_gpu_alloc(static_cast<size_t>(W) * H * 3 * sizeof(float)));
    float* d_out_depth = static_cast<float*>(gs::wrapper_gpu_alloc(static_cast<size_t>(W) * H * sizeof(float)));
    
    gs::wrapper_gpu_upload(d_means3D, means3D.data(), static_cast<size_t>(P) * 3 * sizeof(float));
    gs::wrapper_gpu_upload(d_scales, scales.data(), static_cast<size_t>(P) * 3 * sizeof(float));
    gs::wrapper_gpu_upload(d_rotations, rotations.data(), static_cast<size_t>(P) * 4 * sizeof(float));
    gs::wrapper_gpu_upload(d_opacities, opacities.data(), static_cast<size_t>(P) * sizeof(float));
    gs::wrapper_gpu_upload(d_shs, shs.data(), static_cast<size_t>(P) * M * 3 * sizeof(float));
    
    float background[3] = {0.0f, 0.0f, 0.0f};
    gs::wrapper_gpu_upload(d_background, background, 3 * sizeof(float));
    
    //=========================================================================
    // Setup Rasterizer
    //=========================================================================
    
    gs::wrapper_setup_rasterizer(W, H, P);
    std::cout << "Rasterizer initialized: " << W << "x" << H << ", " << P << " gaussians" << std::endl;
    
    //=========================================================================
    // Pangolin Setup
    //=========================================================================
    
    float img_aspect = static_cast<float>(W) / H;
    int display_h = 450;
    int display_w = static_cast<int>(display_h * img_aspect);
    
    InitPangolin(display_w, display_h, W, H);
    
    int current_camera = 0;
    float scale_modifier = 1.0f;
    int sh_degree = 3;
    std::vector<float> out_color_host(W * H * 3);
    std::vector<unsigned char> display_buffer(display_w * display_h * 3);
    
    //=========================================================================
    // Main Loop
    //=========================================================================
    
    while (!ShouldQuitPangolin()) {
        // Update UI
        UpdatePangolinUI(current_camera, cam_list.size(), scale_modifier, sh_degree);
        
        // Get camera
        const auto& cam = cam_list[current_camera];
        Eigen::Vector3f campos = cam.position;
        Eigen::Matrix3f R_cw = cam.rotation;
        
        // Build view matrix
        Eigen::Matrix3f R_wc = R_cw.transpose();
        Eigen::Vector3f t_wc = -R_wc * campos;
        
        Eigen::Matrix4f viewmatrix = Eigen::Matrix4f::Identity();
        viewmatrix.block<3, 3>(0, 0) = R_wc;
        viewmatrix.block<3, 1>(0, 3) = t_wc;
        
        float tan_fovx = cam.width / (2.0f * cam.fx);
        float tan_fovy = cam.height / (2.0f * cam.fy);
        float focal_x = cam.fx;
        float focal_y = cam.fy;
        
        // Build projection matrix
        float near_plane = 0.01f;
        float far_plane = 100.0f;
        float cx = cam.width / 2.0f;
        float cy = cam.height / 2.0f;
        
        Eigen::Matrix4f projection = Eigen::Matrix4f::Zero();
        projection(0, 0) = 2.0f * focal_x / cam.width;
        projection(1, 1) = 2.0f * focal_y / cam.height;
        projection(0, 2) = 1.0f - 2.0f * cx / cam.width;
        projection(1, 2) = 2.0f * cy / cam.height - 1.0f;
        projection(2, 2) = -(far_plane + near_plane) / (far_plane - near_plane);
        projection(2, 3) = -2.0f * far_plane * near_plane / (far_plane - near_plane);
        projection(3, 2) = -1.0f;
        
        Eigen::Matrix4f projmatrix = projection * viewmatrix;
        
        // Upload camera data
        gs::wrapper_gpu_upload(d_viewmatrix, viewmatrix.data(), 16 * sizeof(float));
        gs::wrapper_gpu_upload(d_projmatrix, projmatrix.data(), 16 * sizeof(float));
        gs::wrapper_gpu_upload(d_campos, campos.data(), 3 * sizeof(float));
        
        // Clear output
        gs::wrapper_gpu_clear(d_out_color, static_cast<size_t>(W) * H * 3 * sizeof(float));
        gs::wrapper_gpu_clear(d_out_depth, static_cast<size_t>(W) * H * sizeof(float));
        
        //=====================================================================
        // Render using wrapper
        //=====================================================================
        
        auto start = std::chrono::high_resolution_clock::now();
        
        int num_rendered = gs::wrapper_render(
            d_means3D, d_shs, d_opacities, d_scales, d_rotations,
            P, sh_degree, M,
            d_viewmatrix, d_projmatrix, d_campos,
            W, H, tan_fovx, tan_fovy, focal_x, focal_y,
            scale_modifier, false, false, d_background,
            d_out_color, d_out_depth
        );
        
        gs::wrapper_gpu_sync();
        auto end = std::chrono::high_resolution_clock::now();
        float render_time = std::chrono::duration<float, std::milli>(end - start).count();
        
        UpdatePangolinStats(render_time, num_rendered);
        
        // Download result
        gs::wrapper_gpu_download(out_color_host.data(), d_out_color, W * H * 3 * sizeof(float));
        
        // Convert to display format with simple resize
        for (int y = 0; y < display_h; y++) {
            int src_y = y * H / display_h;
            for (int x = 0; x < display_w; x++) {
                int src_x = x * W / display_w;
                int src_pix = src_y * W + src_x;
                int dst_pix = y * display_w + x;
                
                float r = out_color_host[0 * W * H + src_pix];
                float g = out_color_host[1 * W * H + src_pix];
                float b = out_color_host[2 * W * H + src_pix];
                
                display_buffer[dst_pix * 3 + 0] = static_cast<unsigned char>(std::min(255.0f, std::max(0.0f, r * 255.0f)));
                display_buffer[dst_pix * 3 + 1] = static_cast<unsigned char>(std::min(255.0f, std::max(0.0f, g * 255.0f)));
                display_buffer[dst_pix * 3 + 2] = static_cast<unsigned char>(std::min(255.0f, std::max(0.0f, b * 255.0f)));
            }
        }
        
        // Render views
        bool show_points, show_trajectory;
        GetPangolinSettings(show_points, show_trajectory);
        
        RenderPangolin3DView(gauss_list, camera_positions, campos, R_cw, show_points, show_trajectory);
        RenderPangolinImageView(display_buffer.data(), display_w, display_h);
        
        FinishPangolinFrame();
    }
    
    //=========================================================================
    // Cleanup
    //=========================================================================
    
    gs::wrapper_gpu_free(d_means3D);
    gs::wrapper_gpu_free(d_scales);
    gs::wrapper_gpu_free(d_rotations);
    gs::wrapper_gpu_free(d_opacities);
    gs::wrapper_gpu_free(d_shs);
    gs::wrapper_gpu_free(d_viewmatrix);
    gs::wrapper_gpu_free(d_projmatrix);
    gs::wrapper_gpu_free(d_campos);
    gs::wrapper_gpu_free(d_background);
    gs::wrapper_gpu_free(d_out_color);
    gs::wrapper_gpu_free(d_out_depth);
    
    gs::wrapper_shutdown();
    
    return 0;
}
