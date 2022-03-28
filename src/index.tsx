import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'react-markdown-editor-lite/lib/index.css';
import '../public/css/global.css';
import App from '@/App';
// import 'highlight.js/styles/color-brewer.css';

// App 为root进行调度所有路由
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
