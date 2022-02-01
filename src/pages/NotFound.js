import React from "react"
import NavLinks from "../components/NavLinks"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function NotFound() {
	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<Helmet>
					<title>Rebecca Anderson Photography - Page Not Found</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - Page Not Found'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Page Not Found on e-commerce website Rebecca Anderson Photography. High quality printing on paper, canvas or metal and digital download available.'
						data-react-helmet='true'
					/>
				</Helmet>
				<div className='page-container'>
					<div className='page-line'></div>
					<div className='categorie-title'>Page Not Found</div>
					<p className='categorie-description'>
						The page you're looking for doesn't exit.
					</p>
					<NavLinks />
					<div className='nav-link-container'>
						<Link className='nav-link-2' to='/my-cart'>
							My Cart
						</Link>
						<Link className='nav-link-2' to='/my-favorite'>
							My Favorite
						</Link>
						<Link className='nav-link-2' to='/about'>
							About
						</Link>
						<Link className='nav-link-2' to='/contact'>
							Contact
						</Link>
					</div>
				</div>
			</Layout>
		</motion.div>
	)
}

export default NotFound
