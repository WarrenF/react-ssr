import React from 'react'

declare global {
	interface Window {
		__INITIAL_DATA__: any
	}
}

const List: React.FC<any> = ({ staticContext }: any) => {
	const repos = typeof window !== 'undefined'
		? window.__INITIAL_DATA__
		: staticContext.data

	const items = repos.map((item: any) => (
		<li key={item.id}>
			<p>{item.name}</p>
		</li>
	))

	return <ul>{items}</ul>
}

export default List
