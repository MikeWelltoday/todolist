import React from 'react'
import AppWithRedux from './AppWithRedux'
import {Provider} from 'react-redux'
import {store} from './state/store'

export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered'
    }
}

export const Frame = (props: any) => {
    return (
        <>
            <Provider store={store}>
                <AppWithRedux/>
            </Provider>
        </>
    )
}