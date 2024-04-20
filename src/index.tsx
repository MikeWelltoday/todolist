import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'store/store'


const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App demo={false} />
		</BrowserRouter>
	</Provider>
)




