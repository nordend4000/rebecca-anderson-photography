import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Auth } from "../utils/Auth"
import { getCookie } from "../utils/cookieHelper"
import { Helmet } from "react-helmet"
import Axios from "axios"
import CartModal from "../components/CartModal"
import "../styles/cart.css"
import NavLinks from "../components/NavLinks"
import { AiOutlineDelete } from "react-icons/ai"
import { RiImageEditLine } from "react-icons/ri"
import { BiMailSend } from "react-icons/bi"
import { MdCameraEnhance } from "react-icons/md"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function MyCart() {
	const [cart, setCart] = useState([])
	const [openCartModal, setOpenCartModal] = useState(false)
	const [productToEdit, setProductToEdit] = useState({})
	const [render, setRender] = useState(0)
	const [login, setLogin] = useState(false)
	const [id, setId] = useState("")
	const [userData, setUserData] = useState()

	const history = useHistory()
	// -----------------  login ------------------------------------------------------
	useEffect(() => {
		if (getCookie("rebecca-login-cookie")) {
			setLogin(true)
			setId(getCookie("rebecca-login-cookie"))
		}
		const sessionLogin = sessionStorage.getItem("rebecca-login-session")
		if (sessionLogin) {
			setLogin(true)
			setId(JSON.parse(sessionLogin))
		}
	}, [])
	// -----------------  get UserData ------------------------------------------------------
	useEffect(() => {
		if (id === "") return
		Auth(id)
			.then(res => {
				setUserData(res)
			})
			.catch(err => {
				console.error(err)
			})
	}, [login, id])
	// -----------------  Session Cart ------------------------------------------------------
	useEffect(() => {
		const cartSession = sessionStorage.getItem("rebecca-photography-cart")
		setCart(JSON.parse(cartSession))
	}, [render])

	function removeItem(orderId) {
		const newCart = cart.filter(el => el.orderId !== orderId)
		sessionStorage.removeItem("rebecca-photography-cart")
		sessionStorage.setItem("rebecca-photography-cart", JSON.stringify(newCart))
		setRender(render + 1)
	}
	function handleEdit(product) {
		setProductToEdit(product)
		setOpenCartModal(true)
	}
	function computeTotalPrice() {
		if (cart == null) return
		let total = 0
		cart.map(el => {
			return (total = total + el.price * el.quantity)
		})
		return total
	}
	function handleClose() {
		setOpenCartModal(false)
		setRender(render + 1)
	}
	function handleCheckout() {
		if (!userData) {
			return history.push("/login/?checkout-unlogged=true")
		}
		Axios({
			method: "POST",
			data: {
				price: computeTotalPrice() * 100,
				cart: cart,
				customerId: userData._id,
				customerEmail: userData.email,
			},
			withCredentials: true,
			url: `${process.env.REACT_APP_SERVER_URL}/create-checkout-session`,
		}).then(res => {
			window.location = res.data.url
		})
	}
	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<Helmet>
					<title>Rebecca Anderson Photography - My Cart</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - My Cart'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Customer Cart to purchase Rebecca Anderson Photographs. High quality printing on paper, canvas or metal and digital download available. Checkout using Stripe.'
						data-react-helmet='true'
					/>
				</Helmet>
				<div className='page-container mycart'>
					{openCartModal && (
						<CartModal
							open={openCartModal}
							onClose={() => handleClose()}
							product={productToEdit}
							edit
						/>
					)}
					<div className='page-line'></div>
					<div className='categorie-title'>My Cart</div>
					{cart == null || cart.length === 0 ? (
						<div className='cart-btn-container'>
							You don't have any items in your Cart yet
						</div>
					) : (
						<>
							<div className='cart-grid'>
								<div className='cart-grid-product'> Product</div>
								<div className='cart-grid-quantity'> Quantity</div>
								<div className='cart-grid-price'> Price</div>
							</div>
							{cart.map(product => (
								<div>
									<div className='cart-product-name'>
										{product.name}
										<div className='cart-product-type capitalized'>
											{product.printSize} {product.printType}{" "}
											{product.printFinish}
										</div>
										<div className='cart-product-type'>
											{product.sizeOrder} ({product.resolution})
										</div>
									</div>
									<div className='cart-grid' key={product.orderId}>
										<div className='cart-grid-quantity'>
											x {product.quantity}
										</div>
										<div className=' cart-grid-price'>{product.price} €</div>
									</div>
									<img
										alt={product.name}
										className='mycart-image'
										src={product.url}
									/>
									<span className='categorie-link-icon'>
										<RiImageEditLine onClick={() => handleEdit(product)} />
										<span className='categorie-link-tooltip'>Edit Item</span>
									</span>
									<Link
										className='categorie-link-icon'
										to={`product/${product.reference}`}>
										<MdCameraEnhance />
										<span className='categorie-link-tooltip'>Open Item</span>
									</Link>
									<span className='categorie-link-icon'>
										<AiOutlineDelete
											onClick={() => removeItem(product.orderId)}
										/>
										<span className='categorie-link-tooltip'>Remove Item</span>
									</span>
									<span className='cart-product-subtotal'>
										SubTotal :{" "}
										{parseInt(product.quantity) * parseInt(product.price)} €
									</span>
								</div>
							))}
						</>
					)}
					{cart !== null && cart.length > 0 && (
						<>
							<div className='cart-product-total'>
								Total Order : {computeTotalPrice()} €
							</div>
							<div
								className='cart-btn cart-btn-mycart'
								onClick={() => handleCheckout()}>
								Checkout
							</div>
							<div className='modal-helper'>
								Need help for your print ( different medium, custom resolution,
								larger size, raw file...)
							</div>
							<Link className='modal-helper-link' to={"/contact"}>
								<div className='larger'>
									<BiMailSend />
								</div>
								<div>Please don't hesitate to contact us</div>
							</Link>
						</>
					)}
					<NavLinks />
				</div>
			</Layout>
		</motion.div>
	)
}

export default MyCart
