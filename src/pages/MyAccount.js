import React, { useState, useEffect } from "react"
import Axios from "axios"
import { Auth } from "../utils/Auth"
import { getCookie, deleteCookie } from "../utils/cookieHelper"
import "../styles/account.css"
import "../styles/pages.css"
import EditProfilModal from "../components/EditProfilModal"
import { Helmet } from "react-helmet"
import { Link, useHistory } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa"
import { RiHeartFill } from "react-icons/ri"
import { GoHome } from "react-icons/go"
import { FiEdit3 } from "react-icons/fi"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function MyAccount() {
	const [renderHeader, setRenderHeader] = useState(false)
	const [login, setLogin] = useState(false)
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [id, setId] = useState("")
	const [userData, setUserData] = useState()
	const [orderData, setOrderData] = useState([])
	const [openEditProfil, setOpenEditProfil] = useState(false)

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
	}, [message])
	// -----------------  get UserData ------------------------------------------------------
	useEffect(() => {
		if (id === "") return
		Auth(id)
			.then(res => {
				setUserData(res)
			})
			.catch(res => {
				console.error(res)
			})
	}, [login, id, message])
	// -----------------  get OrderData ------------------------------------------------------
	useEffect(() => {
		if (id === "") return
		Axios.get(`${process.env.REACT_APP_SERVER_URL}/order/${id}`).then(res => {
			if (res.data !== "no order found") {
				setOrderData(res.data)
			}
		})
		// eslint-disable-next-line
	}, [userData])

	function disconnect() {
		deleteCookie("rebecca-login-cookie")
		sessionStorage.removeItem("rebecca-login-session")
		history.push("/?login=false")
		window.location.reload()
	}

	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout renderHeader={renderHeader}>
				<Helmet>
					<title>Rebecca Anderson Photography - My Account</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - My Account'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Customer Account to purchase and follow orders of Rebecca Anderson Photographs. High quality printing on paper, canvas or metal and digital download available.'
						data-react-helmet='true'
					/>
				</Helmet>
				<div className='page-container' onClick={() => setMessage("")}>
					{openEditProfil && (
						<EditProfilModal
							onClose={() => setOpenEditProfil(false)}
							userData={userData}
							setMessage={setMessage}
							setError={setError}
							id={id}
							setRenderHeader={setRenderHeader}
						/>
					)}
					<div className='page-line'></div>
					<div className='account-title'>My Account</div>
					{(message || error) && (
						<div className='login-message-container'>
							{message && <div className='login-message'> {message}</div>}
							{error && <div className='login-message error'> {error}</div>}
						</div>
					)}
					<div className='disconnect-container'>
						<span className='disconnect' onClick={() => disconnect()}>
							Disconnect
						</span>
					</div>
					{userData && (
						<div className='account-info-container-row'>
							<div className='account-info-container-col'>
								<div className='account-data'>
									<span className='account-label'>Name :</span>
									{userData.firstName} {userData.lastName}
								</div>
								<div className='account-data'>
									<span className='account-label'>Email :</span>
									{userData.email}
								</div>
								<span
									className='account-edit'
									onClick={() => setOpenEditProfil(true)}>
									<FiEdit3 className='account-edit-icon' /> Edit My Personal
									Detail
								</span>
							</div>
							<div className='account-info-container-col'>
								<div className='account-label'>Delivery Address :</div>
								<div className='account-data'>
									{userData.streetNumber} {userData.street} {userData.zipCode}{" "}
									{userData.city} - {userData.country}
								</div>
								<div className='account-label'>Phone Number:</div>
								<div className='account-data'>{userData.phone}</div>
							</div>
						</div>
					)}
					<div className='account-order-container-center'>
						<div className='order-title'>My Order :</div>
						<div className='grid-order'>
							<div className='grid-order-item-label'>Order Number</div>
							<div className='grid-order-item-label'>Date Order</div>
							<div className='grid-order-item-label'>Total Price</div>
							<div className='grid-order-item-label'>Payment Status</div>
							<div className='grid-order-item-label'>Product Purchased</div>
							<div className='grid-order-item-label'>Date expedition</div>
							<div className='grid-order-item-label'>Order Status</div>
							{orderData &&
								orderData.length > 0 &&
								orderData.map(el => (
									<>
										<div className='grid-order-item'>
											<small className='vertical'>{el.orderId}</small>
										</div>
										<div className='grid-order-item'>
											{el.dateOrder.slice(3, 15)}
										</div>
										<div className='grid-order-item'>
											{el.price} {el.currency}
										</div>
										<div className='grid-order-item'>{el.paiement}</div>
										<div className='grid-order-item'>
											{el.product
												.slice(1, -1)
												.split(",")
												.map(el => (
													<span className='account-order-container-center'>
														{el}
													</span>
												))}
										</div>
										<div className='grid-order-item'>
											{el.dateExpedition.slice(3, 15)}
										</div>
										<div className='grid-order-item'>{el.status}</div>
									</>
								))}
						</div>
						{userData && userData.order === "[]" && (
							<div className='account-order-container-center no-order categorie-description marginbottom'>
								You don't have any order yet
							</div>
						)}
					</div>
					<div className='nav-link-container'>
						<Link className='nav-link' to='/'>
							<GoHome className='nav-link-icon' />
							Home
						</Link>
						<Link className='nav-link' to={`/my-cart`}>
							<FaCartPlus className='nav-link-icon' />
							<span className='capitalized'>My Cart</span>
						</Link>
						<Link className='nav-link' to={`/my-favorite`}>
							<RiHeartFill className='nav-link-icon' />
							<span className='capitalized'>My Favorite</span>
						</Link>
					</div>
					{userData &&
						userData.email.slice(0, 12) ===
							`${process.env.REACT_APP_ADMIN_KEY}` && (
							<div className='admin-container'>
								<Link to={"/admin"} className='admin'>
									Admin
								</Link>
							</div>
						)}
				</div>
			</Layout>
		</motion.div>
	)
}

export default MyAccount
