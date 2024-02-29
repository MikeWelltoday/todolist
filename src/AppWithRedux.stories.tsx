import React from 'react'
import AppWithRedux from './AppWithRedux'
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator'

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered'
    },
    // контекст
    decorators: [ReduxStoreProviderDecorator]
}

export const Frame = (props: any) => {
    return (
        <>
            <AppWithRedux/>
        </>
    )
}






