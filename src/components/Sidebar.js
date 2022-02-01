import React, { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/sidebar.css"
import { HiChevronDown } from "react-icons/hi"
import { HiChevronUp } from "react-icons/hi"
import { motion } from "framer-motion"
import DATA_GALLERIES from "../ressources/data_galleries"
import DATA_THEMES from "../ressources/data_themes"

function Sidebar({ setOpenSidebar, login, width }) {
	const [openSubGalleries, setOpenSubGalleries] = useState(false)
	const [openSubThemes, setOpenSubThemes] = useState(false)
	const [openSubAccount, setOpenSubAccount] = useState(true)
	const [firstRender, setFirstRender] = useState(true)

	// VARIANTS CHILDRENS MENU
	const item = {
		initial: { opacity: 0, translateX: -50 },
		animate: {
			opacity: 1,
			translateX: 0,
		},
	}
	// VARIANTS WIDTH MENU
	let container = {
		initial: { opacity: 0, width: 0, y: -100 },
		animate: {
			duration: 0.1,
			opacity: 1,
			y: 0,
			width: width,
			transition: {
				duration: 0.1,
				ease: [0.6, -0.05, 0.01, 0.99],
			},
		},
		exit: { opacity: 0, width: 0 },
	}

	// Allow My Account Children to change the delay if not first render
	const handleSubAccount = () => {
		setFirstRender(false)
		setOpenSubAccount(!openSubAccount)
	}

	return (
		<motion.div
			variants={container}
			initial='initial'
			animate='animate'
			exit='exit'
			className='sidebar'>
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{
					duration: 0.3,
					delay: 1.2,
					ease: [0.6, -0.05, 0.01, 0.99],
				}}
				key='Home'
				className='sidebar-link'>
				<Link
					to='/'
					className='nav-links'
					onClick={() => setOpenSidebar(false)}>
					Home
				</Link>
			</motion.div>
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{
					duration: 0.3,
					delay: 1.4,
					ease: [0.6, -0.05, 0.01, 0.99],
				}}
				key='Galleries'
				className='sidebar-link'>
				<Link
					to='/galleries'
					className='nav-links'
					onClick={() => setOpenSidebar(false)}>
					Galleries
				</Link>
				{openSubGalleries ? (
					<HiChevronUp
						className='sidebar-chevron'
						onClick={() => setOpenSubGalleries(!openSubGalleries)}
					/>
				) : (
					<HiChevronDown
						className='sidebar-chevron'
						onClick={() => setOpenSubGalleries(!openSubGalleries)}
					/>
				)}
			</motion.div>
			{openSubGalleries && (
				<div className='sidebar-sub-link'>
					{DATA_GALLERIES.map((el, i) => (
						<Link
							to={el.link}
							className='nav-links sub-links'
							onClick={() => setOpenSidebar(false)}>
							<motion.span
								key={el.name}
								variants={item}
								initial='initial'
								animate='animate'
								transition={{
									duration: 0.7,
									delay: (i + 1) / 10,
									ease: [0.6, -0.05, 0.01, 0.99],
								}}>
								{el.name}
							</motion.span>
						</Link>
					))}
				</div>
			)}
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{
					duration: 0.3,
					delay: 1.6,
					ease: [0.6, -0.05, 0.01, 0.99],
				}}
				key='Themes'
				className='sidebar-link'>
				<Link
					to='/themes'
					className='nav-links'
					onClick={() => setOpenSidebar(false)}>
					Themes
				</Link>
				{openSubThemes ? (
					<HiChevronUp
						className='sidebar-chevron'
						onClick={() => setOpenSubThemes(!openSubThemes)}
					/>
				) : (
					<HiChevronDown
						className='sidebar-chevron'
						onClick={() => setOpenSubThemes(!openSubThemes)}
					/>
				)}
			</motion.div>
			{openSubThemes && (
				<div className='sidebar-sub-link'>
					{DATA_THEMES.map((el, i) => (
						<Link
							to={el.link}
							className='nav-links sub-links'
							onClick={() => setOpenSidebar(false)}>
							<motion.span
								key={el.name}
								variants={item}
								initial='initial'
								animate='animate'
								transition={{
									duration: 0.7,
									delay: (i + 1) / 10,
									ease: [0.6, -0.05, 0.01, 0.99],
								}}>
								{el.name}
							</motion.span>
						</Link>
					))}
				</div>
			)}
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{
					duration: 0.3,
					delay: 1.8,
					ease: [0.61, 1, 0.88, 1],
				}}
				key='About'
				className='sidebar-link'>
				<Link
					to='/about'
					className='nav-links'
					onClick={() => setOpenSidebar(false)}>
					About
				</Link>
			</motion.div>
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{ duration: 0.3, delay: 2, ease: [0.6, -0.05, 0.01, 0.99] }}
				key='Contact'
				className='sidebar-link'>
				<Link
					to='/contact'
					className='nav-links'
					onClick={() => setOpenSidebar(false)}>
					Contact
				</Link>
			</motion.div>
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{
					duration: 0.3,
					delay: 2.2,
					ease: [0.6, -0.05, 0.01, 0.99],
				}}
				key='My-Account'
				className='sidebar-link'>
				<Link
					to='/my-account'
					className='nav-links'
					onClick={() => setOpenSidebar(false)}>
					My Account
				</Link>
				{openSubAccount ? (
					<HiChevronUp className='sidebar-chevron' onClick={handleSubAccount} />
				) : (
					<HiChevronDown
						className='sidebar-chevron'
						onClick={handleSubAccount}
					/>
				)}
			</motion.div>
			{openSubAccount && (
				<motion.div className='sidebar-sub-link'>
					{login ? (
						<Link
							to='/my-account'
							className='nav-links sub-links'
							onClick={() => setOpenSidebar(false)}>
							<motion.span
								variants={item}
								initial='initial'
								animate='animate'
								transition={{
									duration: 0.3,
									delay: firstRender ? 2.4 : 0.1,
									ease: [0.6, -0.05, 0.01, 0.99],
								}}
								key='My-Order'>
								My Order
							</motion.span>
						</Link>
					) : (
						<Link
							to='/login'
							className='nav-links sub-links'
							onClick={() => setOpenSidebar(false)}>
							<motion.span
								variants={item}
								initial='initial'
								animate='animate'
								transition={{
									duration: 0.3,
									delay: firstRender ? 2.4 : 0.1,
									ease: [0.6, -0.05, 0.01, 0.99],
								}}
								key='Login'>
								Login
							</motion.span>{" "}
						</Link>
					)}
					<Link
						to='/my-cart'
						className='nav-links  sub-links'
						onClick={() => setOpenSidebar(false)}>
						<motion.span
							variants={item}
							initial='initial'
							animate='animate'
							transition={{
								duration: 0.3,
								delay: firstRender ? 2.6 : 0.3,
								ease: [0.6, -0.05, 0.01, 0.99],
							}}
							key='My-Cart'>
							My Cart
						</motion.span>
					</Link>
					<Link
						to='/my-favorite'
						className='nav-links  sub-links'
						onClick={() => setOpenSidebar(false)}>
						<motion.span
							variants={item}
							initial='initial'
							animate='animate'
							transition={{
								duration: 0.3,
								delay: firstRender ? 2.8 : 0.5,
								ease: [0.6, -0.05, 0.01, 0.99],
							}}
							key='My-Favorite'>
							My Favorite
						</motion.span>
					</Link>
				</motion.div>
			)}
		</motion.div>
	)
}

export default Sidebar
