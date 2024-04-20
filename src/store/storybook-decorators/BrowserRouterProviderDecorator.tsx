import React from 'react'
import { HashRouter } from 'react-router-dom'

export const BrowserRouterDecorator = (storyFn: () => React.ReactNode) => {
	return (
		<HashRouter>
			{storyFn()}
		</HashRouter>
	)
}