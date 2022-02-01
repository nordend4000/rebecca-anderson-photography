import React, { useState, useEffect } from "react"
import { Auth } from "../utils/Auth"
import { getCookie } from "../utils/cookieHelper"
import emailjs from "@emailjs/browser"
import NavLinks from "../components/NavLinks"
import Layout from "../components/Layout"
import { BiMailSend } from "react-icons/bi"
import Recaptcha from "react-recaptcha"
import { Helmet } from "react-helmet"
import { motion } from "framer-motion"
import { Page } from "../ressources/variants"

const regex_email = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
)

function Contact() {
	const [email, setEmail] = useState("")
	const [name, setName] = useState("")
	const [userMessage, setUserMessage] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [id, setId] = useState("")
	const [sending, setSending] = useState(false)
	const [humanVerified, setHumanVerified] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [message, error])
	// -----------------  GET ID COOKIE login ------------------------------------------------------
	useEffect(() => {
		if (getCookie("rebecca-login-cookie")) {
			setId(getCookie("rebecca-login-cookie"))
		}
		const sessionLogin = sessionStorage.getItem("rebecca-login-session")
		if (sessionLogin) {
			setId(JSON.parse(sessionLogin))
		}
	}, [])
	// -----------------  get UserName ------------------------------------------------------
	useEffect(() => {
		if (id === "") return
		Auth(id)
			.then(res => {
				setName(`${res.firstName} ${res.lastName}`)
				setEmail(res.email)
			})
			.catch(res => {
				console.error(res)
			})
	}, [id])
	const sendMessage = () => {
		if (name === "") {
			setError("Please verify your form, you neeed to enter your name.")
		}
		if (email === "") {
			setError("Please verify your form, you need to enter your email address.")
		}
		if (userMessage === "") {
			setError("Please verify your form, you need to enter your message.")
		}
		if (!regex_email.test(email)) {
			setError(
				"Please verify your form, you need to enter a valid email address.",
			)
		}
		if (!humanVerified) {
			setError("Please use Recaptcha to verify that you are a real Human !")
		}
		if (
			name !== "" &&
			email !== "" &&
			userMessage !== "" &&
			regex_email.test(email) &&
			humanVerified
		) {
			const form = {
				user_name: name,
				user_email: email,
				message: userMessage,
			}
			setSending(true)
			sendEmailjs(form)
		} else {
		}
	}

	function sendEmailjs(form) {
		emailjs
			.send(
				`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`,
				`${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`,
				form,
				`${process.env.REACT_APP_EMAILJS_USER_ID}`,
			)
			.then(
				result => {
					setMessage(
						"Your message has been sent successfully. Thanks for reaching out. I will answer you as soon as possible.",
					)
					setError("")
					setName("")
					setEmail("")
					setUserMessage("")
					setSending(false)
				},
				error => {
					setError(
						"Oooops something wrong happened, please try again to send your message.",
					)
					setMessage("")
					setSending(false)
				},
			)
	}

	const handleClearMeassage = () => {
		setMessage("")
		setError("")
	}
	const verifyCallback = function (response) {
		if (response) {
			setHumanVerified(true)
		}
	}
	const onloadCallback = function () {
		console.log("grecaptcha is ready!")
		console.log("humanVerified", humanVerified)
	}
	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<div className='page-container' onClick={handleClearMeassage}>
					<Helmet>
						<title>Rebecca Anderson Photography - Contact Form</title>
						<meta
							name='title'
							content='Rebecca Anderson Photography - Contact Form'
							data-react-helmet='true'
						/>
						<meta
							name='description'
							content='Contact form for customer service, feedback, custom printing, format download, order assistance or any request regarding this e-commerce website - Rebecca Anderson Photography'
						/>
					</Helmet>
					<div className='page-line'></div>
					<div className='categorie-title'>Contact</div>
					<div>
						<p className='categorie-description contact-p'>
							You need help with your order or want a custom printing. You would
							like to give me a feedback or you wish to know more about a
							picture or a location. You have any other request, please don't
							hesitate to contact me.
						</p>
						<p className='categorie-description contact-p'>
							I would be really happy to answer to your message.
						</p>
						{(message || error) && (
							<div className='login-message-container'>
								{message && <div className='login-message'> {message}</div>}
								{error && <div className='login-message error'> {error}</div>}
							</div>
						)}
						<div className='contact-col'>
							<label className='contact-label'>Name :</label>
							<input
								className='edit-input  contact-input'
								placeholder='Your Name'
								type='text'
								onChange={e => setName(e.target.value)}
								value={name}
							/>
							<label className='contact-label'>Email :</label>
							<input
								className='edit-input  contact-input'
								placeholder='Your email address'
								type='email'
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
							<label className='contact-label'>Message :</label>
							<textarea
								className='edit-input contact-textarea '
								placeholder='Your message...'
								onChange={e => setUserMessage(e.target.value)}
								value={userMessage}
							/>
						</div>
						<div className='modal-btn-container'>
							<Recaptcha
								sitekey={`${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`}
								render='explicit'
								verifyCallback={verifyCallback}
								onloadCallback={onloadCallback}
							/>
						</div>
						{sending && (
							<div className='sending-email'>
								<img
									alt='sending email animation'
									src={process.env.PUBLIC_URL + `/images/loading.svg`}
								/>
							</div>
						)}
						<div className='modal-btn-container'>
							<div className='modal-btn' onClick={sendMessage}>
								<BiMailSend /> Send Message
							</div>
						</div>
					</div>
					<NavLinks />
				</div>
			</Layout>
		</motion.div>
	)
}

export default Contact
