import {AddItemForm} from './AddItemForm'
import {action} from '@storybook/addon-actions'

export default {
    title: 'AddItemForm',
    component: AddItemForm,
    parameters: {
        layout: 'left'
    }
}

const callBack = action('ACTION')

export const Primary = (props: any) => {
    return <AddItemForm
        addItem={callBack}
    />
}