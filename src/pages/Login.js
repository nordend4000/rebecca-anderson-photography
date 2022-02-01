import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Helmet } from "react-helmet"
import Axios from "axios"
import NavLinks from "../components/NavLinks"
import { RiHeartFill } from "react-icons/ri"
import { RiShoppingCartLine } from "react-icons/ri"
import {
	getCookie,
	setCookie,
	deleteCookie,
	setSession,
} from "../utils/cookieHelper"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function Login() {
	const [registerEmail, setRegisterEmail] = useState("")
	const [registerPassword, setRegisterPassword] = useState("")
	const [loginEmail, setLoginEmail] = useState("")
	const [loginPassword, setLoginPassword] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [openForgot, setOpenForgot] = useState(false)
	const [forgotEmail, setForgotEmail] = useState("")
	const history = useHistory()

	useEffect(() => {
		const search = window.location.search
		if (search === "?checkout-unlogged=true") {
			setMessage(
				"In order to finalize your checkout, please sign in to create your free account or login",
			)
		}
	}, [])

	const register = () => {
		setMessage("")
		setError("")
		Axios({
			method: "POST",
			data: {
				email: registerEmail,
				password: registerPassword,
			},
			withCredentials: true,
			url: `${process.env.REACT_APP_SERVER_URL}/register`,
		}).then(res => {
			if (
				res.data ===
				"Your account has been created successfully : Please login to your account"
			) {
				return setMessage(res.data)
			}
			return setError(res.data)
		})
	}
	const login = () => {
		setMessage("")
		setError("")
		Axios({
			method: "POST",
			data: {
				email: loginEmail,
				password: loginPassword,
			},
			withCredentials: true,
			url: `${process.env.REACT_APP_SERVER_URL}/login`,
		}).then(res => {
			if (
				res.data === "Incorrect password, Try again ..." ||
				res.data === "Incorrect email address, Try again ..."
			) {
				setError(res.data)
			} else {
				if (getCookie("rebecca-consent-cookie")) {
					deleteCookie("rebecca-login-cookie")
					setCookie("rebecca-login-cookie", res.data, 365)
				} else {
					deleteCookie("rebecca-login-cookie")
					setSession("rebecca-login-session", res.data)
				}
				checkIdAndRedirect(res.data)
			}
		})
	}
	const checkIdAndRedirect = async idToGet => {
		await Axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${idToGet}`).then(
			response => {
				if (response.data && response.data.firstName !== "") {
					history.push("/?login=true")
					window.location.reload()
				} else {
					return history.push(`/my-profile/${idToGet}`)
				}
			},
		)
	}
	const resetPassword = () => {
		Axios({
			method: "PUT",
			data: {
				email: forgotEmail,
			},
			withCredentials: true,
			url: `${process.env.REACT_APP_SERVER_URL}/reset-password`,
		}).then(res => {
			if (
				res.data ===
				"This Email doesn't exist in our database. Please try another one."
			) {
				setError(
					"This Email doesn't exist in our database. Please try another one.",
				)
			}
			if (res.data === "new password saved but email not sent") {
				setError(
					"Ooops something wrong happenned, please try again to reset your password.",
				)
			}
			if (res.data === "new password saved and email sent") {
				setMessage(
					"We just sent your new password on your email address. Please check your inbox message and come back to login.",
				)
			}
		})
	}
	const handleClearMessage = () => {
		setMessage("")
		setError("")
	}

	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<Helmet>
					<title>Rebecca Anderson Photography - Login - Create Account</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - Login - Create Account'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Login or create account to purchase Rebecca Anderson Photographs. High quality printing on paper, canvas or metal and digital download available.'
						data-react-helmet='true'
					/>
				</Helmet>
				<div className='page-container'>
					<div className='page-line'></div>
					{(message || error) && (
						<div className='login-message-container'>
							{message && <div className='login-message'>{message}</div>}
							{error && <div className='login-message error'>{error}</div>}
						</div>
					)}
					<div className='page-container-login' onClick={handleClearMessage}>
						<div className='page-container-login-half'>
							<div className='login-title'>Sign In</div>
							<p>Please create your account below :</p>
							<div className='login-input-group'>
								<input
									className='login-input'
									placeholder='email'
									type='email'
									onChange={e => setRegisterEmail(e.target.value)}
								/>
								<input
									className='login-input'
									placeholder='password'
									onChange={e => setRegisterPassword(e.target.value)}
								/>
								<button className='login-btn' onClick={register}>
									Sign In
								</button>
							</div>
						</div>
						<div className='page-container-login-half'>
							<div className='login-title'>Login</div>
							<p>Already have an account, login to continue :</p>
							<div className='login-input-group'>
								<input
									className='login-input'
									placeholder='email'
									type='email'
									onChange={e => setLoginEmail(e.target.value)}
								/>
								<input
									className='login-input'
									placeholder='password'
									onChange={e => setLoginPassword(e.target.value)}
								/>
								<button className='login-btn' onClick={login}>
									Login
								</button>
							</div>
						</div>
					</div>
					<div
						className='forgot-password'
						onClick={() => setOpenForgot(!openForgot)}>
						Forgot your Password ?
					</div>
					{openForgot && (
						<div className='input-forgot-container'>
							<input
								className='login-input input-forgot'
								placeholder='Enter your Email address :'
								type='email'
								onChange={e => setForgotEmail(e.target.value)}
							/>
							<button
								className='login-btn  input-forgot-btn'
								onClick={resetPassword}>
								Reset Password
							</button>
						</div>
					)}
					<div className='nav-link-container col'>
						<div>As guest you can access :</div>
						<Link className='nav-link' to='/my-cart'>
							<RiShoppingCartLine className='nav-link-icon' />
							My Cart
						</Link>
						<Link className='nav-link' to='/my-favorite'>
							<RiHeartFill className='nav-link-icon' />
							My Favorite
						</Link>
					</div>
					<NavLinks />
				</div>
			</Layout>
		</motion.div>
	)
}

export default Login
