import Axios from "axios"

export async function Auth(id) {
	let user = false
	await Axios.get(`${process.env.REACT_APP_SERVER_URL}/user/${id}`).then(
		res => {
			if (res.data !== "bug cookie") {
				user = res.data
			}
		},
	)
	return user
}
