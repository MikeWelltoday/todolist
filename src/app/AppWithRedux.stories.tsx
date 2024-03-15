import type {Meta, StoryObj} from '@storybook/react'
import AppWithRedux from './AppWithRedux'
import {ReduxStoreProviderDecorator} from '../stories/decorators/ReduxStoreProviderDecorator'


//========================================================================================

const meta: Meta<typeof AppWithRedux> = {
    title: 'App/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered'
    },

    tags: ['autodocs'],

    decorators: [ReduxStoreProviderDecorator]
}
export default meta

type Story = StoryObj<typeof meta>;

//========================================================================================

export const AppWithReduxStory: Story = {}