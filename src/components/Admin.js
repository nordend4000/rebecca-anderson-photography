import React, { useState, useEffect } from "react"
import Axios from "axios"

const categorie_data = [
	"new-zealand",
	"australia",
	"europe",
	"africa",
	"panoramic",
	"oceanic",
	"b&w",
	"wildlife",
	"waterfall",
	"lake",
	"mountain",
	"sunset",
	"urban",
]

function Admin() {
	// DISPLAY STATES
	const [newProd, setNewProd] = useState(false)
	const [editOrDelete, setEditOrDelete] = useState(false)
	const [editProd, setEditProd] = useState(false)
	const [editOrder, setEditOrder] = useState(false)
	const [manageOrder, setManageOrder] = useState(false)
	const [searchCustomer, setSearchCustomer] = useState(false)
	const [displayCustomer, setDisplayCustomer] = useState(false)
	// ORDER STATES
	const [orderData, setOrderData] = useState([])
	const [orderIdToGet, setOrderIdToGet] = useState("")
	const [orderId, setOrderId] = useState("")
	const [product, setProduct] = useState("")
	const [price, setPrice] = useState("")
	const [paiement, setPaiement] = useState("")
	const [dateOrder, setDateOrder] = useState("")
	const [dateExpedition, setDateExpedition] = useState("")
	const [status, setStatus] = useState("")
	const [customerId, setCustomerId] = useState("")
	const [customerEmail, setCustomerEmail] = useState("")
	const [stripeCustomer, setStripeCustomer] = useState("")
	const [stripeEmail, setStripeEmail] = useState("")
	const [stripeAmount, setStripeAmount] = useState("")
	const [currency, setCurrency] = useState("")
	// SEARCH STATES
	const [search, setSearch] = useState("")
	const [searchId, setSearchId] = useState("")
	const [searchEmail, setSearchEmail] = useState("")
	const [user, setUser] = useState()
	// PRODUCTS STATES
	const [id, setId] = useState("")
	const [message, setMessage] = useState("")
	const [error, setError] = useState("")
	const [name, setName] = useState("")
	const [location, setLocation] = useState("")
	const [description, setDescription] = useState("")
	const [camera, setCamera] = useState("")
	const [lens, setLens] = useState("")
	const [categorie, setCategorie] = useState("")
	const [gallery, setGallery] = useState("")
	const [reference, setReference] = useState("")
	const [focalLenght, setFocalLenght] = useState("")
	const [shutterSpeed, setShutterSpeed] = useState("")
	const [aperture, setAperture] = useState("")
	const [height, setHeight] = useState("")
	const [width, setWidth] = useState("")
	const [size, setSize] = useState("")
	const [canvas, setCanvas] = useState("")
	const [digital, setDigital] = useState("")
	const [metal, setMetal] = useState("")
	const [paper, setPaper] = useState("")
	const [large, setLarge] = useState("")
	const [medium, setMedium] = useState("")
	const [standard, setStandard] = useState("")

	const [fileLowQuality, setFileLowQuality] = useState("")
	const [fileHighQuality, setFileHighQuality] = useState("")
	const [manualUrl, setManualUrl] = useState("")
	const [manualAttachment, setManualAttachment] = useState("")

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [message, error])
	//-----------------  PRODUCT -------------------------
	const submitCreateProduct = async () => {
		//---------------------- CLOUDINARY ---------------------------------
		let attachment = manualAttachment
		let url = manualUrl
		if (fileLowQuality) {
			const formData = new FormData()
			formData.append("file", fileLowQuality)
			formData.append(
				"upload_preset",
				`${process.env.REACT_APP_CLOUDINARY_PRESET}`,
			)
			await Axios.post(
				`${process.env.REACT_APP_CLOUDINARY_UPLOAD_API_URL}`,
				formData,
			).then(response => {
				url = response.data.secure_url
			})
		}
		if (fileHighQuality) {
			const formData = new FormData()
			formData.append("file", fileHighQuality)
			formData.append(
				"upload_preset",
				`${process.env.REACT_APP_DOWNLOAD_PRESET}`,
			)
			await Axios.post(
				`${process.env.REACT_APP_DOWNLOAD_UPLOAD_API_URL}`,
				formData,
			).then(response => {
				attachment = `${process.env.REACT_APP_DOWNLOAD_ATTACHMENT}${response.data.public_id}.${response.data.format}`
			})
		}
		let galleryText
		if (gallery === "galleries") galleryText = "Gallery"
		if (gallery === "themes") galleryText = "Theme"
		return Axios.post(`${process.env.REACT_APP_SERVER_URL}/create-product`, {
			id: reference.slice(3, reference.lenght),
			name: name,
			location: location,
			description: description,
			reference: reference,
			categorie: categorie,
			categorieText: formatCategorie(categorie),
			gallery: gallery,
			galleryText: galleryText,
			attachment: attachment,
			url: url,
			camera: camera,
			lens: lens,
			aperture: aperture,
			shutterSpeed: shutterSpeed,
			focalLenght: focalLenght,
			height: height,
			width: width,
			size: size,
			canvas: canvas || 250,
			digital: digital || 50,
			metal: metal || 500,
			paper: paper || 150,
			large: large || 150,
			medium: medium || 125,
			standard: standard || 100,
		}).then(res => {
			if (res.data === "Your new Product has been successfuly created") {
				setMessage(res.data)
				clearStates()
			}
			if (
				res.data ===
				"Ooops, something wrong happened, try again to create your new product"
			) {
				setError(res.data)
			}
		})
	}
	const submitEditProduct = async () => {
		let galleryText
		if (gallery === "galleries") galleryText = "Gallery"
		if (gallery === "themes") galleryText = "Theme"
		//---------------------- CLOUDINARY ---------------------------------
		let attachment = manualAttachment
		let url = manualUrl
		if (fileLowQuality) {
			const formData = new FormData()
			formData.append("file", fileLowQuality)
			formData.append(
				"upload_preset",
				`${process.env.REACT_APP_CLOUDINARY_PRESET}`,
			)
			await Axios.post(
				`${process.env.REACT_APP_CLOUDINARY_UPLOAD_API_URL}`,
				formData,
			).then(response => {
				url = response.data.secure_url
			})
		}
		if (fileHighQuality) {
			const formData = new FormData()
			formData.append("file", fileHighQuality)
			formData.append(
				"upload_preset",
				`${process.env.REACT_APP_CLOUDINARY_PRESET}`,
			)
			await Axios.post(
				`${process.env.REACT_APP_CLOUDINARY_UPLOAD_API_URL}`,
				formData,
			).then(response => {
				attachment = `${process.env.REACT_APP_CLOUDINARY_ATTACHMENT}${response.data.public_id}.${response.data.format}`
			})
		}
		return Axios.put(`${process.env.REACT_APP_SERVER_URL}/edit-product`, {
			idProduct: id,
			id: reference.slice(3, reference.lenght),
			name: name,
			location: location,
			description: description,
			reference: reference,
			categorie: categorie,
			categorieText: formatCategorie(categorie),
			gallery: gallery,
			galleryText: galleryText,
			url: url,
			attachment: attachment,
			camera: camera,
			lens: lens,
			aperture: aperture,
			shutterSpeed: shutterSpeed,
			focalLenght: focalLenght,
			height: height,
			width: width,
			size: size,
			canvas: canvas || 250,
			digital: digital || 50,
			metal: metal || 500,
			paper: paper || 150,
			large: large || 150,
			medium: medium || 125,
			standard: standard || 100,
		}).then(res => {
			if (res.data === "Your product has been successfuly updated") {
				setMessage(res.data)
				clearStates()
			}
			if (
				res.data ===
				"Ooops, something wrong happened, try again to update your new product"
			) {
				setError(res.data)
			}
		})
	}
	const deleteProduct = async () => {
		if (
			!window.confirm(
				`Do you really want to delete Product Reference ${search} ?`,
			)
		) {
			return null
		}
		return Axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/delete-product/${id}`,
		).then(() => {
			setMessage(`Product Reference ${search} has been successfuly deleted`)
			clearStates()
		})
	}
	//-----------------  SEARCH  -------------------------
	const searchProduct = () => {
		Axios.get(`${process.env.REACT_APP_SERVER_URL}/get-product/${search}`).then(
			response => {
				if (response.data.length === 0) {
					setError("This product doesn't exist, Please try again")
				} else {
					setName(response.data[0].name)
					setLocation(response.data[0].location)
					setDescription(response.data[0].description)
					setCamera(response.data[0].camera)
					setLens(response.data[0].lens)
					setCategorie(response.data[0].categorie)
					setGallery(response.data[0].gallery)
					setReference(response.data[0].reference)
					setFocalLenght(response.data[0].focalLenght)
					setShutterSpeed(response.data[0].shutterSpeed)
					setAperture(response.data[0].aperture)
					setHeight(response.data[0].height)
					setWidth(response.data[0].width)
					setSize(response.data[0].size)
					setCanvas(response.data[0].canvas)
					setDigital(response.data[0].digital)
					setMetal(response.data[0].metal)
					setPaper(response.data[0].paper)
					setLarge(response.data[0].large)
					setMedium(response.data[0].medium)
					setStandard(response.data[0].standard)
					setId(response.data[0]._id)
					setManualUrl(response.data[0].url)
					setManualAttachment(response.data[0].attachment)
					setEditProd(true)
					setEditOrDelete(false)
				}
			},
		)
	}
	const searchCustomerById = () => {
		Axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${searchId}`).then(
			response => {
				if (response.data === "bug cookie") {
					setError(" No user Found ")
				} else {
					setUser(response.data)
				}
			},
		)
		setSearchCustomer(false)
		setDisplayCustomer(true)
	}
	const searchCustomerByEmail = () => {
		Axios.get(
			`${process.env.REACT_APP_SERVER_URL}/user-by-email/${searchEmail}`,
		).then(response => {
			if (response.data === "No user found") {
				setError(response.data)
			} else {
				setUser(response.data)
			}
		})
		setSearchCustomer(false)
		setDisplayCustomer(true)
	}
	//-----------------  ORDER -------------------------
	const handleManageOrder = () => {
		setEditProd(false)
		setEditOrDelete(false)
		setNewProd(false)
		setManageOrder(!manageOrder)
		setEditOrder(false)
		setSearchCustomer(false)
		clearStates()
		if (manageOrder) return setManageOrder(false)
		return Axios.get(`${process.env.REACT_APP_SERVER_URL}/order-list`).then(
			res => {
				if (res.data !== "no order found") {
					setOrderData(res.data)
				}
			},
		)
	}
	function handleEditOrder(idToGet) {
		window.scrollTo(0, 0)
		setEditOrder(true)
		Axios.get(
			`${process.env.REACT_APP_SERVER_URL}/single-order/${idToGet}`,
		).then(res => {
			if (res.data !== "no order found") {
				setOrderId(res.data[0].orderId)
				setProduct(res.data[0].product)
				setPrice(res.data[0].price)
				setPaiement(res.data[0].paiement)
				setDateOrder(res.data[0].dateOrder)
				setDateExpedition(new Date(res.data[0].dateExpedition))
				setStatus(res.data[0].status)
				setCustomerId(res.data[0].customerId)
				setCustomerEmail(res.data[0].customerEmail)
				setStripeCustomer(res.data[0].stripeCustomer)
				setStripeEmail(res.data[0].stripeEmail)
				setStripeAmount(res.data[0].stripeAmount)
				setCurrency(res.data[0].currency)
				setOrderIdToGet(res.data[0]._id)
			}
		})
	}
	const submitEditOrder = async () => {
		return Axios.put(`${process.env.REACT_APP_SERVER_URL}/edit-order`, {
			id: orderIdToGet,
			product,
			price,
			paiement,
			dateExpedition: new Date(dateExpedition).toString(),
			status,
			currency,
		}).then(res => {
			if (res.data === "Your order has been successfuly updated") {
				setMessage(res.data)
				clearStates()
			}
			if (
				res.data ===
				"Ooops, something wrong happened, try again to update your order"
			) {
				setError(res.data)
			}
		})
	}
	function handleDeleteOrder() {
		if (
			!window.confirm(`Do you really want to delete Order N° ${orderIdToGet} ?`)
		) {
			return null
		}
		return Axios.delete(
			`${process.env.REACT_APP_SERVER_URL}/delete-order/${orderIdToGet}`,
		).then(() => {
			setMessage(`Order N° ${orderIdToGet} has been successfuly deleted`)
			clearStates()
		})
	}
	//-----------------  OPEN / CLOSE -------------------------
	const handleCancelEditOrder = () => {
		setEditOrder(false)
		clearStates()
	}
	const handleNewProd = () => {
		setEditProd(false)
		setEditOrDelete(false)
		setNewProd(!newProd)
		setManageOrder(false)
		setSearchCustomer(false)
		setEditOrder(false)
		clearStates()
	}
	const handleEditProd = () => {
		setEditProd(false)
		setEditOrDelete(!editOrDelete)
		setNewProd(false)
		setManageOrder(false)
		setSearchCustomer(false)
		setEditOrder(false)
		clearStates()
	}
	const handleSearchCustomer = () => {
		setEditProd(false)
		setEditOrDelete(false)
		setNewProd(false)
		setManageOrder(false)
		setEditOrder(false)
		setSearchCustomer(!searchCustomer)
		clearStates()
	}
	//-----------------  HELP / CLEAR -------------------------
	const clearMessage = () => {
		setError("")
		setMessage("")
	}
	function clearStates() {
		setSearch("")
		setSearchId("")
		setSearchEmail("")
		//PRODUCT
		setId("")
		setName("")
		setLocation("")
		setDescription("")
		setCamera("")
		setLens("")
		setCategorie("")
		setGallery("")
		setReference("")
		setFocalLenght("")
		setShutterSpeed("")
		setAperture("")
		setHeight("")
		setWidth("")
		setSize("")
		setCanvas("")
		setDigital("")
		setMetal("")
		setPaper("")
		setLarge("")
		setMedium("")
		setStandard("")
		// ORDER
		setOrderId("")
		setProduct("")
		setPrice("")
		setPaiement("")
		setDateOrder("")
		setDateExpedition("")
		setStatus("")
		setCustomerId("")
		setCustomerEmail("")
		setStripeCustomer("")
		setStripeEmail("")
		setStripeAmount("")
		setCurrency("")
		setOrderIdToGet("")
		setUser("")
	}
	function formatCategorie(string) {
		let array = []
		string
			.split("-")
			.forEach(el => array.push(" " + el.charAt(0).toUpperCase() + el.slice(1)))
		let output = "".concat(...array)
		return output
	}

	return (
		<div className='page-container' onClick={clearMessage}>
			{(message || error) && (
				<div className='login-message-container'>
					{message && <div className='login-message'> {message}</div>}
					{error && <div className='login-message error'> {error}</div>}
				</div>
			)}
			<div className='admin-container bordered'>
				<div
					className={newProd ? "admin admin-active" : "admin"}
					onClick={handleNewProd}>
					{newProd ? "Close New Product" : "Create New Product"}
				</div>
				<div
					className={editOrDelete ? "admin admin-active" : "admin"}
					onClick={handleEditProd}>
					{editOrDelete ? "Close Edit Product" : "Edit / Delete Product"}
				</div>
				<div
					className={manageOrder ? "admin admin-active" : "admin"}
					onClick={handleManageOrder}>
					{manageOrder ? "Close Orders" : "Manage Orders"}
				</div>
				<div
					className={searchCustomer ? "admin admin-active" : "admin"}
					onClick={handleSearchCustomer}>
					{searchCustomer ? "Close Customer" : "Search Customer"}
				</div>
			</div>
			{manageOrder && <div className='admin-subtitle'>Order List</div>}
			{editOrder && (
				<div className='admin-subtitle'>
					<p className='admin-p'>
						<b>Edit Order N° {orderId}</b>
					</p>
					<p className='admin-p'>Order date :{dateOrder}</p>
					<p className='admin-p'>Customer Id : {customerId}</p>
					<p className='admin-p'>Customer Email : {customerEmail}</p>
					<p className='admin-p'>Stripe Customer : {stripeCustomer}</p>
					<p className='admin-p'>Stripe Email : {stripeEmail}</p>
					<p className='admin-p'>
						Stripe Amount : {stripeAmount} {currency}
					</p>
					<div>
						<label>Product :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='product Name'
							value={product}
							onChange={e => setProduct(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Paiement Status :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='Paid / Canceled / Refunded '
							value={paiement}
							onChange={e => setPaiement(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Date Expedition :</label>
						<input
							className='edit-input'
							type='date'
							placeholder='Update expedition date'
							value={dateExpedition}
							onChange={e => setDateExpedition(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Status :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='Pending / Validating / Printing / Shipping / Delivered'
							value={status}
							onChange={e => setStatus(e.target.value)}
							required
						/>
					</div>
					<p className='admin-p'>TOTAL PRICE :</p>
					<div>
						<label>Price :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='Update Price'
							value={price}
							onChange={e => setPrice(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Currency :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='Update currency'
							value={currency}
							onChange={e => setCurrency(e.target.value)}
							required
						/>
					</div>
					<div className='modal-btn-container'>
						<div className='modal-btn' onClick={submitEditOrder}>
							Update Order
						</div>
						<div className='modal-btn' onClick={handleCancelEditOrder}>
							Cancel
						</div>
					</div>
				</div>
			)}
			{orderData.length > 0 && manageOrder && (
				<div className='account-order-container-center'>
					<div className='grid-order'>
						<div className='grid-order-item-label'>Order Id</div>
						<div className='grid-order-item-label'>Date Order</div>
						<div className='grid-order-item-label'>Total Price</div>
						<div className='grid-order-item-label'>Paiement Status</div>
						<div className='grid-order-item-label'>Purchase Info</div>
						<div className='grid-order-item-label'>Date expedition</div>
						<div className='grid-order-item-label'>Order Status</div>
						{orderData &&
							orderData.length > 0 &&
							orderData.map(el => (
								<>
									<div className='grid-order-item'>
										<small>{el.orderId}</small>
										<div
											className='admin-edit-order'
											onClick={() => handleEditOrder(el.orderId)}>
											Edit
										</div>
										<div
											className='admin-edit-order'
											onClick={() => handleDeleteOrder()}>
											Delete
										</div>
									</div>
									<div className='grid-order-item'>
										{el.dateOrder.slice(3, 15)}
									</div>
									<div className='grid-order-item'>
										{el.price} {el.currency}
									</div>
									<div className='grid-order-item'>{el.paiement}</div>
									<div className='grid-order-item'>
										<div className='account-order-container-center'>
											<div>Customer id : {el.customerId}</div>
											<div>Stripe id : {el.stripeCustomer}</div>
											<div>Stripe Email : {el.stripeEmail}</div>
										</div>
										{el.product
											.slice(1, -1)
											.split(",")
											.map(el => (
												<span>{el}</span>
											))}
									</div>
									<div className='grid-order-item'>
										{el.dateExpedition.slice(3, 15)}
									</div>
									<div className='grid-order-item'>{el.status}</div>
								</>
							))}
					</div>
				</div>
			)}
			{searchCustomer && (
				<div>
					<div className='bordered'>
						<label>Search with customer id :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='Search customer by id'
							value={searchId}
							onChange={e => setSearchId(e.target.value)}
							required
						/>
						<div className='modal-btn-container'>
							<div className='modal-btn' onClick={searchCustomerById}>
								Search with id
							</div>
						</div>
					</div>
					<div className='bordered'>
						<label>Search with customer email :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='Search customer by email'
							value={searchEmail}
							onChange={e => setSearchEmail(e.target.value)}
							required
						/>
						<div className='modal-btn-container'>
							<div className='modal-btn' onClick={searchCustomerByEmail}>
								Search with email
							</div>
						</div>
					</div>
				</div>
			)}
			{displayCustomer && user && (
				<div className='admin-subtitle'>
					<p>
						User Name :{" "}
						<label>
							{user.firstName} {user.lastName}
						</label>
					</p>
					<p>
						Customer Id : <label>{user._id}</label>
					</p>
					<p>
						Email : <label>{user.email}</label>
					</p>
					<p>
						Address :{" "}
						<label>
							{user.streetNumber} {user.street}, {user.zipCode} {user.city} -{" "}
							{user.country}
						</label>
					</p>
					<p>
						Phone : <label>{user.phone}</label>
					</p>
					<p>
						Order : <label>{user.order}</label>
					</p>
				</div>
			)}
			{editOrDelete && (
				<div>
					<div className='admin-subtitle'>Search Product By Reference</div>
					<div className='bordered'>
						<label>Reference Product :</label>
						<input
							className='edit-input'
							type='text'
							placeholder='Reference Product (3 characters & number) ex : N-Z3 , AUS12, PAN3'
							value={search}
							onChange={e => setSearch(e.target.value)}
							required
						/>
						<div className='modal-btn-container'>
							<div className='modal-btn' onClick={searchProduct}>
								Search
							</div>
						</div>
					</div>
				</div>
			)}
			{editProd && search && (
				<>
					<img alt={search} className='admin-image' src={manualUrl} />
					<span className='admin-container'>{search}</span>
				</>
			)}
			{(newProd || editProd) && (
				<form className='form'>
					<div className='admin-subtitle'>
						{newProd ? "CREATE NEW PRODUCT : " : "EDIT / DELETE PRODUCT :"}
					</div>
					<div className='input-group'>
						<div className='bordered'>Required Settings</div>
						<div>
							<label>Categorie :</label>
							<select
								value={categorie}
								onChange={e => setCategorie(e.target.value)}
								placeholder='PRINT OR DOWNLOAD'
								className='edit-input'>
								<option>select Categorie : </option>
								{categorie_data.map(el => (
									<option key={el} value={el}>
										{el}
									</option>
								))}
							</select>
						</div>
						<div>
							<label>Gallery :</label>
							<select
								value={gallery}
								onChange={e => setGallery(e.target.value)}
								placeholder='PRINT OR DOWNLOAD'
								className='edit-input'>
								<option>galleries or themes </option>
								<option key='themes' value='themes'>
									theme
								</option>
								<option key='galleries' value='galleries'>
									galleries
								</option>
							</select>
						</div>
						<div>
							<label>Description :</label>
						</div>
						<div className='admin-container'>
							<textarea
								className='edit-input admin-textarea'
								type='text'
								placeholder='Description'
								value={description}
								onChange={e => setDescription(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Reference :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='Reference Product (3 characters & number) ex : N-Z3 , AUS12, PAN3'
								value={reference}
								onChange={e => setReference(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Name :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='product Name'
								value={name}
								onChange={e => setName(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Location :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='image location ex: Lord Howe Island, New South Wales, Australia'
								value={location}
								onChange={e => setLocation(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Camera :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='ex: CANON EOS 80D'
								value={camera}
								onChange={e => setCamera(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Lens :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='ex: TAMRON 18-400mm f/3.5-6.3'
								value={lens}
								onChange={e => setLens(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Focal Lenght :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='ex: 18 or 355'
								value={focalLenght}
								onChange={e => setFocalLenght(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Shutter Speed :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='ex: 1/1600'
								value={shutterSpeed}
								onChange={e => setShutterSpeed(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Aperture :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='ex: f/3.5'
								value={aperture}
								onChange={e => setAperture(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Width :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='width in pixel ex : 6000'
								value={width}
								onChange={e => setWidth(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Height :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='height in pixel ex : 4000'
								value={height}
								onChange={e => setHeight(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Size file high quality :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='size file in Mo ex: 12'
								value={size}
								onChange={e => setSize(e.target.value)}
								required
							/>
						</div>
						<div className='bordered'>
							Default Setting : Leave blank if no need to change
						</div>
						<div>
							<label>Digital :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='default 50 leave blank if ok'
								value={digital}
								onChange={e => setDigital(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Canvas :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='default 250 leave blank if ok'
								value={canvas}
								onChange={e => setCanvas(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Paper :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='default 150 leave blank if ok'
								value={paper}
								onChange={e => setPaper(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Metal :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='default 500 leave blank if ok'
								value={metal}
								onChange={e => setMetal(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Standard :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='default 100 leave blank if ok'
								value={standard}
								onChange={e => setStandard(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Medium :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='default 125 leave blank if ok'
								value={medium}
								onChange={e => setMedium(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Large :</label>
							<input
								className='edit-input'
								type='number'
								placeholder='default 150 leave blank if ok'
								value={large}
								onChange={e => setLarge(e.target.value)}
								required
							/>
						</div>
						<div className='bordered'>Set Image Links Manually :</div>
						<div>
							<label>Url Image Low Quality :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='Manual setting of low quality url'
								value={manualUrl}
								onChange={e => setManualUrl(e.target.value)}
								required
							/>
						</div>
						<div>
							<label>Attachment High Quality :</label>
							<input
								className='edit-input'
								type='text'
								placeholder='Manual setting high quality Attachment'
								value={manualAttachment}
								onChange={e => setManualAttachment(e.target.value)}
								required
							/>
						</div>
						<div className='bordered'>Upload Product file</div>
						<div>
							<label>File Low Quality:</label>
							<input
								className='edit-input'
								onChange={event => setFileLowQuality(event.target.files[0])}
								type='file'
								name='fileLow'
								id='fileLow'
							/>
						</div>
						<div>
							<label>File High Quality:</label>
							<input
								className='edit-input'
								onChange={event => setFileHighQuality(event.target.files[0])}
								type='file'
								name='fileHigh'
								id='fileHigh'
							/>
						</div>
						<div className='modal-btn-container'>
							{editProd ? (
								<>
									<div className='modal-btn' onClick={submitEditProduct}>
										Edit Product
									</div>
									<div onClick={deleteProduct} className='delete-red'>
										Delete Product
									</div>
								</>
							) : (
								<div className='modal-btn' onClick={submitCreateProduct}>
									Save New Product
								</div>
							)}
						</div>
					</div>
				</form>
			)}
		</div>
	)
}

export default Admin
