import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {EditableSpan} from './EditableSpan'


//========================================================================================
// 🔮 .S.T.O.R.Y. - .S.E.T.T.I.N.G.S.

const meta: Meta<typeof EditableSpan> = {
    title: '🍇 App/EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered'
    },

    tags: ['autodocs'],

    argTypes: {
        children: {
            description: 'children from props',
            control: 'text'
        },
        onChangeTitle: {
            description: 'title is send by cb-function =>'
        }
    },

    args: {
        children: 'title',
        onChangeTitle: action('title is send by cb-function =>')
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================
// 📚 .S.T.O.R.I.E.S.

export const Primary: Story = {}