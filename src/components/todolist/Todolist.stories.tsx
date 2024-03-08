import type {Meta, StoryObj} from '@storybook/react'
import {Todolist} from './Todolist'
import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator'


//========================================================================================

const meta: Meta<typeof Todolist> = {
    title: 'App/Todolist',
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator],
    parameters: {
        layout: 'centered'
    },

    tags: ['autodocs'],

    argTypes: {

        todolist: {
            description: 'unique todolist title value, filter value'
        }
    },

    args: {
        todolist: {id: 'todolistId1', title: 'todolist title', filter: 'all'}
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================
// 📚 .S.T.O.R.I.E.S.

export const Primary: Story = {}