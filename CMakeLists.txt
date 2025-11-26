cmake_minimum_required(VERSION 3.18)
project(GaussianSplatEngine LANGUAGES CXX CUDA)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CUDA_STANDARD 17)
set(CMAKE_CUDA_STANDARD_REQUIRED ON)
set(CMAKE_BUILD_TYPE Release)

# CUDA settings
find_package(CUDAToolkit REQUIRED)
set(CMAKE_CUDA_ARCHITECTURES 75 86)

find_package(Eigen3 REQUIRED)
find_package(GLEW REQUIRED)
find_package(OpenCV REQUIRED)

set(BUILD_PANGOLIN_EXAMPLES OFF CACHE BOOL "" FORCE)
set(BUILD_PANGOLIN_TESTS OFF CACHE BOOL "" FORCE)
set(BUILD_PANGOLIN_TOOLS OFF CACHE BOOL "" FORCE)
set(BUILD_PANGOLIN_PYTHON OFF CACHE BOOL "" FORCE)
set(BUILD_PYPANGOLIN OFF CACHE BOOL "" FORCE)
add_subdirectory(thirdparty/pangolin EXCLUDE_FROM_ALL)

include_directories(src)
include_directories(src/database)
include_directories(src/renderer)
include_directories(src/util)
include_directories(app)
include_directories(thirdparty/pangolin/include)
include_directories(${CMAKE_BINARY_DIR}/thirdparty/pangolin/include)

# Core library (CPU utilities)
add_library(gaussian_splat_engine STATIC
    src/database/GaussianModel.cpp
    src/database/Camera.cpp
    src/util/PLYUtils.cpp
    src/util/JSONUtils.cpp
)

target_link_libraries(gaussian_splat_engine
    Eigen3::Eigen
    ${OpenCV_LIBS}
    pango_display pango_plot pango_opengl pango_windowing pango_vars pango_core
    GLEW::GLEW GL
)

# CUDA renderer library
add_library(gaussian_splat_cuda STATIC
    src/renderer/Kernels.cu
    src/renderer/Rasterizer.cu
    src/renderer/CudaWrapper.cu
)

set_target_properties(gaussian_splat_cuda PROPERTIES
    CUDA_SEPARABLE_COMPILATION ON
    CUDA_RESOLVE_DEVICE_SYMBOLS ON
)

target_link_libraries(gaussian_splat_cuda CUDA::cudart)

target_compile_options(gaussian_splat_cuda PRIVATE
    $<$<COMPILE_LANGUAGE:CUDA>:--expt-relaxed-constexpr -O3>
)

# Main test executable
add_executable(test_cuda_rasterizer
    app/TestCudaRender.cpp
    app/PangolinViewer.cpp
)

target_link_libraries(test_cuda_rasterizer
    gaussian_splat_engine
    gaussian_splat_cuda
    Eigen3::Eigen
    ${OpenCV_LIBS}
    pango_display pango_plot pango_opengl pango_windowing pango_vars pango_core
    GLEW::GLEW GL
    CUDA::cudart
)

message(STATUS "Build type: ${CMAKE_BUILD_TYPE}")
message(STATUS "CUDA Architectures: ${CMAKE_CUDA_ARCHITECTURES}")
