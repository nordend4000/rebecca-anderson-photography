import React, { useState } from "react"
import ReactDom from "react-dom"
import { Link } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { BiMailSend } from "react-icons/bi"
import { getCookie } from "../utils/cookieHelper"

function CartModal({ open, onClose, product, edit }) {
	const [selectPurchase, setSelectPurchase] = useState(
		product.selectPurchase || "",
	)
	const [printType, setPrintType] = useState(product.printType || "")
	const [printSize, setPrintSize] = useState(product.printSize || 100)
	const [printFinish, setPrintFinish] = useState(product.printFinish || "")
	const [quantity, setQuantity] = useState(product.quantity || 1)
	if (!open) return null

	function computeSize(size) {
		let resolution
		if (size === "standard") resolution = 120
		if (size === "medium") resolution = 90
		if (size === "large") resolution = 60
		return `${Math.floor(product.width / resolution)}cm x ${Math.floor(
			product.height / resolution,
		)}cm`
	}
	function computeResolution(size) {
		let resolution
		if (size === "standard") resolution = "120 pixels/cm"
		if (size === "medium") resolution = "90 pixels/cm"
		if (size === "large") resolution = "60 pixels/cm"
		return resolution
	}
	function computePrice() {
		if (selectPurchase === "digital") {
			return product[`${printType}`] || product.price
		}
		return Math.ceil(
			((product[`${printType}`] * product[`${printSize}`]) / 100) * quantity,
		)
	}
	function handleSelect(e) {
		if (e === "print") {
			setPrintType("")
			setPrintSize(100)
		}
		if (e === "digital") {
			setPrintType("digital")
			setPrintSize("High Quality ")
			setPrintFinish("Download")
		}
		setSelectPurchase(e)
	}
	function addToCart() {
		if (printType === "" || selectPurchase === "") return
		if (selectPurchase === "print" && printFinish === "") return
		if (selectPurchase === "print" && printSize === "") return
		let price, sizeOrder, resolution
		if (printType === "digital") {
			price = product[`${printType}`]
			sizeOrder = `${product.width}px x ${product.height}px`
			resolution = "120 px/cm"
		} else {
			price = computePrice(product[`${printType}`], product[`${printSize}`])
			sizeOrder = computeSize(printSize)
			resolution = computeResolution(printSize)
		}
		function getCustomerId() {
			let id = "GUEST_UNLOGGED"
			if (getCookie("rebecca-login-cookie")) {
				id = getCookie("rebecca-login-cookie")
			}
			const sessionLogin = sessionStorage.getItem("rebecca-login-session")
			if (sessionLogin) {
				id = JSON.parse(sessionLogin)
			}
			return id
		}
		const order = {
			orderId: uuidv4(),
			customerId: getCustomerId(),
			selectPurchase,
			printType,
			printSize,
			printFinish,
			price,
			sizeOrder,
			resolution,
			quantity,
			canvas: product.canvas,
			height: product.height,
			large: product.large,
			medium: product.medium,
			metal: product.metal,
			name: product.name,
			paper: product.paper,
			digital: product.digital,
			reference: product.reference,
			size: product.size,
			standard: product.standard,
			width: product.width,
			url: product.url,
		}
		let prevCart = []
		const cartSession = sessionStorage.getItem("rebecca-photography-cart")
		if (cartSession !== null) prevCart = JSON.parse(cartSession)
		if (edit) {
			const cartTemp = JSON.parse(cartSession)
			prevCart = cartTemp.filter(el => el.orderId !== product.orderId)
			sessionStorage.removeItem("rebecca-photography-cart")
		}
		prevCart.push(order)
		sessionStorage.setItem("rebecca-photography-cart", JSON.stringify(prevCart))
		clearStates()
		onClose()
	}
	function clearStates() {
		setSelectPurchase("")
		setPrintType("")
		setPrintSize(100)
		setPrintFinish("")
		setQuantity(1)
	}
	return ReactDom.createPortal(
		<>
			<div className='overlay-styles' onClick={onClose} />
			<div className='modal-styles'>
				<div className='modal-close-contener'>
					<div className='modal-close-btn' onClick={onClose}>
						<AiFillCloseCircle />
					</div>
				</div>
				<div className='body-modal'>
					<h2 className='modal-title'>ADD TO CART</h2>
					<div className='modal-container-flex-row'>
						<div className='modal-container-flex-col'>
							<span className='modal-product-name'>{product.name}</span>
							<img
								alt={product.name}
								className='modal-image'
								src={product.url}
							/>
						</div>
						<div className='modal-container-flex-col'>
							<div className='modal-product-type-data '>
								<div>
									<span className='modal-product-type'>Full Dimension :</span>
									{product.width} x {product.height} pixels
								</div>
								<div>
									<span className='modal-product-type'>
										High Quality Size :
									</span>
									{product.size} Mo
								</div>
								<div>
									<span className='modal-product-type'>Reference :</span>
									{product.reference}
								</div>
							</div>
						</div>
					</div>
					<div className='modal-text'>{product.description}</div>
					<select
						value={selectPurchase}
						onChange={e => handleSelect(e.target.value)}
						placeholder='PRINT OR DOWNLOAD'
						className='select-print'>
						<option>Printing or Digital Version</option>
						<option key='print' value='print'>
							Printing
						</option>
						<option key='digital' value='digital'>
							Digital Version
						</option>
					</select>
					{selectPurchase === "print" && (
						<div className='modal-container'>
							<select
								value={printType}
								onChange={e => setPrintType(e.target.value)}
								placeholder='Print Type'
								className='select-print'>
								<option>Select your printing medium</option>
								<option key='photo paper' value='paper'>
									Photo Paper
								</option>
								<option key='canvas' value='canvas'>
									Canvas
								</option>
								<option key='metal' value='metal'>
									Metal
								</option>
							</select>
							<select
								value={printSize}
								onChange={e => setPrintSize(e.target.value)}
								placeholder='Print Size'
								className='select-print'>
								<option>Select your printing size</option>
								<option key='standard' value='standard'>
									Standard
								</option>
								<option key='medium' value='medium'>
									Medium
								</option>
								<option key='large' value='large'>
									Large
								</option>
							</select>
							<select
								value={printFinish}
								onChange={e => setPrintFinish(e.target.value)}
								placeholder='Print Finish'
								className='select-print'>
								<option>Select your printing finish</option>
								<option key='glossy' value='glossy'>
									Glossy
								</option>
								<option key='matt' value='matt'>
									Matt
								</option>
							</select>
							<div>
								<label>Quantity :</label>
								<input
									value={quantity}
									className='input-print'
									onChange={e => setQuantity(parseInt(e.target.value))}
									type='number'></input>
							</div>
							{selectPurchase === "print" &&
								printSize &&
								printFinish &&
								printType && (
									<div className='modal-container'>
										<div className='modal-text capitalized'>
											{selectPurchase}ing {printSize} {printFinish} {printType}
										</div>
										<div className='modal-text'>
											High Resolution format : {computeResolution(printSize)}
										</div>
										<div className='modal-text'>
											{"Print size (width x height) : "}{" "}
											{computeSize(printSize)}
										</div>
										<div className='modal-text'>Including delivery</div>
										<div className='modal-price'>
											<span className='modal-price-text'>Total Price :</span>
											{computePrice()} €
										</div>
									</div>
								)}
						</div>
					)}
					{selectPurchase === "digital" && (
						<div className='modal-container'>
							<div className='modal-text'>
								Digital Version : Download High Quality File
							</div>
							<div className='modal-price'>
								<span className='modal-price-text'>Total Price :</span>
								{computePrice()} €
							</div>
						</div>
					)}
					<div className='modal-btn-container'>
						<div className='modal-btn' onClick={() => addToCart()}>
							Add To Cart
						</div>
						<div className='modal-btn cancel' onClick={onClose}>
							Cancel
						</div>
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
				</div>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default CartModal
