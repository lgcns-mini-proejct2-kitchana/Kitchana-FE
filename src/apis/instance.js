import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

// 요청 인터셉터 (JWT 토큰 자동 포함)
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwtToken');

    // 토큰이 있으면 Authorization 헤더 추가
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    console.log('[요청 보내는 URL]:', config.baseURL + config.url);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
