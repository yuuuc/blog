import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postDoc } from '@/api/docApi';
import { MdEditor, md } from '@/util/markdown';
import './editor.css';

export default () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const editor = useRef(null);
	const upload = async () => {
		if (title.trim() === '') {
			return alert('请输入标题');
		}
		const { html } = (editor as any).current.state;
		const res = await postDoc({ title, content: html });
		if ((res as any).message == 'ok') {
			alert('上传成功!');
		}
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
						console.log(md.render(text));
						return md.render(text);
					}}
				/>
			</div>
		</div>
	);
};
