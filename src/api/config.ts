import axios from 'axios';

const http = axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 5000,
	responseType: 'json',
	// withCredentials: true,
	headers: {
		'Content-Type': 'application/json;charset=utf-8'
	}
});

// 请求拦截器
http.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

http.interceptors.response.use(
	(response) => {
		if (response.status === 200) {
			return Promise.resolve(response.data);
		} else {
			return Promise.reject(response.data);
		}
	},

	(error) => {
		// 根据状态码进行页面跳转
		// error.response.status
	}
);

export default http;
