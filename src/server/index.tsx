import serverless from 'serverless-http'
import express from 'express'
import cors from 'cors'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter, matchPath } from "react-router-dom"
import App from '../shared/App'
import serialize from 'serialize-javascript'
import routes from '../shared/routes'

const app = express()
const staticPath = process.env.LOCAL_DEV ? 'dist/public' : 'public'

app.use(cors())
app.use(express.static(staticPath))
console.log('Static Path Set:', staticPath)

app.get('*', async (req, res, next) => {
	if (!process.env.LOCAL_DEV) console.log({ request: req.url })
	const activeRoute = routes.find((route) => matchPath(req.url, route))
	const initialData = activeRoute?.fetchInitialData
		? await activeRoute.fetchInitialData(req.path)
		: null

	const context = { data: initialData }
	const markup = renderToStaticMarkup(
		<StaticRouter location={req.url} context={context as any}>
			<App />
		</StaticRouter>
	)

	try {
		res.send(`
		<!DOCTYPE html>
		<html>
			<head>
				<title>React SSR</title>
			</head>
			<body>
				<div id="app">${markup}</div>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.5/redux.min.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.0/umd/react.development.js"></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.0/umd/react-dom.development.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.1/react-redux.min.js"></script>
				<script src="/bundle.js" defer></script>
				<script>window.__INITIAL_DATA__ = ${serialize(initialData)}</script>
			</body>
		</html>
	`)
	} catch(e) {
		next()
	}
})

if (process.env.LOCAL_DEV) app.listen(3000, () => { console.log('Server is running on http://localhost:3000') })

export default serverless(app)
