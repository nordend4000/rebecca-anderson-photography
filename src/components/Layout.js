import React, { useState, useEffect } from "react"
import "../styles/App.css"
import { Auth } from "../utils/Auth"
import { getCookie } from "../utils/cookieHelper"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import Cart from "../components/Cart"
import Footer from "../components/Footer"
import CartModal from "./CartModal"
import CookieConsent from "../components/CookieConsent"

function Layout({ children }) {
	const [openSidebar, setOpenSidebar] = useState(false)
	const [openCart, setOpenCart] = useState(false)
	const [openCartModal, setOpenCartModal] = useState(false)
	const [login, setLogin] = useState(false)
	const [id, setId] = useState("")
	const [cart, setCart] = useState([])
	const [userData, setUserData] = useState()
	const [productToEdit, setProductToEdit] = useState({})
	const [render, setRender] = useState(0)
	const [renderLogin, setRenderLogin] = useState(0)
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [hideCookieConsent, setHideCookieConsent] = useState(false)
	const [widthSidebar, setWidthSidebar] = useState("22%")
	const [widthCart, setWidthCart] = useState("40%")

	// -----------------------------     COOKIE CONSENT   ------------------------------------------
	useEffect(() => {
		const session = sessionStorage.getItem("rebecca-consent-session")
		if (getCookie("rebecca-consent-cookie") || JSON.parse(session) != null) {
			setHideCookieConsent(true)
		}
	}, [renderLogin])
	// -----------------------------     JUST LOGGED IN CHECK   ------------------------------------------
	useEffect(() => {
		const search = window.location.search
		if (search === "?firstlogin=true") {
			setMessage(
				"Thanks, your account has been successfuly created. Manage your account in My Account.",
			)
			setRenderLogin(renderLogin + 1)
		}
		if (search === "?login=true") {
			setMessage("Thanks, you're successfuly connected to your account.")
			setRenderLogin(renderLogin + 1)
		}
		if (search === "?firstlogincanceled=true") {
			setMessage(
				"Thanks, your account has been successfuly created. You can set your personal detail later in My Account.",
			)
			setRenderLogin(renderLogin + 1)
		}
		if (search === "?login=false") {
			setMessage(
				"You have been successfuly disconnected from your account. See you soon !",
			)
			setRenderLogin(renderLogin + 1)
		}
		// eslint-disable-next-line
	}, [])
	// -----------------------------  STRIPE BACK FROM CHECKOUT ------------------------------------------------------
	useEffect(() => {
		// Check to see if this is a redirect back from Checkout
		const query = new URLSearchParams(window.location.search)
		if (query.get("stripe-paiement-success")) {
			setMessage(
				"Order placed and paiement approved ! You will receive an email confirmation. Follow your order in My Account",
			)
			sessionStorage.removeItem("rebecca-photography-cart")
		}
		if (query.get("stripe-paiement-canceled")) {
			setError(
				"Order canceled -- continue to shop around and checkout when you're ready.",
			)
		}
	}, [])
	// --------------------------------  CART SESSION ------------------------------------------------------
	useEffect(() => {
		const cartSession = sessionStorage.getItem("rebecca-photography-cart")
		setCart(JSON.parse(cartSession))
	}, [openSidebar, openCart, openCartModal, render])
	// -----------------------------  GET ID COOKIE login ------------------------------------------------------
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
	}, [renderLogin, hideCookieConsent])
	// ---------------------------------  get UserData ------------------------------------------------------
	useEffect(() => {
		if (id === "") return
		Auth(id)
			.then(res => {
				setUserData(res)
			})
			.catch(res => {
				console.error(res)
			})
	}, [login, id])
	// ---------------------------------  handle Width & resize ------------------------------------------------------
	useEffect(() => {
		function handleResize() {
			setWidthSidebar(getWidth().sidebarWidth)
			setWidthCart(getWidth().cartWidth)
		}
		window.addEventListener("resize", handleResize)
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	const getWidth = () => {
		let currentWidth = Math.max(
			document.documentElement["clientWidth"],
			document.body["scrollWidth"],
			document.documentElement["scrollWidth"],
			document.body["offsetWidth"],
			document.documentElement["offsetWidth"],
		)
		let sidebarWidth, cartWidth
		if (currentWidth < 600) {
			sidebarWidth = "80%"
			cartWidth = "90%"
		}
		if (currentWidth < 900 && currentWidth >= 600) {
			sidebarWidth = "40%"
			cartWidth = "60%"
		}
		if (currentWidth >= 900) {
			sidebarWidth = "22%"
			cartWidth = "40%"
		}
		return { sidebarWidth, cartWidth }
	}

	function handleResetMessage() {
		setMessage("")
		setError("")
	}

	return (
		<div onClick={() => handleResetMessage()} className='layout'>
			<CookieConsent
				hide={hideCookieConsent}
				setHideCookieConsent={setHideCookieConsent}
			/>
			{openCartModal && (
				<CartModal
					open={openCartModal}
					onClose={() => setOpenCartModal(false)}
					product={productToEdit}
					edit
				/>
			)}
			<Header
				openSidebar={openSidebar}
				setOpenSidebar={setOpenSidebar}
				openCart={openCart}
				setOpenCart={setOpenCart}
			/>
			{login && userData && (
				<div className='user'>{userData.firstName || userData.email || ""}</div>
			)}
			{openCart && (
				<Cart
					setOpenCart={setOpenCart}
					cart={cart}
					setOpenCartModal={setOpenCartModal}
					setProductToEdit={setProductToEdit}
					setRender={setRender}
					render={render}
					userData={userData}
					width={widthCart}
				/>
			)}
			{openSidebar && (
				<Sidebar
					openSidebar={openSidebar}
					setOpenSidebar={setOpenSidebar}
					login={login}
					width={widthSidebar}
				/>
			)}
			{(message || error) && (
				<div className='login-message-container'>
					{message && <div className='login-message'> {message}</div>}
					{error && <div className='login-message error'> {error}</div>}
				</div>
			)}
			<main className='main'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
