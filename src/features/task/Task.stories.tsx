import type { Meta, StoryObj } from '@storybook/react'
import { Task } from 'features/task/Task'
import { TaskStatusesEnum } from '../../shared'
import { ReduxStoreProviderDecorator } from '../../store/storybook-decorators/ReduxStoreProviderDecorator'


const meta: Meta<typeof Task> = {
	title: 'App/Task',
	component: Task,
	decorators: [ReduxStoreProviderDecorator],
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs'],
	argTypes: {
		taskId: {
			description: 'unique task id'
		},
		todolistId: {
			description: 'unique todolist id'
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
		}
	},
	args: {
		todolistId: 'gsdbgsn45345fd',
		taskId: 'gsdbgsng;sdfngf',
		title: 'JavaScript',
		status: TaskStatusesEnum.New,
		entityStatus: 'idle'
	}
}
export default meta

type Story = StoryObj<typeof meta>;


export const Primary: Story = {}

export const TaskIsDone: Story = {
	args: {
		taskId: 'gsdbgsn45345fd',
		status: TaskStatusesEnum.Completed
	}
}