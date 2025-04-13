import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000/tools', // Thay bằng API của bạn
    timeout: 10000, // 10 giây timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
// axiosClient.interceptors.request.use(
//     (config) => {
//         // Lấy token từ localStorage (nếu có)
//         const token = localStorage.getItem('accessToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

// Add a response interceptor
// axiosClient.interceptors.response.use(
//     (response) => response.data,
//     (error) => {
//         if (error.response) {
//             if (error.response.status === 401) {
//                 console.error('Unauthorized! Redirect to login...');
//                 // Thêm logic chuyển hướng nếu cần, ví dụ:
//                 // window.location.href = '/login';
//             }
//         }
//         return Promise.reject(error);
//     },
// );

export default axiosClient;
