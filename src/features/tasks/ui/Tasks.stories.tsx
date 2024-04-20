import type { Meta, StoryObj } from '@storybook/react'
import { Tasks } from './Tasks'
import { ReduxStoreProviderDecorator } from '../../../store/storybook-decorators/ReduxStoreProviderDecorator'

const meta: Meta<typeof Tasks> = {
	title: 'App/Tasks',
	component: Tasks,

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
			description: 'todolist filter'
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