import React from "react"
import "../styles/header.css"
import { AiOutlineMenu } from "react-icons/ai"
import { HiOutlineX } from "react-icons/hi"
import { RiShoppingCartLine } from "react-icons/ri"

function Header({ openSidebar, setOpenSidebar, setOpenCart, openCart }) {
	return (
		<header className='header'>
			<div className='header-menu-icon'>
				{openSidebar ? (
					<HiOutlineX onClick={() => setOpenSidebar(!openSidebar)} />
				) : (
					<AiOutlineMenu onClick={() => setOpenSidebar(!openSidebar)} />
				)}
			</div>
			<div className='header-title'>
				<h1 className='header-name'>
					Rebecca Anderson de la llana
					<span className='header-subtitle'>Photography</span>
				</h1>
			</div>
			<div className='header-cart'>
				{openCart ? (
					<HiOutlineX onClick={() => setOpenCart(!openCart)} />
				) : (
					<RiShoppingCartLine onClick={() => setOpenCart(!openCart)} />
				)}
			</div>
		</header>
	)
}

export default Header
