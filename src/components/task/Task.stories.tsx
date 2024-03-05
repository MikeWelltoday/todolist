import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Task} from './Task'


//========================================================================================
// 🔮 .S.T.O.R.Y. - .S.E.T.T.I.N.G.S.

const meta: Meta<typeof Task> = {
    title: '🍇 App/Task',
    component: Task,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        taskId: {
            description: 'unique task id'
        },
        title: {
            description: 'task title',
            control: 'text'
        },
        isDone: {
            description: 'task checkbox',
            control: 'boolean'
        },
        removeTaskOnClickHandler: {
            description: 'taskId is send by cb-function =>'
        },
        changeTaskStatusOnChangeHandler: {
            description: 'taskId, isDone  are send by cb-function =>'
        },
        changeTaskTitleOnChangeHandler: {
            description: 'taskId, newTitle  are send by cb-function =>'
        }
    },
    args: {
        taskId: 'gsdbgsng;sdfngf',
        title: 'JavaScript',
        isDone: false,
        removeTaskOnClickHandler: action('taskId is send by cb-function =>'),
        changeTaskStatusOnChangeHandler: action('taskId, isDone  are send by cb-function =>'),
        changeTaskTitleOnChangeHandler: action('taskId, newTitle  are send by cb-function =>')
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================
// 📚 .S.T.O.R.I.E.S.

export const Primary: Story = {}

export const TaskIsDone: Story = {
    args: {
        taskId: 'gsdbgsn45345fd',
        isDone: true
    }
}