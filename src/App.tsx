import React, { useEffect } from 'react';
import routes from '@/router/index';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';

function App() {
	const elements = useRoutes(routes);
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/home', { replace: true });
		}
	}, []);

	return <>{elements}</>;
}

export default App;
