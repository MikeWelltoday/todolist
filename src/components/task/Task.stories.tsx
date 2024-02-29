import {action} from '@storybook/addon-actions'
import {Task} from './Task'

export default {
    title: 'Task',
    component: Task,
    parameters: {
        layout: 'centered'
    }
}

const removeTaskOnClickHandlerCallBack = action('TASK-IS-REMOVED => ')
const changeTaskStatusOnChangeHandlerCallBack = action('TASK-STATUS-IS-CHANGED')
const changeTaskTitleOnChangeHandlerCallBack = action('TASK-TITLE-IS-CHANGED')


export const Primary = (props: any) => {
    return (
        <>
            
            <Task
                taskId={'1'}
                title={'React'}
                isDone={false}

                removeTaskOnClickHandler={removeTaskOnClickHandlerCallBack}
                changeTaskStatusOnChangeHandler={changeTaskStatusOnChangeHandlerCallBack}
                changeTaskTitleOnChangeHandler={changeTaskTitleOnChangeHandlerCallBack}
            />

            <Task
                taskId={'2'}
                title={'JS'}
                isDone={true}

                removeTaskOnClickHandler={removeTaskOnClickHandlerCallBack}
                changeTaskStatusOnChangeHandler={changeTaskStatusOnChangeHandlerCallBack}
                changeTaskTitleOnChangeHandler={changeTaskTitleOnChangeHandlerCallBack}
            />

        </>
    )


}

