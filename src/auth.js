export function getAuthForm() {
	return `
    <form id="auth-form" class="mui-form">
        <div class="mui-textfield">
            <input id="login" type="email" placeholder="Login" />
        </div>
        <div class="mui-textfield">
            <input id="password" type="password" placeholder="Password" />
        </div>
        <button
            type="submit"
            class="mui-btn mui-btn--danger"
        >
            Login
        </button>
    </form>
    `
}

export function authWithEmailAndPassword(email, password) {
	const apiKey = 'AIzaSyAF8i94xjlCLGl8yBOpbj0OeEyRkX8rlfc'
	return fetch(
		`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
		{
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((response) => response.json())
		.then((data) => data.idToken)
}
