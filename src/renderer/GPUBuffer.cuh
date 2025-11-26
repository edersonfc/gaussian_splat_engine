/**
 * @file GPUBuffer.cuh
 * @brief RAII-based GPU memory management
 * @author Seungwon Choi
 * @date 2025-11-26
 */

#pragma once

#include <cuda_runtime.h>
#include <stdexcept>
#include <string>
#include <cstdint>

namespace gs {

//=============================================================================
// CUDA Error Checking
//=============================================================================

#define CUDA_CHECK(call)                                                       \
    do {                                                                       \
        cudaError_t err = call;                                                \
        if (err != cudaSuccess) {                                              \
            throw std::runtime_error(                                          \
                std::string("CUDA Error: ") + cudaGetErrorString(err) +        \
                " at " + __FILE__ + ":" + std::to_string(__LINE__)             \
            );                                                                 \
        }                                                                      \
    } while (0)

//=============================================================================
// GPUBuffer - RAII GPU Memory Wrapper
//=============================================================================

/**
 * @brief RAII wrapper for GPU memory allocation
 * @tparam T Data type
 * 
 * Features:
 * - Automatic allocation/deallocation
 * - Move semantics (no copy)
 * - Size tracking
 * - Type-safe access
 */
template <typename T>
class GPUBuffer {
public:
    //-------------------------------------------------------------------------
    // Constructors / Destructor
    //-------------------------------------------------------------------------
    
    GPUBuffer() noexcept : data_(nullptr), size_(0), capacity_(0) {}
    
    explicit GPUBuffer(size_t count) : data_(nullptr), size_(0), capacity_(0) {
        allocate(count);
    }
    
    ~GPUBuffer() {
        free();
    }
    
    // Move semantics
    GPUBuffer(GPUBuffer&& other) noexcept 
        : data_(other.data_), size_(other.size_), capacity_(other.capacity_) {
        other.data_ = nullptr;
        other.size_ = 0;
        other.capacity_ = 0;
    }
    
    GPUBuffer& operator=(GPUBuffer&& other) noexcept {
        if (this != &other) {
            free();
            data_ = other.data_;
            size_ = other.size_;
            capacity_ = other.capacity_;
            other.data_ = nullptr;
            other.size_ = 0;
            other.capacity_ = 0;
        }
        return *this;
    }
    
    // No copy
    GPUBuffer(const GPUBuffer&) = delete;
    GPUBuffer& operator=(const GPUBuffer&) = delete;
    
    //-------------------------------------------------------------------------
    // Memory Management
    //-------------------------------------------------------------------------
    
    /**
     * @brief Allocate GPU memory
     * @param count Number of elements
     * @param preserve_data If true, preserve existing data (realloc behavior)
     */
    void allocate(size_t count, bool preserve_data = false) {
        if (count == 0) {
            free();
            return;
        }
        
        // Check if we need to reallocate
        if (count > capacity_) {
            T* new_data = nullptr;
            CUDA_CHECK(cudaMalloc(&new_data, count * sizeof(T)));
            
            // Copy old data if requested
            if (preserve_data && data_ != nullptr && size_ > 0) {
                size_t copy_count = std::min(size_, count);
                CUDA_CHECK(cudaMemcpy(new_data, data_, copy_count * sizeof(T), 
                                      cudaMemcpyDeviceToDevice));
            }
            
            free();
            data_ = new_data;
            capacity_ = count;
        }
        
        size_ = count;
    }
    
    /**
     * @brief Resize buffer (allocate if needed)
     */
    void resize(size_t count) {
        allocate(count, false);
    }
    
    /**
     * @brief Reserve capacity without changing size
     */
    void reserve(size_t count) {
        if (count > capacity_) {
            size_t old_size = size_;
            allocate(count, true);
            size_ = old_size;
        }
    }
    
    /**
     * @brief Free GPU memory
     */
    void free() {
        if (data_) {
            cudaFree(data_);
            data_ = nullptr;
        }
        size_ = 0;
        capacity_ = 0;
    }
    
    /**
     * @brief Clear buffer (set all to zero)
     */
    void clear() {
        if (data_ && size_ > 0) {
            CUDA_CHECK(cudaMemset(data_, 0, size_ * sizeof(T)));
        }
    }
    
    //-------------------------------------------------------------------------
    // Data Transfer
    //-------------------------------------------------------------------------
    
    /**
     * @brief Upload data from host to device
     */
    void upload(const T* host_data, size_t count) {
        if (count > size_) {
            allocate(count);
        }
        CUDA_CHECK(cudaMemcpy(data_, host_data, count * sizeof(T), 
                              cudaMemcpyHostToDevice));
    }
    
    /**
     * @brief Download data from device to host
     */
    void download(T* host_data, size_t count = 0) const {
        if (count == 0) count = size_;
        if (count > size_) count = size_;
        CUDA_CHECK(cudaMemcpy(host_data, data_, count * sizeof(T), 
                              cudaMemcpyDeviceToHost));
    }
    
    //-------------------------------------------------------------------------
    // Accessors
    //-------------------------------------------------------------------------
    
    T* data() noexcept { return data_; }
    const T* data() const noexcept { return data_; }
    
    T* get() noexcept { return data_; }
    const T* get() const noexcept { return data_; }
    
    size_t size() const noexcept { return size_; }
    size_t capacity() const noexcept { return capacity_; }
    size_t bytes() const noexcept { return size_ * sizeof(T); }
    
    bool empty() const noexcept { return size_ == 0; }
    bool valid() const noexcept { return data_ != nullptr; }
    
    operator T*() noexcept { return data_; }
    operator const T*() const noexcept { return data_; }
    
    explicit operator bool() const noexcept { return data_ != nullptr; }

private:
    T* data_;
    size_t size_;
    size_t capacity_;
};

//=============================================================================
// GPUScalar - Single value on GPU
//=============================================================================

/**
 * @brief Wrapper for single GPU value (useful for atomics, counters)
 */
template <typename T>
class GPUScalar {
public:
    GPUScalar() : data_(nullptr) {
        CUDA_CHECK(cudaMalloc(&data_, sizeof(T)));
    }
    
    explicit GPUScalar(const T& value) : data_(nullptr) {
        CUDA_CHECK(cudaMalloc(&data_, sizeof(T)));
        set(value);
    }
    
    ~GPUScalar() {
        if (data_) cudaFree(data_);
    }
    
    // Move only
    GPUScalar(GPUScalar&& other) noexcept : data_(other.data_) {
        other.data_ = nullptr;
    }
    
    GPUScalar& operator=(GPUScalar&& other) noexcept {
        if (this != &other) {
            if (data_) cudaFree(data_);
            data_ = other.data_;
            other.data_ = nullptr;
        }
        return *this;
    }
    
    GPUScalar(const GPUScalar&) = delete;
    GPUScalar& operator=(const GPUScalar&) = delete;
    
    void set(const T& value) {
        CUDA_CHECK(cudaMemcpy(data_, &value, sizeof(T), cudaMemcpyHostToDevice));
    }
    
    T get() const {
        T value;
        CUDA_CHECK(cudaMemcpy(&value, data_, sizeof(T), cudaMemcpyDeviceToHost));
        return value;
    }
    
    void clear() {
        CUDA_CHECK(cudaMemset(data_, 0, sizeof(T)));
    }
    
    T* data() noexcept { return data_; }
    const T* data() const noexcept { return data_; }
    
    operator T*() noexcept { return data_; }
    operator const T*() const noexcept { return data_; }

private:
    T* data_;
};

//=============================================================================
// Memory Pool for Chunk Allocation
//=============================================================================

/**
 * @brief Simple memory pool for allocating multiple buffers from a single block
 * 
 * Useful for allocating geometry/binning/image state in a single allocation
 */
class GPUMemoryPool {
public:
    GPUMemoryPool() : base_(nullptr), size_(0), offset_(0) {}
    
    explicit GPUMemoryPool(size_t total_bytes) : base_(nullptr), size_(0), offset_(0) {
        allocate(total_bytes);
    }
    
    ~GPUMemoryPool() {
        free();
    }
    
    // Move only
    GPUMemoryPool(GPUMemoryPool&& other) noexcept 
        : base_(other.base_), size_(other.size_), offset_(other.offset_) {
        other.base_ = nullptr;
        other.size_ = 0;
        other.offset_ = 0;
    }
    
    GPUMemoryPool& operator=(GPUMemoryPool&& other) noexcept {
        if (this != &other) {
            free();
            base_ = other.base_;
            size_ = other.size_;
            offset_ = other.offset_;
            other.base_ = nullptr;
            other.size_ = 0;
            other.offset_ = 0;
        }
        return *this;
    }
    
    GPUMemoryPool(const GPUMemoryPool&) = delete;
    GPUMemoryPool& operator=(const GPUMemoryPool&) = delete;
    
    void allocate(size_t total_bytes) {
        free();
        CUDA_CHECK(cudaMalloc(&base_, total_bytes));
        size_ = total_bytes;
        offset_ = 0;
    }
    
    void free() {
        if (base_) {
            cudaFree(base_);
            base_ = nullptr;
        }
        size_ = 0;
        offset_ = 0;
    }
    
    void reset() { offset_ = 0; }
    
    /**
     * @brief Allocate chunk from pool
     * @tparam T Type of elements
     * @param count Number of elements
     * @param alignment Alignment (default 128 bytes for coalescing)
     * @return Pointer to allocated memory
     */
    template <typename T>
    T* allocChunk(size_t count, size_t alignment = 128) {
        // Align offset
        offset_ = (offset_ + alignment - 1) / alignment * alignment;
        
        size_t required = count * sizeof(T);
        if (offset_ + required > size_) {
            throw std::runtime_error("GPUMemoryPool: out of memory");
        }
        
        T* ptr = reinterpret_cast<T*>(base_ + offset_);
        offset_ += required;
        return ptr;
    }
    
    size_t size() const noexcept { return size_; }
    size_t used() const noexcept { return offset_; }
    size_t available() const noexcept { return size_ - offset_; }

private:
    char* base_;
    size_t size_;
    size_t offset_;
};

//=============================================================================
// Type aliases
//=============================================================================

using FloatBuffer = GPUBuffer<float>;
using IntBuffer = GPUBuffer<int>;
using UintBuffer = GPUBuffer<uint32_t>;
using Uint64Buffer = GPUBuffer<uint64_t>;
using CharBuffer = GPUBuffer<char>;

} // namespace gs
