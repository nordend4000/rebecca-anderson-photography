import React from "react"
import { Link, useHistory } from "react-router-dom"
import Axios from "axios"
import "../styles/cart.css"
import { AiOutlineDelete } from "react-icons/ai"
import { RiImageEditLine } from "react-icons/ri"
import { IoIosArrowDropleft } from "react-icons/io"
import { MdCameraEnhance } from "react-icons/md"
import { motion } from "framer-motion"

function Cart({
	cart,
	setOpenCart,
	setOpenCartModal,
	setProductToEdit,
	render,
	setRender,
	userData,
	width,
}) {
	const history = useHistory()

	function handleEdit(product) {
		setProductToEdit(product)
		setOpenCart(false)
		setOpenCartModal(true)
	}
	function removeItem(orderId) {
		const newCart = cart.filter(el => el.orderId !== orderId)
		sessionStorage.removeItem("rebecca-photography-cart")
		sessionStorage.setItem("rebecca-photography-cart", JSON.stringify(newCart))
		setRender(render + 1)
	}
	function computeTotalPrice() {
		if (cart == null) return
		let total = 0
		cart.map(el => {
			return (total = total + el.price * el.quantity)
		})
		return total
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
			setOpenCart(false)
		})
	}

	// VARIANTS WIDTH MENU
	let container = {
		initial: { opacity: 0, width: 0, y: -10 },
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
	// VARIANTS CHILDRENS MENU
	const item = {
		initial: { opacity: 0, translateX: 100 },
		animate: {
			opacity: 1,
			translateX: 0,
		},
	}
	return (
		<motion.div
			variants={container}
			initial='initial'
			animate='animate'
			exit='exit'
			className='cart'>
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{
					duration: 0.3,
					delay: 1.2,
					ease: [0.6, -0.05, 0.01, 0.99],
				}}
				key='Title'
				className='cart-my-cart'>
				My Cart
			</motion.div>
			{cart == null || cart.length === 0 ? (
				<motion.div
					variants={item}
					initial='initial'
					animate='animate'
					transition={{
						duration: 0.3,
						delay: 1.5,
						ease: [0.6, -0.05, 0.01, 0.99],
					}}
					key='No-items'
					className='cart-btn-container'>
					You don't have any items in your Cart yet
				</motion.div>
			) : (
				<>
					<motion.div
						variants={item}
						initial='initial'
						animate='animate'
						transition={{
							duration: 0.3,
							delay: 1.7,
							ease: [0.6, -0.05, 0.01, 0.99],
						}}
						key='Title'
						className='cart-legend-container'>
						<div className='cart-legend-product'> Product</div>
						<div className='cart-legend-number'> Quantity</div>
						<div className='cart-legend-number'> Price</div>
					</motion.div>
					{cart.map(product => (
						<motion.div
							variants={item}
							initial='initial'
							animate='animate'
							transition={{
								duration: 0.3,
								delay: 1.9,
								ease: [0.6, -0.05, 0.01, 0.99],
							}}
							className='cart-product-container'
							key={product.orderId}>
							<div className='cart-product-name'>{product.name}</div>
							<div className='cart-product-type capitalized'>
								{product.printSize} {product.printType} {product.printFinish}
							</div>
							<div className='cart-product-type'>
								{product.sizeOrder} ({product.resolution})
							</div>
							<div className='cart-legend-container'>
								<img
									alt={product.name}
									className='cart-image'
									src={product.url}
								/>
								<span className='cart-product-number'>{product.quantity}</span>
								<span className='cart-product-number'>{product.price} €</span>
							</div>
							<div>
								<span className='categorie-link-icon'>
									<RiImageEditLine onClick={() => handleEdit(product)} />
									<span className='categorie-link-tooltip'>Edit Item</span>
								</span>
								<Link
									className='categorie-link-icon'
									onClick={() => setOpenCart(false)}
									to={`/product/${product.reference}`}>
									<MdCameraEnhance />
									<span className='categorie-link-tooltip'>Open Item</span>
								</Link>
								<span className='categorie-link-icon'>
									<AiOutlineDelete
										onClick={() => removeItem(product.orderId)}
									/>
									<span className='categorie-link-tooltip'>Remove Item</span>
								</span>
							</div>
							<div className='cart-product-subtotal'>
								SubTotal :{" "}
								{parseInt(product.quantity) * parseInt(product.price)} €
							</div>
						</motion.div>
					))}
					{cart !== null && cart.length > 0 && (
						<motion.div
							variants={item}
							initial='initial'
							animate='animate'
							transition={{
								duration: 0.3,
								delay: 2.1,
								ease: [0.6, -0.05, 0.01, 0.99],
							}}
							key='total'
							className='cart-product-total'>
							Total Order : {computeTotalPrice()} €
						</motion.div>
					)}
					<motion.div
						variants={item}
						initial='initial'
						animate='animate'
						transition={{
							duration: 0.3,
							delay: 2.3,
							ease: [0.6, -0.05, 0.01, 0.99],
						}}
						key='btn'
						className='cart-btn-container'>
						<Link
							to='/my-cart'
							className='cart-btn'
							onClick={() => setOpenCart(false)}>
							View Cart
						</Link>
						<div className='cart-btn' onClick={() => handleCheckout()}>
							Checkout
						</div>
					</motion.div>
				</>
			)}
			<motion.div
				variants={item}
				initial='initial'
				animate='animate'
				transition={{
					duration: 0.3,
					delay: cart == null || cart.length === 0 ? 1.7 : 2.5,
					ease: [0.6, -0.05, 0.01, 0.99],
				}}
				key='btn'>
				<Link
					to='/'
					className='cart-continue-shopping'
					onClick={() => setOpenCart(false)}>
					<IoIosArrowDropleft className='nav-link-icon' />
					Continue Shopping
				</Link>
			</motion.div>
		</motion.div>
	)
}

export default Cart
