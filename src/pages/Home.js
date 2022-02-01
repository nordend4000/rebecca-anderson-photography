import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import "../styles/pages.css"
import PauseOnHover from "../components/PauseOnHover"
import Grid from "../components/Grid"
import Layout from "../components/Layout"
import InitialTransition from "../components/InitialTransition"

const content = isFirstMount => ({
	initial: { opacity: 0, y: -200 },
	animate: {
		opacity: 1,
		duration: 0.1,
		y: 0,
		//delay: isFirstMount ? 12.8 : 0,
		transition: {
			duration: 0.1,
			// staggerChildren: 0.1,
			// delayChildren: isFirstMount ? 7.8 : 0,
			//ease: [0.6, -0.05, 0.01, 0.99],
			ease: [0.5, 0, 0.75, 0],
		},
		// transition: { staggerChildren: 0.1, delayChildren: isFirstMount ? 2.8 : 0 },
	},
	exit: {
		opacity: 0,
		y: -100,
		transition: {
			duration: 1,
			ease: [0.6, -0.05, 0.01, 0.99],
		},
	},
})

function Home({ isFirstMount }) {
	return (
		<>
			{isFirstMount && <InitialTransition />}
			<motion.div
				initial='initial'
				animate='animate'
				exit='exit'
				variants={content(isFirstMount)}>
				<Layout>
					<Helmet>
						<title>
							Rebecca Anderson Photography - High Quality Print & Digital
						</title>
						<meta
							name='title'
							content='Rebecca Anderson Photography - High Quality Print & Digital'
							data-react-helmet='true'
						/>
						<meta
							name='description'
							content='Photography of Rebecca Anderson for sale  showcased in 5 galleries and 8 themes. High quality printing on paper, canvas or metal and digital download available. Stripe payment.'
							data-react-helmet='true'
						/>
						<meta name='author' content='Rebecca Anderson de la Llana' />
					</Helmet>
					<div className='page-container'>
						<div className='grab'>
							<PauseOnHover />
						</div>
						<div className='home-galleries-contener'>
							<Link to='/galleries' className='home-title'>
								Galleries
							</Link>
							<Link to='/themes' className='home-title'>
								Themes
							</Link>
						</div>
						<Grid />
						<div className='home-galleries-contener'>
							<Link to='/about' className='home-title'>
								About
							</Link>
							<Link to='/my-account' className='home-title'>
								My Account
							</Link>
							<Link to='/contact' className='home-title'>
								Contact
							</Link>
						</div>
					</div>
				</Layout>
			</motion.div>
		</>
	)
}

export default Home
