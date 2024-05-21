import { serverQuery } from '@/core/server-query/server-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return serverQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}
