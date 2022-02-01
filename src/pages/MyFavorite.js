import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import "../styles/pages.css"
import Favorite from "../components/Favorite"
import NavLinks from "../components/NavLinks"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function MyFavorite() {
	const [favorite, setFavorite] = useState([])
	const [render, setRender] = useState(0)

	useEffect(() => {
		const savedFavorite = JSON.parse(
			sessionStorage.getItem("rebecca-photography-favorite"),
		)
		if (savedFavorite != null) {
			setFavorite(savedFavorite)
		}
	}, [render])

	function computedRef(el) {
		let x = el.slice(85, 90)
		if (x.endsWith("_")) x = x.slice(0, -1)
		return x
	}

	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<Helmet>
					<title>Rebecca Anderson Photography - My Favorite</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - My Favorite'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Favorite pictures selected on Rebecca Anderson Photography. High quality printing on paper, canvas or metal and digital download available. Checkout using Stripe.'
						data-react-helmet='true'
					/>
				</Helmet>
				<div className='page-container'>
					<div className='page-line'></div>
					<div className='categorie-title'>My Favorite</div>
					{favorite != null && favorite.length > 0 ? (
						favorite.map(el => (
							<div
								className='slideshow-image-contener  marginbottom'
								onClick={() => setRender(render + 1)}>
								<Favorite
									reference={computedRef(el)}
									url={el}
									myFavorite
									favorite={favorite}
									setNewFav={setRender}
									newFav={render}
								/>
							</div>
						))
					) : (
						<div className='categorie-description marginbottom'>
							You don't have any Favorite yet
						</div>
					)}
					<NavLinks />
				</div>
			</Layout>
		</motion.div>
	)
}

export default MyFavorite
