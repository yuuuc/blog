import { combineReducers, createStore, applyMiddleware } from 'redux';
import auth from './reducers/auth/index';
// 用于支持异步的action
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

let root = combineReducers({
	auth
});

export default createStore(root, composeWithDevTools(applyMiddleware(thunk)));
