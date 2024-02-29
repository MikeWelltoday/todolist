import {EditableSpan} from './EditableSpan'
import {action} from '@storybook/addon-actions'
import React from 'react'

export default {
    title: 'EditableSpan',
    component: EditableSpan,
    parameters: {
        layout: 'centered'
    }
}

const onChangeTitleCallBack = action('TITLE-IS-CHANGED')

export const Frame = (props: any) => {

    return (
        <>
            <EditableSpan onChangeTitle={onChangeTitleCallBack}>Children</EditableSpan>
        </>
    )
}



