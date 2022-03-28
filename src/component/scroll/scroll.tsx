import React, { useEffect, useRef } from 'react';
import { ScrollProps } from './props-type';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import { MouseWheel } from 'better-scroll';
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

export default (props: ScrollProps) => {
	const { children, tag } = props;
	const customRootRef = useRef(null);
	const customRoot = React.createElement(tag, { ref: customRootRef }, children);

	useEffect(() => {
		new BScroll(customRootRef.current as any, {
			scrollY: true,
			bounce: false,
			mouseWheel: {
				speed: 20,
				invert: false,
				easeTime: 300
			}
		});
	}, []);
	return <>{customRoot}</>;
};
