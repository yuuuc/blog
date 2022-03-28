import React, { Ref, useEffect, useRef, useState } from 'react';
// import Scroll from '@/component/scroll/scroll';
import { useNavigate } from 'react-router-dom';
import ScrollBar from '@/util/scrollBar';
import { getDocByTitle, getDocs, postDocById } from '@/api/docApi';
import Search from '@/component/search/search';
import './home.css';

interface Doc {
	_id: string;
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
	useEffect(() => {
		active('62417d214772b9c192af499f');
	}, []);
	if (directory.length <= 0) {
		return <>Loading...</>;
	} else {
		return (
			<>
				{directory.map((item) => {
					return (
						<li
							className={id === item._id ? 'dirActive' : 'dirItem'}
							key={item._id}
							data-id={item._id}
							onClick={(e) => active((e.target as any).dataset.id)}
						>
							{item.title}
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
	const navigate = useNavigate();
	// html文档
	const [doc, setDoc] = useState('');
	const [directory, setDirectory] = useState<Doc[]>([]);
	const [search, setSearch] = useState('');

	const getData = async () => {
		const { data } = await getDocs();
		setDirectory(data);
	};
	const onSearch = async () => {
		const { data } = await getDocByTitle(search);
		console.log(data);
	};
	const mounted = () => {
		ScrollBar(viewWrapper.current);
		ScrollBar(directoryWrapper.current);
	};

	useEffect(() => {
		getData();
		mounted();
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
					<ul>
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
