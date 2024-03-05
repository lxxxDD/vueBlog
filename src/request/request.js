import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5297/",
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json' // 设置请求头
  }
});

// 添加请求拦截器
api.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加请求头
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
api.interceptors.response.use(
  res => {
    // 对响应数据做些什么，例如解析响应数据
    return res;
  },
  error => {
   
    // 对响应错误做些什么，例如处理错误状态码
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

// 设置超时拦截器
api.interceptors.request.use(
  config => {
    config.timeout = 5000;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



export default api;
