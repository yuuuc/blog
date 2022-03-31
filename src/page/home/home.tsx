import React, { Ref, useEffect, useRef, useState } from 'react';
// import Scroll from '@/component/scroll/scroll';
import { useNavigate } from 'react-router-dom';
import ScrollBar from '@/util/scrollBar';
import { getDocByTitle, getDocs, postDocById } from '@/api/docApi';
import Search from '@/component/search/search';
import './home.css';

interface Doc {
	id: string;
	title: string;
	content?: string;
}

interface DirProp {
	directory: Doc[];
	setDoc: React.Dispatch<React.SetStateAction<string>>;
}

// Directory
function Directory(props: DirProp) {
	const { directory, setDoc } = props;
	const [id, setId] = useState('');
	const active = async (id: string) => {
		setId(id);
		const { data } = await postDocById(id);
		setDoc(data.content);
	};

	const [fill, setFill] = useState(new Array(100).fill(0));
	useEffect(() => {
		active('62417d214772b9c192af499f');
	}, []);
	if (directory.length <= 0) {
		return <>Loading...</>;
	} else {
		return (
			<>
				{/* {directory.map((item) => {
					return (
						<li
							className={id === item.id ? 'dirActive' : 'dirItem'}
							key={item.id}
							data-id={item.id}
							onClick={(e) => active((e.target as any).dataset.id)}
						>
							{item.title}
						</li>
					);
				})} */}
				{fill.map((item, index) => {
					return (
						<li
							className={id === item.id ? 'dirActive' : 'dirItem'}
							key={index}
						>
							{index}
						</li>
					);
				})}
			</>
		);
	}
}

function Home() {
	const viewWrapper = useRef<HTMLDivElement | null>(null);
	const directoryWrapper = useRef<HTMLDivElement | null>(null);
	const wrapper = useRef<HTMLUListElement | null>(null);
	const navigate = useNavigate();
	// html文档
	const [doc, setDoc] = useState('');
	const [directory, setDirectory] = useState<Doc[]>([]);
	const [search, setSearch] = useState('');

	const getData = async () => {
		const { data } = await getDocs();
		setDirectory(data);
		initScroll();
	};
	const onSearch = async () => {
		if (search.trim() === '') {
			return alert('查询内容不能为空');
		}
		const { data } = await getDocByTitle(search);
		console.log(data);
	};
	const initScroll = () => {
		ScrollBar(directoryWrapper.current);
		ScrollBar(viewWrapper.current);
		console.log(wrapper.current?.scrollHeight);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<>
			<div className='home-header'>
				<span style={{ fontWeight: 'bold', color: '#0787ff' }}>个人笔记</span>
				<div className='search'>
					<Search search={search} setSearch={setSearch} />
					<span className='onSearch' onClick={onSearch}></span>
				</div>
				<button
					className='edit'
					onClick={() => {
						navigate('/editor', { replace: true });
					}}
				>
					Edit
				</button>
			</div>
			<div className='home-content'>
				<div className='wrapper' ref={directoryWrapper}>
					<ul ref={wrapper}>
						<Directory directory={directory} setDoc={setDoc}></Directory>
					</ul>
				</div>
				<div className='view custom-html-style' ref={viewWrapper}>
					<div className='doc' dangerouslySetInnerHTML={{ __html: doc }}></div>
				</div>
			</div>
		</>
	);
}

export default Home;
