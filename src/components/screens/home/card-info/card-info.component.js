import { $BS } from '@/core/bsquery/bsquery.lib'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { formatCardNumber } from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'

import { CardService } from '@/api/card.service'

import styles from './card-info.module.scss'
import template from './card-info.template.html'

const CODE = '*****'

export class CardInfo extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance()
		this.cardService = new CardService()
		this.element = renderService.htmlToElement(template, [], styles)
	}

	#copyCardNumber(e) {
		navigator.clipboard.writeText(e.target.innerText).then(() => {
			e.target.innerText = 'Card number copied!'
			setTimeout(() => {
				e.target.innerText = formatCardNumber(this.card.number)
			}, 2000)
		})
	}

	#toggleCvc(cardCvcElement) {
		const text = cardCvcElement.text()
		text === CODE
			? cardCvcElement.text(this.card.cvc)
			: cardCvcElement.text(CODE)
	}

	fillElements() {
		$BS(this.element).html(
			renderService.htmlToElement(template, [], styles).innerHTML
		)

		$BS(this.element)
			.findAll(':scope > div')
			.forEach(child => {
				child.addClass('fade-in')
			})

		$BS(this.element)
			.find('#card-number')
			.text(formatCardNumber(this.card.number))
			.click(this.#copyCardNumber.bind(this))

		$BS(this.element).find('#card-expire-date').text(this.card.expireDate)

		const cardCvcElement = $BS(this.element).find('#card-cvc')
		cardCvcElement.text(CODE).css('width', '44px')

		$BS(this.element)
			.find('#toggle-cvc')
			.click(this.#toggleCvc.bind(this, cardCvcElement))

		$BS(this.element)
			.find('#card-balance')
			.text(formatToCurrency(this.card.balance))
	}

	fetchData() {
		this.cardService.byUser(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	render() {
		if (this.store.state.user) this.fetchData()
		return this.element
	}
}