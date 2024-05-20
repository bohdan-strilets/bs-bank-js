import { $BS } from '@/core/bsquery/bsquery.lib'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import styles from './user-item.module.scss'
import template from './user-item.template.html'

export class UserItem extends ChildComponent {
	constructor(user, isGray = false, onClick) {
		super()

		if (!user) throw new Error('User should be passed!')
		if (!user?.name) throw new Error('User must have a "name"!')
		if (!user?.avatarPath) throw new Error('User must have a "avatarPath"!')

		this.user = user
		this.onClick = onClick
		this.isGray = isGray
	}

	#preventDefault(e) {
		e.preventDefault()
	}

	update({ avatarPath, name }) {
		if (avatarPath && name) {
			$BS(this.element).find('img').attr('src', avatarPath).attr('alt', name)
			$BS(this.element).find('span').text(name)
		}
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)
		this.update(this.user)
		$BS(this.element).click(this.onClick || this.#preventDefault.bind(this))
		if (!this.onClick) $BS(this.element).attr('disabled', '')
		if (this.isGray) $BS(this.element).addClass(styles.gray)
		return this.element
	}
}
