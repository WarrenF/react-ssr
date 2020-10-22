import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
	const languageLinks = [
		{ name: 'All', param: 'all'},
		{ name: 'JavaScript', param: 'javascript' },
		{ name: 'Ruby', param: 'ruby' },
		{ name: 'Python', param: 'python' },
		{ name: 'Java', param: 'java'}
	].map(({ name, param }) => (
		<li key={param}>
			<NavLink activeStyle={{fontWeight: 'bold'}} to={`/popular/${param}`}>{name}</NavLink>
		</li>
	))

	return (
		<ul>
			<li><NavLink activeStyle={{fontWeight: 'bold'}} exact={true} to={`/`}>Home</NavLink></li>
			{languageLinks}
		</ul>
	)
}

export default Nav
