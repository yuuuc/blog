import { GET_AUTH, SET_AUTH, DELETE_AUTH, All } from './actions';

const initState = null;

const authReducer = (preState = initState, action: All) => {
	const { type, data } = action;
	switch (type) {
		case SET_AUTH:
			return data;
		case DELETE_AUTH:
			return {};
		default:
			return preState;
	}
};

export default authReducer;
