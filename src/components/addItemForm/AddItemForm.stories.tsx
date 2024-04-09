import type { Meta, StoryObj } from '@storybook/react'
import { AddItemForm } from 'components/addItemForm/AddItemForm'
import { fn } from '@storybook/test'

//========================================================================================

const meta: Meta<typeof AddItemForm> = {
	title: 'App/AddItemForm',
	component: AddItemForm,
	parameters: {
		layout: 'centered'
	},

	tags: ['autodocs'],

	argTypes: {
		todolistEntityStatus: {
			description: 'entityStatus for loading and disable'
		},
		addItem: {
			description: 'title is send by cb-function =>'
		}
	},

	args: {
		todolistEntityStatus: 'idle',
		addItem: fn()
	}
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================

export const Primary: Story = {}