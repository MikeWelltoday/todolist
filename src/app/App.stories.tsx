import type {Meta, StoryObj} from '@storybook/react'
import App from './App'
import {ReduxStoreProviderDecorator} from '../stories'

//========================================================================================

const meta: Meta<typeof App> = {
    title: 'App/App',
    component: App,
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