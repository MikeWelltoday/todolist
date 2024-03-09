import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {AddItemForm} from './AddItemForm'

//========================================================================================

const meta: Meta<typeof AddItemForm> = {
    title: 'App/AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'centered'
    },

    tags: ['autodocs'],

    argTypes: {
        addItem: {
            description: 'title is send by cb-function =>'
        }
    },

    args: {
        addItem: action('title is send by cb-function =>')
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================

export const Primary: Story = {}