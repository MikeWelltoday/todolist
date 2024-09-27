import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { store } from './state/store/store'


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<Provider store={store}>
		{/*<BrowserRouter>*/}
		{/*	<App demo={false} />*/}
		{/*</BrowserRouter>*/}
		<HashRouter>
			<App demo={false} />
		</HashRouter>
	</Provider>
)




