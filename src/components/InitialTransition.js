import React from "react"
import { motion } from "framer-motion"

const blackBox = {
	initial: {
		height: "100vh",
		bottom: 0,
	},
	animate: {
		height: 0,
		transition: {
			when: "afterChildren",
			duration: 1.5,
			ease: [0.87, 0, 0.13, 1],
		},
	},
}

const textContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 0,
		transition: {
			duration: 0.25,
			when: "afterChildren",
		},
	},
}
const text = {
	initial: {
		y: 40,
	},
	animate: {
		y: 80,
		transition: {
			duration: 2.1,
			ease: [0.87, 0, 0.13, 1],
		},
	},
}

const InitialTransition = () => {
	return (
		<motion.div
			className='blackbox'
			initial='initial'
			animate='animate'
			variants={blackBox}
			onAnimationStart={() => document.body.classList.add("overflow-hidden")}
			onAnimationComplete={() =>
				document.body.classList.remove("overflow-hidden")
			}>
			<motion.svg className='anim-svg' variants={textContainer}>
				<pattern
					id='pattern'
					patternUnits='userSpaceOnUse'
					width={750}
					height={800}
					className='pattern'>
					<rect className='rect' />
					<motion.rect className='motion-rect' variants={text} />
				</pattern>
				<text
					className='text-anim'
					textAnchor='middle'
					x='50%'
					y='50%'
					style={{ fill: "url(#pattern)" }}>
					Welcome
				</text>
			</motion.svg>
		</motion.div>
	)
}

export default InitialTransition
