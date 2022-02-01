import React from "react"
import "../styles/cookie.css"
import {
	setCookie,
	deleteCookie,
	setSession,
	getCookie,
} from "../utils/cookieHelper"
import { AiFillCloseCircle } from "react-icons/ai"
import { motion } from "framer-motion"

function CookieConsent({ hide, setHideCookieConsent }) {
	const acceptCookie = () => {
		deleteCookie("rebecca-consent-cookie")
		setCookie("rebecca-consent-cookie", 1, 1)
		setSession("rebecca-consent-session", true)
		setHideCookieConsent(true)
	}
	const declineCookie = () => {
		if (getCookie("rebecca-login-cookie")) {
			setSession("rebecca-login-session", getCookie("rebecca-login-cookie"))
			deleteCookie("rebecca-login-cookie")
		}
		deleteCookie("rebecca-consent-cookie")
		setSession("rebecca-consent-session", false)
		setHideCookieConsent(true)
	}
	return (
		<motion.div
			initial={{ opacity: 0, translateY: 100 }}
			animate={{ opacity: 1, translateY: 0 }}
			transition={{
				duration: 1.2,
				delay: 3.5,
				ease: [0.6, -0.05, 0.01, 0.99],
			}}
			className={
				hide
					? "cookie-consent-container hide-cookie-consent"
					: "cookie-consent-container"
			}>
			<div className='modal-close-contener'>
				<div className='modal-close-btn' onClick={declineCookie}>
					<AiFillCloseCircle />
				</div>
			</div>
			<p className='cookie-text'>
				This Website uses cookies just to allow you to stay logged in on this
				device for a year, That's it no commercial purpose or leaking data. If
				you decline or close this pop up you will stay logged in just for the
				time of the session. Thanks for your understanding.
			</p>
			<div className='cookie-btn-container'>
				<div className='cookie-btn' onClick={acceptCookie}>
					Accept
				</div>
				<div className='cookie-btn cookie-cancel' onClick={declineCookie}>
					Decline
				</div>
			</div>
		</motion.div>
	)
}

export default CookieConsent
