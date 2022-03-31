import React, { useEffect } from 'react';
import routes from '@/router/index';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import 'react-markdown-editor-lite/lib/index.css';
import useStore from './redux/store';
import { set_auth } from './redux/reducers/auth/actions';
const { dispatch } = useStore;
function App() {
	const elements = useRoutes(routes);
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		const user: unknown = JSON.parse(sessionStorage.getItem('user') as string);
		if (user) {
			dispatch(set_auth(user));
		}
		if (location.pathname === '/') {
			navigate('/home', { replace: true });
		}
	}, []);

	return <>{elements}</>;
}

export default App;
