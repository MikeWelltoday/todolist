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
        title: {
            description: 'title from props',
            control: 'text'
        },
        onChangeTitle: {
            description: 'title is send by cb-function =>'
        },
        entityStatus: {
            description: 'status to disable editableSpan'
        }
    },

    args: {
        title: 'title123',
        onChangeTitle: action('title is send by cb-function =>'),
        entityStatus: 'idle'
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================

export const Primary: Story = {}