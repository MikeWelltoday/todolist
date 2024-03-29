import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Task} from './Task'
import {TaskStatusesEnum} from '../../api'
import {fn} from '@storybook/test'

//========================================================================================

const meta: Meta<typeof Task> = {
    title: 'App/Task',
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
        status: {
            description: 'task checkbox status',
            control: 'boolean'
        },
        entityStatus: {
            description: 'entityStatus to disable component while pending'
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
        status: TaskStatusesEnum.New,
        entityStatus: 'succeeded',
        removeTaskOnClickHandler: action('taskId is send by cb-function =>'),
        changeTaskStatusOnChangeHandler: action('taskId, isDone  are send by cb-function =>'),
        changeTaskTitleOnChangeHandler: action('taskId, newTitle  are send by cb-function =>')
    }
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================

export const Primary: Story = {}

export const TaskIsDone: Story = {
    args: {
        taskId: 'gsdbgsn45345fd',
        status: TaskStatusesEnum.Completed
    }
}