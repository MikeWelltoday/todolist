import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {EditableSpan} from './EditableSpan'

//========================================================================================

const meta: Meta<typeof EditableSpan> = {
    title: 'App/EditableSpan',
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

export const Primary: Story = {}