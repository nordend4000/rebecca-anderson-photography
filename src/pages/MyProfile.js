import React, { useState } from "react"
import Axios from "axios"
import { Helmet } from "react-helmet"
import "../styles/account.css"
import "../styles/pages.css"
import { Link, useHistory, useParams } from "react-router-dom"
import { FaCartPlus } from "react-icons/fa"
import { RiHeartFill } from "react-icons/ri"
import { GoHome } from "react-icons/go"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function MyProfile() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [streetNumber, setStreetNumber] = useState("")
	const [street, setStreet] = useState("")
	const [zipCode, setZipCode] = useState("")
	const [city, setCity] = useState("")
	const [country, setCountry] = useState("")
	const [phone, setPhone] = useState("")

	const history = useHistory()
	let { id } = useParams()

	const editProfil = () => {
		Axios({
			method: "PUT",
			data: {
				firstName,
				lastName,
				streetNumber,
				street,
				city,
				zipCode,
				country,
				phone,
				id,
			},
			withCredentials: true,
			url: `${process.env.REACT_APP_SERVER_URL}/edit-user`,
		}).then(res => {
			history.push(`/?firstlogin=true`)
			window.location.reload()
		})
	}
	function handleCancel() {
		history.push(`/?firstlogincanceled=true`)
		window.location.reload()
	}
	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<Helmet>
					<title>Rebecca Anderson Photography - Set my profile</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - Set my profile'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Customer Account to purchase and follow orders of Rebecca Anderson Photographs. High quality printing on paper, canvas or metal and digital download available.'
						data-react-helmet='true'
					/>
				</Helmet>
				<div className='page-container'>
					<div className='page-line'></div>
					<div className='account-title'>My Profile</div>
					<div className='account-info-container-row'>
						Please fill in your personal detail
					</div>
					<div className='modal-container-flex-row'>
						<div className='modal-container-flex-col'>
							<input
								className='edit-input-lg'
								placeholder='First Name'
								onChange={e => setFirstName(e.target.value)}
							/>
							<input
								className='edit-input-lg'
								placeholder='Last Name'
								onChange={e => setLastName(e.target.value)}
							/>
							<input
								className='edit-input-lg'
								placeholder='Street Number'
								onChange={e => setStreetNumber(e.target.value)}
							/>
							<input
								className='edit-input-lg'
								placeholder='Street'
								onChange={e => setStreet(e.target.value)}
							/>
							<input
								className='edit-input-lg'
								placeholder='Zip code'
								onChange={e => setZipCode(e.target.value)}
							/>
							<input
								className='edit-input-lg'
								placeholder='City'
								onChange={e => setCity(e.target.value)}
							/>
							<input
								className='edit-input-lg'
								placeholder='Country'
								onChange={e => setCountry(e.target.value)}
							/>
							<input
								className='edit-input-lg'
								placeholder='Phone Number'
								onChange={e => setPhone(e.target.value)}
							/>
						</div>
					</div>
					<div className='modal-btn-container'>
						<div className='modal-btn' onClick={editProfil}>
							Save My Profile
						</div>
						<div onClick={() => handleCancel()} className='modal-btn cancel-2'>
							Cancel
						</div>
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
				</div>
			</Layout>
		</motion.div>
	)
}

export default MyProfile
