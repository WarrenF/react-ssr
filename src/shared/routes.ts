import React from 'react'
import Home from './components/Home'
import List from './components/List'
import { fetchPopularRepos } from './api'

type IRoutes = {
	path: string,
	exact?: boolean
	component: React.FC<any>,
	fetchInitialData?: (path: string) => Promise<any>
}

const routes: IRoutes[] =  [
  {
    path: '/',
    exact: true,
    component: Home  as React.FC<any>,
  },
  {
    path: '/popular/:id',
    component: List as React.FC<any>,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop())
  }
]

export default routes
