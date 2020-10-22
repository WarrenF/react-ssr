import React from 'react'
import routes from './routes'
import { Route, Switch } from 'react-router-dom'
import Nav from './components/Nav'
import FourOFour from './components/FourOFour'

const App: React.FC = () => {
	return (
		<>
			<Nav />
			<Switch>
				{routes.map(({ path, exact, component: Component, ...rest }) => (
					<Route key={path} path={path} exact={exact} render={(props) => (
						<Component {...props} {...rest} />
					)} />
				))}
				<Route render={(props) => <FourOFour {...props} /> } />
			</Switch>
		</>
	)
}

export default App
