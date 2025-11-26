/**
 * @file      PangolinViewer.cpp
 * @brief     Pangolin viewer functions (separate from CUDA code)
 * @author    Seungwon Choi
 * @date      2025-11-26
 */

#include <pangolin/pangolin.h>
#include <Eigen/Dense>
#include <vector>
#include "database/GaussianModel.h"

// Global Pangolin state
static pangolin::View* g_cam_view = nullptr;
static pangolin::View* g_image_view = nullptr;
static pangolin::OpenGlRenderState* g_render_state = nullptr;
static pangolin::GlTexture* g_texture = nullptr;

static pangolin::Var<int>* ui_camera_id = nullptr;
static pangolin::Var<float>* ui_scale_modifier = nullptr;
static pangolin::Var<int>* ui_sh_degree = nullptr;
static pangolin::Var<bool>* ui_show_points = nullptr;
static pangolin::Var<bool>* ui_show_trajectory = nullptr;
static pangolin::Var<bool>* ui_next_camera = nullptr;
static pangolin::Var<bool>* ui_prev_camera = nullptr;
static pangolin::Var<float>* ui_render_time = nullptr;
static pangolin::Var<int>* ui_num_rendered = nullptr;

static int g_num_cameras = 0;
static int g_current_camera = 0;

// Draw coordinate axes
static void DrawCoordinateAxes(float length = 1.0f) {
    glLineWidth(2.0f);
    glBegin(GL_LINES);
    glColor3f(1.0f, 0.0f, 0.0f);
    glVertex3f(0.0f, 0.0f, 0.0f);
    glVertex3f(length, 0.0f, 0.0f);
    glColor3f(0.0f, 1.0f, 0.0f);
    glVertex3f(0.0f, 0.0f, 0.0f);
    glVertex3f(0.0f, length, 0.0f);
    glColor3f(0.0f, 0.0f, 1.0f);
    glVertex3f(0.0f, 0.0f, 0.0f);
    glVertex3f(0.0f, 0.0f, length);
    glEnd();
}

// Draw camera frustum
static void DrawCameraFrustum(const Eigen::Vector3f& position, const Eigen::Matrix3f& R, 
                              float scale = 0.3f, bool active = false) {
    float w = scale * 0.5f;
    float h = scale * 0.4f;
    float z = scale;
    
    Eigen::Vector3f p0 = position;
    Eigen::Vector3f p1 = position + R * Eigen::Vector3f(-w, -h, z);
    Eigen::Vector3f p2 = position + R * Eigen::Vector3f(w, -h, z);
    Eigen::Vector3f p3 = position + R * Eigen::Vector3f(w, h, z);
    Eigen::Vector3f p4 = position + R * Eigen::Vector3f(-w, h, z);
    
    if (active) {
        glColor3f(1.0f, 1.0f, 0.0f);
        glLineWidth(3.0f);
    } else {
        glColor3f(0.5f, 0.5f, 0.5f);
        glLineWidth(1.0f);
    }
    
    glBegin(GL_LINES);
    glVertex3fv(p0.data()); glVertex3fv(p1.data());
    glVertex3fv(p0.data()); glVertex3fv(p2.data());
    glVertex3fv(p0.data()); glVertex3fv(p3.data());
    glVertex3fv(p0.data()); glVertex3fv(p4.data());
    glVertex3fv(p1.data()); glVertex3fv(p2.data());
    glVertex3fv(p2.data()); glVertex3fv(p3.data());
    glVertex3fv(p3.data()); glVertex3fv(p4.data());
    glVertex3fv(p4.data()); glVertex3fv(p1.data());
    glEnd();
}

// Draw Gaussian points
static void DrawGaussianPoints(const std::vector<Gaussian>& gaussians) {
    glPointSize(1.0f);
    glBegin(GL_POINTS);
    for (const auto& g : gaussians) {
        Eigen::Vector3f color = g.sh_dc * 0.282f + Eigen::Vector3f(0.5f, 0.5f, 0.5f);
        glColor3f(std::max(0.0f, color.x()), std::max(0.0f, color.y()), std::max(0.0f, color.z()));
        glVertex3f(g.position.x(), g.position.y(), g.position.z());
    }
    glEnd();
}

// Draw camera trajectory
static void DrawCameraTrajectory(const std::vector<Eigen::Vector3f>& positions) {
    if (positions.size() < 2) return;
    glColor3f(0.0f, 0.8f, 0.0f);
    glLineWidth(2.0f);
    glBegin(GL_LINE_STRIP);
    for (const auto& p : positions) {
        glVertex3f(p.x(), p.y(), p.z());
    }
    glEnd();
}

void InitPangolin(int display_w, int display_h, int W, int H) {
    pangolin::CreateWindowAndBind("Modern CUDA Gaussian Splatting (cuda_ours)", 1600, 900);
    glEnable(GL_DEPTH_TEST);
    glEnable(GL_BLEND);
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
    
    g_render_state = new pangolin::OpenGlRenderState(
        pangolin::ProjectionMatrix(1600, 900, 800, 800, 800, 450, 0.01, 100),
        pangolin::ModelViewLookAt(0, -2, -5, 0, 0, 0, pangolin::AxisNegY)
    );
    
    g_cam_view = &pangolin::CreateDisplay()
        .SetBounds(0.0, 1.0, pangolin::Attach::Pix(250), 1.0)
        .SetHandler(new pangolin::Handler3D(*g_render_state));
    
    g_image_view = &pangolin::CreateDisplay()
        .SetBounds(0.0, pangolin::Attach::Pix(display_h), 
                   pangolin::Attach::Pix(250), pangolin::Attach::Pix(250 + display_w));
    
    pangolin::CreatePanel("ui").SetBounds(0.0, 1.0, 0.0, pangolin::Attach::Pix(250));
    
    ui_camera_id = new pangolin::Var<int>("ui.Camera ID", 0, 0, 1);
    ui_scale_modifier = new pangolin::Var<float>("ui.Scale Modifier", 1.0f, 0.1f, 3.0f);
    ui_sh_degree = new pangolin::Var<int>("ui.SH Degree", 3, 0, 3);
    ui_show_points = new pangolin::Var<bool>("ui.Show Points", true, true);
    ui_show_trajectory = new pangolin::Var<bool>("ui.Show Trajectory", true, true);
    ui_next_camera = new pangolin::Var<bool>("ui.Next Camera", false, false);
    ui_prev_camera = new pangolin::Var<bool>("ui.Prev Camera", false, false);
    ui_render_time = new pangolin::Var<float>("ui.Render Time (ms)", 0.0f);
    ui_num_rendered = new pangolin::Var<int>("ui.Num Rendered", 0);
    
    g_texture = new pangolin::GlTexture(display_w, display_h, GL_RGB, false, 0, GL_RGB, GL_UNSIGNED_BYTE);
    
    (void)W; (void)H;
}

void UpdatePangolinUI(int& current_camera, int num_cameras, float& scale_modifier, int& sh_degree) {
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    
    g_num_cameras = num_cameras;
    ui_camera_id->Meta().range[1] = num_cameras - 1;
    
    if (pangolin::Pushed(*ui_next_camera)) {
        current_camera = (current_camera + 1) % num_cameras;
        *ui_camera_id = current_camera;
    }
    if (pangolin::Pushed(*ui_prev_camera)) {
        current_camera = (current_camera - 1 + num_cameras) % num_cameras;
        *ui_camera_id = current_camera;
    }
    if (*ui_camera_id != current_camera) {
        current_camera = *ui_camera_id;
    }
    
    g_current_camera = current_camera;
    scale_modifier = *ui_scale_modifier;
    sh_degree = *ui_sh_degree;
}

void RenderPangolin3DView(const std::vector<Gaussian>& gaussians, 
                          const std::vector<Eigen::Vector3f>& camera_positions,
                          const Eigen::Vector3f& active_campos,
                          const Eigen::Matrix3f& active_rotation,
                          bool show_points, bool show_trajectory) {
    g_cam_view->Activate(*g_render_state);
    glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
    
    DrawCoordinateAxes(1.0f);
    
    if (show_points) {
        DrawGaussianPoints(gaussians);
    }
    
    if (show_trajectory) {
        DrawCameraTrajectory(camera_positions);
    }
    
    DrawCameraFrustum(active_campos, active_rotation, 0.3f, true);
}

void RenderPangolinImageView(const unsigned char* image_data, int display_w, int display_h) {
    g_texture->Upload(image_data, GL_RGB, GL_UNSIGNED_BYTE);
    
    g_image_view->Activate();
    glColor3f(1.0f, 1.0f, 1.0f);
    g_texture->RenderToViewport();
    
    (void)display_w; (void)display_h;
}

void UpdatePangolinStats(float render_time, int num_rendered) {
    *ui_render_time = render_time;
    *ui_num_rendered = num_rendered;
}

bool ShouldQuitPangolin() {
    return pangolin::ShouldQuit();
}

void FinishPangolinFrame() {
    pangolin::FinishFrame();
}

void GetPangolinSettings(bool& show_points, bool& show_trajectory) {
    show_points = *ui_show_points;
    show_trajectory = *ui_show_trajectory;
}
