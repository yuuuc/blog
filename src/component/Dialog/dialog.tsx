import React from 'react';
//  createPortal 将子节点渲染到父节点之外的方案
import { createPortal } from 'react-dom';
import './dialog.css';

// interface Dialog {
// 	show: (title: string, context: string) => void;
// 	tag: () => void;
// }

// const Dialog: Dialog = {
// 	show: () => null,
// 	tag: () => null
// };

// Dialog.show = (title, context) => {
// 	const doc = window.document;
// 	const node = doc.createElement('div');
// 	node.setAttribute('class', 'dialog-hidden');
// 	doc.body.appendChild(node);
// };

// Dialog.tag = () => {
// 	const doc = window.document;
// 	const node = doc.createElement('div');
// 	node.setAttribute('class', 'dialog-hidden');

// 	useEffect(() => {
// 		doc.body.appendChild(node);
// 		return () => {
// 			window.document.body.removeChild(node);
// 		};
// 	}, []);
// 	return createPortal(<div className='dialog-content'></div>, node);
// };

interface Props {
	visible: true | false;
	width?: number;
	height?: number;
	close: () => void;
	ok: () => void;
	children?:
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>[]
		| React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const defaultProps: Props = {
	visible: false,
	width: 350,
	height: 240,
	ok: () => {},
	close: () => {}
};

function Dialog(props: Props) {
	const option = { ...defaultProps, ...props };
	const { children } = props;
	const { visible, close, ok, width, height } = option;
	const modalHandler = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			close();
		}
	};

	const dialog = createPortal(
		<div className='modal' onClick={(e) => modalHandler(e)}>
			<div
				className='dialog'
				style={{ width: width + 'px', height: height + 'px' }}
			>
				{children}
			</div>
		</div>,
		document.body
	);

	return <div>{visible && dialog}</div>;
}

export default React.memo(Dialog);
