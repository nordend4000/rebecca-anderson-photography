import React from "react"
import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go"
import { IoIosArrowDropleft } from "react-icons/io"
import { MdCameraEnhance } from "react-icons/md"

function NavLinks() {
	return (
		<div className='nav-link-container'>
			<Link className='nav-link' to='/'>
				<GoHome className='nav-link-icon' />
				Back Home
			</Link>
			<Link className='nav-link' to='/galleries'>
				<IoIosArrowDropleft className='nav-link-icon' />
				Galleries
			</Link>
			<Link className='nav-link' to='/themes'>
				<IoIosArrowDropleft className='nav-link-icon' />
				Themes
			</Link>
			<Link className='nav-link' to='/my-account'>
				<MdCameraEnhance className='nav-link-icon' />
				My Account
			</Link>
		</div>
	)
}

export default NavLinks
