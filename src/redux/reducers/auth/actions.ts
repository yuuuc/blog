export const SET_AUTH = 'set_auth';
export const GET_AUTH = 'get_auth';
export const DELETE_AUTH = 'delete_auth';

interface SET_AUTH {
	type: typeof SET_AUTH;
	data: unknown;
}

interface GET_AUTH {
	type: typeof GET_AUTH;
	data: unknown;
}

interface DELETE_AUTH {
	type: typeof DELETE_AUTH;
	data: unknown;
}

export type All = GET_AUTH | SET_AUTH | DELETE_AUTH;

export const set_auth = (data: any): SET_AUTH => {
	return {
		type: SET_AUTH,
		data
	};
};
export const delete_auth = (data: unknown = null): DELETE_AUTH => ({
	type: DELETE_AUTH,
	data
});
export const get_auth = (data: unknown = null): GET_AUTH => ({
	type: GET_AUTH,
	data
});
