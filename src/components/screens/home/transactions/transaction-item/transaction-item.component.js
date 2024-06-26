import { $BS } from '@/core/bsquery/bsquery.lib'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { formatToCurrency } from '@/utils/format/format-to-currency'
import { formatDate } from '@/utils/format/format-to-date'

import styles from './transaction-item.module.scss'
import template from './transaction-item.template.html'

export class TransactionItem extends ChildComponent {
	constructor(transaction) {
		super()
		this.transaction = transaction
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const isIncome = this.transaction.type === 'TOP_UP'
		const name = isIncome ? 'Income' : 'Expense'

		if (isIncome) {
			$BS(this.element).addClass(styles.income)
		}

		$BS(this.element).find('#transaction-name').text(name)
		$BS(this.element)
			.find('#transaction-date')
			.text(formatDate(this.transaction.createdAt))

		$BS(this.element)
			.find('#transaction-amount')
			.text(formatToCurrency(this.transaction.amount))

		return this.element
	}
}
