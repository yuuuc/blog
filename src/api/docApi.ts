import http from './config';

const BASE = '/doc';

export function getDocs() {
	return http.get(BASE + '/getDocs');
}

export function getDocByTitle(title: string) {
	return http.get(BASE + `/getDocByTitle/${title}`);
}

export function postDoc(data: {}) {
	return http.post(BASE + '/postDoc', data);
}

export function postDocById(id: string) {
	return http.get(BASE + `/getDoc/${id}`);
}
