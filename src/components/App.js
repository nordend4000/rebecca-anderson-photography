import React, { useState, useEffect } from "react"
import "../styles/App.css"
import { Switch, Route, useLocation, useHistory } from "react-router-dom"
import { Auth } from "../utils/Auth"
import { getCookie } from "../utils/cookieHelper"
import { AnimatePresence } from "framer-motion"
import Home from "../pages/Home"
import MyAccount from "../pages/MyAccount"
import Galleries from "../pages/Galleries"
import Themes from "../pages/Themes"
import Login from "../pages/Login"
import About from "../pages/About"
import Contact from "../pages/Contact"
import MyCart from "../pages/MyCart"
import TermsConditions from "../pages/TermsConditions"
import NotFound from "../pages/NotFound"
import PrivateRoute from "../components/PrivateRoute"
import Categorie from "./Categorie"
import Product from "./Product"
import Admin from "./Admin"
import MyFavorite from "../pages/MyFavorite"
import MyProfile from "../pages/MyProfile"

function App() {
	const location = useLocation()
	const history = useHistory()
	const [isFirstMount, setIsFirstMount] = useState(true)
	const [login, setLogin] = useState(false)
	const [id, setId] = useState("")
	const [userData, setUserData] = useState()

	// -----------------  Check Frist render ------------------------------------------------------
	useEffect(() => {
		const unlisten = history.listen(() => {
			isFirstMount && setIsFirstMount(false)
		})
		return unlisten
	}, [history, isFirstMount])
	// -----------------  GET ID COOKIE login ------------------------------------------------------
	useEffect(() => {
		if (getCookie("rebecca-login-cookie")) {
			setLogin(true)
			setId(getCookie("rebecca-login-cookie"))
		}
		const sessionLogin = sessionStorage.getItem("rebecca-login-session")
		if (sessionLogin) {
			setLogin(true)
			setId(JSON.parse(sessionLogin))
		}
	}, [])
	// -----------------  get UserData ------------------------------------------------------
	useEffect(() => {
		if (id === "") return
		Auth(id)
			.then(res => {
				setUserData(res)
			})
			.catch(res => {
				console.error(res)
			})
	}, [login, id])

	return (
		<AnimatePresence
			exitBeforeEnter
			// initial={false}
			onExitComplete={() => {
				if (typeof window !== "undefined") {
					document.querySelector("body").scrollTo(0, 0)
				}
			}}>
			<Switch location={location} key={location.pathname}>
				<Route
					exact
					path='/'
					component={props => <Home isFirstMount={isFirstMount} {...props} />}
				/>
				<PrivateRoute path='/my-Account' component={MyAccount} login={login} />
				<PrivateRoute
					path='/admin'
					component={Admin}
					login={
						userData &&
						userData.email.slice(0, 12) === `${process.env.REACT_APP_ADMIN_KEY}`
					}
				/>
				<Route exact path='/galleries' component={Galleries} />
				<Route path='/galleries/:categorie' component={Categorie} />
				<Route exact path='/themes' component={Themes} />
				<Route path='/themes/:categorie' component={Categorie} />
				<Route path='/product/:reference' component={Product} />
				<Route path='/login' component={Login} />
				<Route path='/about' component={About} />
				<Route path='/contact' component={Contact} />
				<Route path='/terms-and-conditions' component={TermsConditions} />
				<Route path='/my-cart' component={MyCart} />
				<Route path='/my-favorite' component={MyFavorite} />
				<Route path='/my-profile/:id' component={MyProfile} />
				<Route path='/admin' component={Admin} />
				<Route component={NotFound} />
			</Switch>
		</AnimatePresence>
	)
}

export default App
