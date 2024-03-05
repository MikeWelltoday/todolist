import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {AddItemForm} from './AddItemForm'


//========================================================================================
// 🔮 .S.T.O.R.Y. - .S.E.T.T.I.N.G.S.

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
// 📚 .S.T.O.R.I.E.S.

export const Primary: Story = {}