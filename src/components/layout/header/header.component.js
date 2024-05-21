import { $BS } from '@/core/bsquery/bsquery.lib'
import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'

import { UserItem } from '@/components/ui/user-item/user-item.component'

import styles from './header.module.scss'
import template from './header.template.html'

import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()
		this.store = Store.getInstance()
		this.store.addObserver(this)
		this.router = router
	}

	update() {
		this.user = this.store.state.user
		const authSideElement = $BS(this.element).find('#auth-side')

		if (this.user) {
			authSideElement.show()
			this.router.navigate('/')
		} else {
			authSideElement.hide()
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({
					router: this.router
				}),
				Search,
				new UserItem({
					avatarPath:
						'https://cdn.pixabay.com/photo/2023/02/08/18/36/tawny-owl-7777285_1280.jpg',
					name: 'BS'
				})
			],
			styles
		)

		this.update()
		return this.element
	}
}
