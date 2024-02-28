import {action} from '@storybook/addon-actions'
import {Task} from './Task'

export default {
    title: 'Task',
    component: Task,
    parameters: {
        layout: 'centered'
    }
}

const callBack = action('CALL-BACK-ACTION => ')


export const Primary = (props: any) => {
    return <Task
        taskId={'taskId'}
        title={'Title'}
        isDone={false}

        removeTaskOnClickHandler={callBack}
        changeTaskStatusOnChangeHandler={callBack}
        changeTaskTitleOnChangeHandler={callBack}
    />
}