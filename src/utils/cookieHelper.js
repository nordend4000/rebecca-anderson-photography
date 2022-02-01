export function getCookie(name) {
	var match = document.cookie.match(RegExp("(?:^|;\\s*)" + name + "=([^;]*)"))
	return match ? match[1] : null
}
export function setCookie(cname, cvalue, exdays) {
	const d = new Date()
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
	let expires = "expires=" + d.toUTCString()
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}
export function setSession(sname, svalue) {
	sessionStorage.removeItem(sname)
	sessionStorage.setItem(sname, JSON.stringify(svalue))
}
export function deleteCookie(cname) {
	const d = new Date()
	d.setTime(d.getTime() - 24 * 60 * 60 * 1000)
	let expires = "expires=" + d.toUTCString()
	document.cookie = cname + "=;" + expires + ";path=/"
}
