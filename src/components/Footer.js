import React from "react"
import { Link } from "react-router-dom"
import "../styles/footer.css"
import { AiOutlineCopyrightCircle } from "react-icons/ai"
import { TiSocialFacebookCircular } from "react-icons/ti"
import { TiSocialTwitterCircular } from "react-icons/ti"
import { TiSocialLinkedinCircular } from "react-icons/ti"
import { HiOutlineMail } from "react-icons/hi"

function Footer() {
	return (
		<div className='footer'>
			<h4 className='footer-slogan'>
				The most important thing in photography is sharing
			</h4>
			<h3 className='footer-slogan2'>
				HIGH QUALITY PHOTOGRAPHY FOR SALE : PRINT ON PAPER, CANVAS, METAL &
				DIGITAL DOWNLOAD
			</h3>
			<div className='page-line'></div>
			<div className='footer-row-social'>
				<Link to='/contact'>
					<TiSocialFacebookCircular className='footer-social' />
				</Link>
				<Link to='/contact'>
					<TiSocialTwitterCircular className='footer-social' />
				</Link>
				<Link to='/contact'>
					<TiSocialLinkedinCircular className='footer-social' />
				</Link>

				<Link to='/contact'>
					<HiOutlineMail className='footer-social' />
				</Link>
			</div>
			<h2 className='footer-title'>
				Rebecca Anderson de la llana - Photography
			</h2>
			<div className='footer-last-row'>
				<div className='footer-copyright-container'>
					<span className='footer-copyright-icon'>
						<AiOutlineCopyrightCircle />
					</span>
					<span className='footer-copyright'>2021 - All Rights Reserved </span>
				</div>
				<Link to='/terms-and-conditions' className='footer-legal-links'>
					T's & C's / Privacy Policy
				</Link>
			</div>
		</div>
	)
}

export default Footer
