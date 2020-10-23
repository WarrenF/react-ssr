import React, { useState, useEffect } from 'react'
import { fetchPopularRepos } from '../api'

declare global {
	interface Window {
		__INITIAL_DATA__: any
	}
}

const List: React.FC<any> = ({ staticContext, match }: any) => {
	const { id = 'all' } = match.params
	const reposFromServer = typeof window !== 'undefined'
		? window.__INITIAL_DATA__ || []
		: staticContext.data

	const [data, setData] = useState(reposFromServer)

	useEffect(() => {
		const fetch = async () => {
			setData([])
			const repos = await fetchPopularRepos(id)
			setData(repos)
		}

		if (typeof window !== 'undefined' && window.__INITIAL_DATA__) delete window.__INITIAL_DATA__
		else fetch()
	}, [id])

	if (data.length === 0) return <p>Loading</p>

	const items = data.map((item: any) => (
		<li key={item.id}>
			<p>{item.name}</p>
		</li>
	))

	return <ul>{items}</ul>
}

export default List
