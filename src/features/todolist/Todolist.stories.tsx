import type {Meta, StoryObj} from '@storybook/react'
import {Todolist} from './Todolist'
import {ReduxStoreProviderDecorator} from '../../stories'

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
        todolistId: {
            description: 'unique todolist id'
        },
        title: {
            description: 'todolist title'
        },
        filter: {
            description: 'todolsit filter value'
        },
        entityStatus: {
            description: 'entityStatus for loading and disable'
        }
    },

    args: {
        todolistId: 'todolistId1',
        title: 'todolist title',
        filter: 'all',
        entityStatus: 'succeeded'
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================

export const Primary: Story = {}