import React, { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useParams } from "react-router-dom"
import "../styles/pages.css"
import Axios from "axios"
import CartModal from "./CartModal"
import Favorite from "./Favorite"
import Layout from "./Layout"
import { motion } from "framer-motion"
import { Page } from "../ressources/variants"
import { Link } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa"
import { GoLocation } from "react-icons/go"
import { IoIosArrowDropleft } from "react-icons/io"
import { GoHome } from "react-icons/go"
import { MdCameraEnhance } from "react-icons/md"

function Product() {
	const { reference } = useParams()
	const [product, setProduct] = useState([])
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
		document.querySelector("body").scrollTo(0, 0)
	}, [openCartModal, product])

	useEffect(() => {
		Axios.get(
			`${process.env.REACT_APP_SERVER_URL}/get-product/${reference}`,
		).then(response => {
			setProduct(response.data[0])
			setLoading(false)
		})
	}, [reference])

	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<div className='page-container'>
					<Helmet>
						<title>{`Rebecca Anderson Photography - ${product.galleryText} ${product.categorieText} - ${product.name}`}</title>
						<meta
							name='title'
							content={`Rebecca Anderson Photography - ${product.galleryText} ${product.categorieText} - ${product.name}`}
							data-react-helmet='true'
						/>
						<meta
							name='description'
							content={`${product.galleryText} ${product.categorieText} - High Quality Photography of ${product.name} for sale printed on paper, canvas, metal & digital download - Rebecca Anderson Photography`}
						/>
					</Helmet>
					{openCartModal && (
						<CartModal
							open={openCartModal}
							onClose={() => setOpenCartModal(false)}
							product={product}
						/>
					)}
					<div className='page-line'></div>
					<div className='categorie-title'>{product.name}</div>
					{loading ? (
						<div className='login-message-container'>
							<img
								alt='loading bar'
								src={process.env.PUBLIC_URL + `/images/loading.svg`}
							/>
						</div>
					) : (
						<>
							<div className='slideshow'>
								<div className='slideshow-image-contener'>
									<img
										alt={product.name}
										className='product-image'
										src={product.url}
									/>
								</div>
								<p className='categorie-description'>{product.description}</p>
								<div className='page-container-flex'>
									<div className='categorie-location'>
										<span className='categorie-location-icon'>
											<GoLocation />
										</span>
										{product.location}
									</div>
									<Favorite
										reference={product.reference}
										url={product.url}
										favorite={favoriteSession}
										setNewFav={setNewFav}
										newFav={newFav}
									/>
									<div
										className='categorie-link-icon'
										onClick={() => setOpenCartModal(true)}>
										<FaCartPlus />
										<span className='categorie-link-tooltip'>Add to cart</span>
									</div>
								</div>
								<div className='page-container-flex'>
									<div className='product-type-data '>
										<div>
											<span className='product-type'>Camera :</span>{" "}
											{product.camera}
										</div>
										<div>
											<span className='product-type'>Lens :</span>{" "}
											{product.lens}
										</div>
										<div>
											<span className='product-type'>Full Dimension :</span>{" "}
											{product.width} x {product.height} pixels
										</div>
										<div>
											<span className='product-type'>High Quality Size :</span>{" "}
											{product.size} Mo
										</div>
									</div>
									<div className='product-type-data '>
										<div>
											<span className='product-type'>Shutter Speed: </span>{" "}
											{product.shutterSpeed}
										</div>
										<div>
											<span className='product-type'>Focal Lenght :</span>{" "}
											{product.focalLenght}
										</div>
										<div>
											<span className='product-type'>Aperture :</span>{" "}
											{product.aperture}
										</div>
										<div>
											<span className='product-type'>Reference :</span>{" "}
											{product.reference}
										</div>
									</div>
								</div>
							</div>
							<div className='page-line'></div>
							<div className='nav-link-container'>
								<Link
									className='nav-link'
									to={`/${product.gallery}/${product.categorie}`}>
									<IoIosArrowDropleft className='nav-link-icon' />
									{product.categorieText} {product.galleryText}
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
						</>
					)}
				</div>
			</Layout>
		</motion.div>
	)
}

export default Product
