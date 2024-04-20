import type { Meta, StoryObj } from '@storybook/react'
import { TodolistTitle } from './TodolistTitle'
import { ReduxStoreProviderDecorator } from '../../store'

const meta: Meta<typeof TodolistTitle> = {
	title: 'App/TodolistTitle',
	component: TodolistTitle,

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
		entityStatus: {
			description: 'entityStatus for loading and disable'
		}
	},

	args: {
		todolistId: 'todolistId1',
		title: 'todolist title',
		entityStatus: 'idle'
	}
}
export default meta

type Story = StoryObj<typeof meta>;

export const Primary: Story = {}