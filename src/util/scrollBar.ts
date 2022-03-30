import BScroll, { MouseWheel, ScrollBar } from 'better-scroll';
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

export default function (ele: any) {
	new BScroll(ele, {
		scrollY: true,
		scrollbar: true,
		bounce: false,
		preventDefault: false,
		mouseWheel: {
			speed: 20,
			invert: false,
			easeTime: 300
		}
	});
}
