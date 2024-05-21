import { $BS } from '@/core/bsquery/bsquery.lib'
import { BaseScreen } from '@/core/component/base-screen.component'
import formService from '@/core/services/form.service'
import renderService from '@/core/services/render.service'
import validationService from '@/core/services/validation.service'

import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'

import { AuthService } from '@/api/auth.service'

import styles from './auth.module.scss'
import template from './auth.template.html'

export class Auth extends BaseScreen {
	#isTypeLogin = true

	constructor() {
		super({ title: 'Auth' })
		this.authService = new AuthService()
	}

	#validateFields(formValues) {
		const emailLabel = $BS(this.element).find('label:first-child')
		const passwordLabel = $BS(this.element).find('label:last-child')

		if (!formValues.email) {
			validationService.showError(emailLabel)
		}
		if (!formValues.password) {
			validationService.showError(passwordLabel)
		}

		return formValues.email && formValues.password
	}

	#handleSubmit = e => {
		const formValues = formService.getFormValues(e.target)
		if (!this.#validateFields(formValues)) return
	}

	#changeFormType = e => {
		e.preventDefault()

		$BS(this.element)
			.find('h1')
			.text(this.#isTypeLogin ? 'Register' : 'Sign In')

		$BS(e.target).text(this.#isTypeLogin ? 'Sign In' : 'Register')
		this.#isTypeLogin = !this.#isTypeLogin
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				})
			],
			styles
		)

		$BS(this.element)
			.find('#auth-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter password',
					name: 'password',
					type: 'password'
				}).render()
			)

		$BS(this.element).find('#change-form-type').click(this.#changeFormType)
		$BS(this.element).find('form').submit(this.#handleSubmit)
		return this.element
	}
}
