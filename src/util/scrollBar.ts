import BetterScroll, { MouseWheel, ScrollBar } from 'better-scroll';
BetterScroll.use(MouseWheel);
BetterScroll.use(ScrollBar);

export default function (ele: any) {
	return new BetterScroll(ele, {
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
