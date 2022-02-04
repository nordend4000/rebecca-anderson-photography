import React, { useState, useEffect } from "react"
import Axios from "axios"
import ReactDom from "react-dom"
import "../styles/modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { FiEdit3 } from "react-icons/fi"

function EditProfilModal({
	onClose,
	setMessage,
	setError,
	id,
	userData,
	setRenderHeader,
}) {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [streetNumber, setStreetNumber] = useState("")
	const [street, setStreet] = useState("")
	const [zipCode, setZipCode] = useState("")
	const [city, setCity] = useState("")
	const [country, setCountry] = useState("")
	const [phone, setPhone] = useState("")
	const [oldPassword, setOldPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [openChangePassword, setOpenChangePassword] = useState(false)

	useEffect(() => {
		setFirstName(userData.firstName)
		setLastName(userData.lastName)
		setEmail(userData.email)
		setStreetNumber(userData.streetNumber)
		setStreet(userData.street)
		setZipCode(userData.zipCode)
		setCity(userData.city)
		setCountry(userData.country)
		setPhone(userData.phone)
	}, [userData])

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
			if (res.data === "update profile ok") {
				setRenderHeader(true)
				setMessage("Your personal details have been successfuly updated.")
				onClose()
			}
			if (res.data === "error : update personal data") {
				setMessage(
					"Ooops, something wrong happened, try again to update your personal data.",
				)
				onClose()
			}
		})
	}

	function changePassword() {
		Axios({
			method: "PUT",
			data: {
				id,
				oldPassword,
				newPassword,
			},
			withCredentials: true,
			url: `${process.env.REACT_APP_SERVER_URL}/update-password`,
		}).then(res => {
			if (
				res.data ===
				"Ooops something wrong happenned, this user doesn't exist in our database. Please try again."
			) {
				setError(res.data)
				setMessage("")
				onClose()
			}
			if (
				res.data ===
				"The previous password you just entered doesn't match in our database. Please try again."
			) {
				setError(res.data)
				setMessage("")
				onClose()
			}
			if (res.data === "Your new password has been saved successfully.") {
				setMessage(res.data)
				setError("")
				onClose()
			}
		})
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
					<h2 className='modal-title'>
						{openChangePassword ? "Change Password :" : "Edit My Profile :"}
					</h2>
					{userData && !openChangePassword ? (
						<>
							<div className='modal-container-flex-row'>
								<div className='modal-container-flex-col'>
									<div>
										<label>First Name :</label>
										<input
											className='edit-input'
											placeholder='First Name'
											onChange={e => setFirstName(e.target.value)}
											value={firstName}
										/>
									</div>
									<div>
										<label>Last Name :</label>
										<input
											className='edit-input'
											placeholder='Last Name'
											onChange={e => setLastName(e.target.value)}
											value={lastName}
										/>
									</div>
									<div>
										<label>Email Address :</label>
										<input
											className='edit-input'
											placeholder='Email address'
											onChange={e => setEmail(e.target.value)}
											value={email}
										/>
									</div>
									<div>
										<label>Street Number :</label>
										<input
											className='edit-input'
											placeholder='Street Number'
											onChange={e => setStreetNumber(e.target.value)}
											value={streetNumber}
										/>
									</div>
									<div>
										<label>Street Name :</label>
										<input
											className='edit-input'
											placeholder='Street'
											onChange={e => setStreet(e.target.value)}
											value={street}
										/>
									</div>
									<div>
										<label>Zip Code :</label>
										<input
											className='edit-input'
											placeholder='Zip code'
											onChange={e => setZipCode(e.target.value)}
											value={zipCode}
										/>
									</div>
									<div>
										<label>City :</label>
										<input
											className='edit-input'
											placeholder='City'
											onChange={e => setCity(e.target.value)}
											value={city}
										/>
									</div>
									<div>
										<label>Country :</label>
										<input
											className='edit-input'
											placeholder='Country'
											onChange={e => setCountry(e.target.value)}
											value={country}
										/>
									</div>
									<div>
										<label>Phone Number :</label>
										<input
											className='edit-input'
											placeholder='Phone Number'
											onChange={e => setPhone(e.target.value)}
											value={phone}
										/>
									</div>
								</div>
							</div>
							<div className='modal-btn-container'>
								<div className='modal-btn' onClick={editProfil}>
									Update My Profil
								</div>
								<div className='modal-btn cancel' onClick={onClose}>
									Cancel
								</div>
							</div>
						</>
					) : (
						<>
							<div className='modal-container-flex-row'>
								<div className='modal-container-flex-col'>
									<input
										className='edit-input'
										placeholder='Old Password'
										onChange={e => setOldPassword(e.target.value)}
									/>
									<input
										className='edit-input'
										placeholder='New Password'
										onChange={e => setNewPassword(e.target.value)}
									/>
								</div>
							</div>
							<div className='modal-btn-container'>
								<div className='modal-btn' onClick={() => changePassword()}>
									Reset My Password
								</div>
								<div
									className='modal-btn cancel'
									onClick={() => setOpenChangePassword(!openChangePassword)}>
									Cancel
								</div>
							</div>
						</>
					)}
					<div
						className='change-password'
						onClick={() => setOpenChangePassword(!openChangePassword)}>
						<FiEdit3 className='mr-icon' />
						{!openChangePassword ? "Update My Password" : "Update My Profile"}
					</div>
				</div>
			</div>
		</>,
		document.getElementById("modal"),
	)
}

export default EditProfilModal
