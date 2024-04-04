import type { Meta, StoryObj } from '@storybook/react'
import App from './App'
import { ReduxStoreProviderDecorator } from 'stories'

//========================================================================================

const meta: Meta<typeof App> = {
	title: 'App/App',
	component: App,
	parameters: {
		layout: 'centered'
	},

	tags: ['autodocs'],

	decorators: [ReduxStoreProviderDecorator],

	argTypes: {
		demo: {
			description: 'demo - to block API request to server'
		}
	},

	args: {
		demo: true
	}
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================

export const AppWithReduxStory: Story = {}