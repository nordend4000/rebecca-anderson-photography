import React, { useState, useEffect } from "react"
import "../styles/pages.css"
import { RiHeartAddLine } from "react-icons/ri"
import { RiHeartFill } from "react-icons/ri"
import { Link } from "react-router-dom"

function Favorite({ url, reference, myFavorite, favorite, setNewFav, newFav }) {
	const [heart, setHeart] = useState(false)

	useEffect(() => {
		if (favorite != null) {
			if (favorite.includes(url)) {
				setHeart(true)
			}
		}
		// eslint-disable-next-line
	}, [])

	function addFavorite(favUrl) {
		let checkFav = []
		if (favorite && favorite.length > 0) {
			checkFav = favorite.filter(el => el !== favUrl)
			sessionStorage.removeItem("rebecca-photography-favorite")
		}
		checkFav.push(favUrl)
		sessionStorage.setItem(
			"rebecca-photography-favorite",
			JSON.stringify(checkFav),
		)
		setHeart(true)
		setNewFav(newFav + 1)
	}
	function removeFavorite(favUrl) {
		if (favorite == null || favorite.length === 0) return setHeart(false)
		if (favorite && favorite.length > 0) {
			let checkFav = favorite.filter(el => el !== favUrl)
			sessionStorage.removeItem("rebecca-photography-favorite")
			sessionStorage.setItem(
				"rebecca-photography-favorite",
				JSON.stringify(checkFav),
			)
		}
		if (!myFavorite) setHeart(false)
		setNewFav(newFav + 1)
	}

	return (
		<div className='slideshow'>
			<div className='categorie-link-icon'>
				{!heart ? (
					<>
						<RiHeartAddLine onClick={() => addFavorite(url)} />
						<span className='categorie-link-tooltip'>Add favorite</span>
					</>
				) : (
					<>
						<RiHeartFill onClick={() => removeFavorite(url)} />
						<span className='categorie-link-tooltip'>Remove favorite</span>
					</>
				)}
			</div>
			{myFavorite && (
				<div>
					<Link
						className='slideshow-image-contener'
						to={`/product/${reference}`}>
						<img
							className='slideshow-image marginbottom'
							alt={reference + " image favorite"}
							src={url}
						/>
					</Link>
				</div>
			)}
		</div>
	)
}

export default Favorite
