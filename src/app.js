import { Question } from './question'
import { isValid } from './utils'
import { createModal } from './utils'
import { authWithEmailAndPassword } from './auth'
import { getAuthForm } from './auth'
import './style.css'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = document.querySelector('#submit')
const login = document.querySelector('#login-btn')

window.addEventListener('load', Question.renderList())

form.addEventListener('submit', submitFormHandler)

login.addEventListener('click', (event) => {
	event.preventDefault()
	openModal()
})

input.addEventListener('input', () => {
	submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
	event.preventDefault()
	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON(),
		}

		submitBtn.disabled = true

		// async request to server to save question
		Question.create(question).then(() => {
			console.log('Question', question)

			input.value = ''
			input.className = ''
			submitBtn.disabled = false
		})
	}
}

function openModal() {
	createModal('Авторизация', getAuthForm())
	document
		.getElementById('auth-form')
		.addEventListener('submit', authFormHandler, { once: true })
}

function authFormHandler(event) {
	event.preventDefault()

	const btn = event.target.querySelector('button')
	const email = event.target.querySelector('#login').value
	const password = event.target.querySelector('#password').value

	btn.disabled = true
	authWithEmailAndPassword(email, password)
		.then(Question.fetch)
		.then(renderModalAfterAuth)
		.then(() => (btn.disabled = false))
}

function renderModalAfterAuth(content) {
	if (typeof content === 'string') {
		createModal('Error', content)
	} else {
		createModal('Questions', Question.listToHTML(content))
	}
}
