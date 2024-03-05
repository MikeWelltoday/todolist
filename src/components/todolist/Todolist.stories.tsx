import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Todolist} from './Todolist'
import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator'


//========================================================================================
// 🔮 .S.T.O.R.Y. - .S.E.T.T.I.N.G.S.

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
        todolistTitle: {
            description: 'unique task id'
        },
        filter: {
            description: 'todolist filtration: all, active, completed'
        },
        changeTaskFilter: {
            description: 'todolistId, filterMode  are send by cb-function =>'
        },
        changeTodolistTitle: {
            description: 'todolistId, newTodolistTitle  are send by cb-function =>'
        },
        removeTodolist: {
            description: 'todolistId is send by cb-function =>'
        }
    },

    args: {
        todolistId: 'todolistId1',
        todolistTitle: 'todolist title',
        filter: 'all',
        changeTaskFilter: action('todolistId, filterMode  are send by cb-function =>'),
        changeTodolistTitle: action('todolistId, newTodolistTitle  are send by cb-function =>'),
        removeTodolist: action('todolistId is send by cb-function =>')
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================
// 📚 .S.T.O.R.I.E.S.

export const Primary: Story = {}