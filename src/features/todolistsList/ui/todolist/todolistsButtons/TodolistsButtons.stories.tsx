import type { Meta, StoryObj } from '@storybook/react'
import { ReduxStoreProviderDecorator } from 'stories'
import { TodolistButtons } from './TodolistButtons'


const meta: Meta<typeof TodolistButtons> = {
	title: 'App/Todolist',
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