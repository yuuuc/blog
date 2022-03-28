import React, {
	useState,
	useEffect,
	useRef,
	WheelEvent,
	ReactElement
} from 'react';
import './scrollBar.css';

interface Props {
	width: number;
	list: ReactElement;
}
function ScrollBar(props: Props) {
	const width = props.width;
	const bar = useRef(null);
	const scrollBar = useRef(null);
	const list = useRef(null);
	const [scrollTop, setScrollTop] = useState(0);
	const [listTop, setListTop] = useState(0);
	const [scrollBarHeight, setScrollBarHeight] = useState(0);
	const [listHeight, setListHeight] = useState(0);
	const [barHeight, setBarHeight] = useState(0);

	const wheelHandler = (e: WheelEvent) => {
		if (e.deltaY > 0) {
			if (scrollTop >= scrollBarHeight - barHeight) {
				setScrollTop(scrollBarHeight - barHeight);
				setListTop(-(listHeight - scrollBarHeight));
				return;
			}
			setScrollTop(scrollTop + 17);
			setListTop(listTop - 20);
		} else {
			if (scrollTop <= 0) {
				setScrollTop(0);
				setListTop(0);
				return;
			}
			setScrollTop(scrollTop - 17);
			setListTop(listTop + 20);
		}
	};
	useEffect(() => {
		setScrollBarHeight((scrollBar.current as any).clientHeight);
		setListHeight((list.current as any).clientHeight);
		setBarHeight(
			Math.ceil(
				scrollBarHeight / Math.ceil((listHeight - scrollBarHeight) / 20)
			)
		);
		console.log(barHeight);
	});
	return (
		<>
			<div
				ref={scrollBar}
				className={'scrollBar'}
				style={{ width: width }}
				onWheel={(e) => wheelHandler(e)}
			>
				<div
					ref={bar}
					className={'bar'}
					style={{ top: scrollTop, height: barHeight ? barHeight : 100 }}
				></div>
				<div ref={list} className='list' style={{ top: listTop }}>
					{props.list}
				</div>
			</div>
		</>
	);
}

export default ScrollBar;
