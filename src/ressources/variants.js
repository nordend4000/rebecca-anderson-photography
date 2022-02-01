export const Page = {
	initial: { opacity: 0, x: -200 },
	animate: {
		opacity: 1,
		duration: 1.5,
		x: 0,
		transition: {
			duration: 0.7,
			//ease: [0.6, -0.05, 0.01, 0.99],
			ease: [0.5, 0, 0.75, 0],
		},
	},
	exit: {
		opacity: 0,
		y: -100,
		transition: {
			duration: 1,
			ease: [0.6, -0.05, 0.01, 0.99],
		},
	},
}
