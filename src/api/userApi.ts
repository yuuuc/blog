import http from './config';

interface Login {
	username: string;
	password: string;
}
export function postLogin(data: Login) {
	return http.post('/login', data);
}
