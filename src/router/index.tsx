import React, { Children, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const Home = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'home' */
			'@/page/home/home'
		)
);

const Editor = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'editor' */
			/* webpackPrefetch: true */
			'@/page/editor/editor'
		)
);

const Login = React.lazy(
	() =>
		import(
			/* webpackChunkName: 'login' */
			/* webpackPrefetch: true */
			'@/page/login/login'
		)
);

const routes: RouteObject[] = [
	{
		path: '/',
		element: <></>
	},
	{
		path: '/home',
		element: <Home />
	},
	{
		path: '/editor',
		element: <Editor />
	}
];

// 路由处理方式
const changeRouter = (routers: any[]): any => {
	return routers.map((item) => {
		if (item.children) {
			item.children = changeRouter(item.children);
		}
		item.element = (
			<Suspense fallback={<div>Loading...</div>}>{item.element}</Suspense>
		);
		return item;
	});
};

export default changeRouter(routes);
