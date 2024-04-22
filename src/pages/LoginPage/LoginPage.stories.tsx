import type { Meta, StoryObj } from '@storybook/react'
import { StoreDecoratorForLogin } from '../../state/storybookDecorators/StoreDecoratorForLogin'
import { LoginPage } from './LoginPage'

const meta: Meta<typeof LoginPage> = {
	title: 'App/LoginPage',
	component: LoginPage,
	parameters: {
		layout: 'centered'
	},

	tags: ['autodocs'],

	decorators: [StoreDecoratorForLogin],

	argTypes: {},

	args: {}
}
export default meta

type Story = StoryObj<typeof meta>;

export const Primary: Story = {}