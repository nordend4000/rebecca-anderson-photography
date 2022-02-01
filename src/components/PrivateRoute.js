import React from "react"
import { Route, Redirect } from "react-router-dom"

function PrivateRoute({ login, component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={props => {
				return login ? <Component {...props} /> : <Redirect to='/login' />
			}}></Route>
	)
}

export default PrivateRoute
