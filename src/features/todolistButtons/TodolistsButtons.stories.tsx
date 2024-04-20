import type { Meta, StoryObj } from '@storybook/react'
import { TodolistButtons } from './TodolistButtons'
import { ReduxStoreProviderDecorator } from '../../state/storybookDecorators/ReduxStoreProviderDecorator'


const meta: Meta<typeof TodolistButtons> = {
	title: 'App/TodoListButtons',
	component: TodolistButtons,

	decorators: [ReduxStoreProviderDecorator],

	parameters: {
		layout: 'centered'
	},

	tags: ['autodocs'],

	argTypes: {
		todolistId: {
			description: 'unique todolist id'
		},
		todolistFilter: {
			description: 'todolsit filter value'
		}
	},

	args: {
		todolistId: 'todolistId1',
		todolistFilter: 'all'
	}
}
export default meta

type Story = StoryObj<typeof meta>;

export const Primary: Story = {}