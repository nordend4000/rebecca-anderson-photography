import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import "../styles/pages.css"
import { Link } from "react-router-dom"
import Axios from "axios"
import CartModal from "./CartModal"
import Favorite from "./Favorite"
import { MdCameraEnhance } from "react-icons/md"
import { FaCartPlus } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
import { FaChevronCircleRight } from "react-icons/fa"
import { FaChevronCircleLeft } from "react-icons/fa"
import { IoIosArrowDropleft } from "react-icons/io"
import { GoHome } from "react-icons/go"
import Layout from "./Layout"
import { motion } from "framer-motion"
import { Page } from "../ressources/variants"

function Categorie() {
	const { categorie } = useParams()
	const [active, setActive] = useState(1)
	const [data, setData] = useState([])
	const [product, setProduct] = useState({})
	const [loading, setLoading] = useState(true)
	const [openCartModal, setOpenCartModal] = useState(false)
	const [favoriteSession, setFavoriteSession] = useState([])
	const [newFav, setNewFav] = useState(0)

	useEffect(() => {
		let savedFavorite = JSON.parse(
			sessionStorage.getItem("rebecca-photography-favorite"),
		)
		setFavoriteSession(savedFavorite)
	}, [newFav])

	useEffect(() => {
		document.querySelector("body").scrollTo(0, 100)
	}, [active])

	useEffect(() => {
		document.querySelector("body").scrollTo(0, 0)
	}, [openCartModal, data])

	useEffect(() => {
		Axios.get(
			`${process.env.REACT_APP_SERVER_URL}/get-categorie/${categorie}`,
		).then(response => {
			setData(response.data)
			setLoading(false)
		})
	}, [categorie])

	function checkId(id) {
		if (active !== id) return true
		return false
	}
	function handleChevron(n) {
		if (n > 0 && active === data.length) return setActive(1)
		if (n < 0 && active === 1) return setActive(data.length)
		if (n > 0) return setActive(active + 1)
		if (n < 0) return setActive(active - 1)
		return
	}

	function handleAddToCart(item) {
		setProduct(item)
		setOpenCartModal(true)
	}

	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<div className='page-container'>
					{openCartModal && (
						<CartModal
							open={openCartModal}
							onClose={() => setOpenCartModal(false)}
							product={product}
						/>
					)}
					{loading ? (
						<div className='login-message-container'>
							<img
								alt='loading bar'
								src={process.env.PUBLIC_URL + `/images/loading.svg`}
							/>
						</div>
					) : (
						<>
							<Helmet>
								<title>{`Rebecca Anderson Photography - ${data[0].galleryText} ${data[0].categorieText}`}</title>
								<meta
									name='title'
									content={`Rebecca Anderson Photography - ${data[0].galleryText} ${data[0].categorieText}`}
									data-react-helmet='true'
								/>
								<meta
									name='description'
									content={`${data[0].galleryText} ${data[0].categorieText} High Quality Photographs for sale printed on paper, canvas, metal & digital download - Rebecca Anderson Photography`}
								/>
							</Helmet>
							<div className='page-line'></div>
							<div className='categorie-title'>{data[0].categorieText}</div>
							<div className='slideshow-container'>
								{data.map(item => (
									<div
										className={checkId(item.id) ? "hide" : "show"}
										key={`slideshow${item.id}`}>
										<div className='chevron'>
											<span
												className='chevron-left'
												onClick={() => handleChevron(-1)}>
												<FaChevronCircleLeft />
											</span>
											<div className='slideshow'>
												<Link
													className='slideshow-image-contener'
													to={`/product/${item.reference}`}>
													<img
														alt={item.name}
														className='slideshow-image'
														src={`${item.url}`}
													/>
												</Link>
												<p className='categorie-product-name'>{item.name}</p>
												<p className='categorie-description'>
													{item.description}
												</p>
												<div className='page-container-flex'>
													<div className='categorie-location'>
														<span className='categorie-location-icon'>
															<GoLocation />
														</span>
														{item.location}
													</div>
													<Link
														className='categorie-link-icon'
														to={`/product/${item.reference}`}>
														<MdCameraEnhance />
														<span className='categorie-link-tooltip'>
															Open image
														</span>
													</Link>
													<Favorite
														reference={item.reference}
														url={item.url}
														favorite={favoriteSession}
														setNewFav={setNewFav}
														newFav={newFav}
													/>
													<div
														className='categorie-link-icon'
														onClick={() => handleAddToCart(item)}>
														<FaCartPlus />
														<span className='categorie-link-tooltip'>
															Add to cart
														</span>
													</div>
												</div>
											</div>
											<span
												className='chevron-right'
												onClick={() => handleChevron(1)}>
												<FaChevronCircleRight />
											</span>
										</div>
									</div>
								))}
								<div className='categorie-thumbnails'>
									{data.map(item => (
										<img
											key={`thumbnails${item.id}`}
											alt={item.name}
											className={
												checkId(item.id)
													? "thumbnails unactive-thumbnails"
													: "thumbnails active-thumbnails"
											}
											onClick={() => setActive(item.id)}
											src={`${item.url}`}
										/>
									))}
								</div>
							</div>
							{data.length > 0 && (
								<div className='nav-link-container'>
									<Link className='nav-link' to={`/${data[0].gallery}`}>
										<IoIosArrowDropleft className='nav-link-icon' />
										<span className='capitalized'>{data[0].gallery}</span>
									</Link>
									<Link className='nav-link' to='/'>
										<GoHome className='nav-link-icon' />
										Home
									</Link>
									<Link className='nav-link' to='/my-account'>
										<MdCameraEnhance className='nav-link-icon' />
										My Account
									</Link>
								</div>
							)}
						</>
					)}
				</div>
			</Layout>
		</motion.div>
	)
}

export default Categorie
