import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../../../state/storybookDecorators/ReduxStoreProviderDecorator'
import { Todolist } from './Todolist'


const meta: Meta<typeof Todolist> = {
	title: 'App/Todolist',
	component: Todolist,

	decorators: [ReduxStoreProviderDecorator],

	parameters: {
		layout: 'centered'
	},

	tags: ['autodocs'],

	argTypes: {
		todolistId: {
			description: 'unique todolist id'
		},
		title: {
			description: 'todolist title'
		},
		todolistFilter: {
			description: 'todolsit filter value'
		},
		entityStatus: {
			description: 'entityStatus for loading and disable'
		},
		demo: {
			description: 'demo - to block API request to server'
		}
	},

	args: {
		todolistId: 'todolistId1',
		title: 'todolist title',
		todolistFilter: 'all',
		entityStatus: 'idle',
		demo: true
	}
}
export default meta

type Story = StoryObj<typeof meta>;

export const Primary: Story = {}