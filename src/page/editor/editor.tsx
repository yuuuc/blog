import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDoc } from '@/api/docApi';
import { postLogin } from '@/api/userApi';
import { MdEditor, md } from '@/util/markdown';
// import { connect}from 'react-redux'
import useStore from '../../redux/store';
import { set_auth } from '../../redux/reducers/auth/actions';
import Dialog from '@/component/Dialog/dialog';
const MD5 = require('md5');
import './editor.css';

export default () => {
	const store = useStore.getState();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const editor = useRef(null);
	const [visible, setVisible] = useState<true | false>(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const okHandler = () => {};
	const closeHandler = () => {
		setVisible(false);
	};

	const upload = async () => {
		const user = store.auth;
		if (user != null) {
			const { html } = (editor as any).current.state;
			if (title.trim() === '' || html.trim() === '') {
				return alert('请检查标题或内容是否为空');
			}
			const res = await postDoc({ title, content: html });
			console.log(res);

			if ((res as any).message == 'ok') {
				alert('上传成功!');
			}
		} else {
			alert('请登录认证');
			setVisible(true);
		}
	};
	// console.log(store);

	const login = async () => {
		const res: any = await postLogin({ username, password: MD5(password) });
		if (res.message === 'ok' && res.data !== {}) {
			sessionStorage.setItem('user', JSON.stringify(res.data));
			useStore.dispatch(set_auth(res.data));
			alert('yes');
		}
		setUsername('');
		setPassword('');
		closeHandler();
	};

	return (
		<div className='editor-content'>
			<div className='editor-content-title'>
				<div
					style={{
						color: '#0787ff',
						fontWeight: 'bold',
						borderRight: '1px solid #ddd',
						paddingRight: '5px'
					}}
					onClick={() => {
						navigate('/home', { replace: true });
					}}
				>
					Home
				</div>
				<div className='editor-content-title-form'>
					<label className='editor-content-title-formText'>标题:</label>
					<input
						className={'editor-content-title-input'}
						type='text'
						value={title}
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>
				</div>
				<div className='editor-content-title-action'>
					<button className='editor-content-title-button' onClick={upload}>
						上传
					</button>
					<span className='editor-content-title-ActionText'>保存</span>
				</div>
			</div>
			<div>
				<MdEditor
					ref={editor}
					style={{ height: '100%' }}
					renderHTML={(text) => {
						return md.render(text);
					}}
				/>
			</div>

			<Dialog visible={visible} ok={okHandler} close={closeHandler}>
				<div className='dialog-login'>
					<div className='login-title'>AuthorityFilter</div>
					<div className='login-context'>
						<div className='context-row'>
							账号:
							<input
								className='input'
								type='text'
								value={username}
								onInput={(e) => {
									setUsername((e.target as any).value);
								}}
							/>
						</div>
						<div className='context-row'>
							密码:
							<input
								className='input'
								type='password'
								value={password}
								onInput={(e) => {
									setPassword((e.target as any).value);
								}}
							/>
						</div>
					</div>
					<div className='login-foot'>
						<button className='button' onClick={login}>
							认证
						</button>
					</div>
				</div>
			</Dialog>
		</div>
	);
};
