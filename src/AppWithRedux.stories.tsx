import type {Meta, StoryObj} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import AppWithRedux from './AppWithRedux'
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator'


//========================================================================================
// 🔮 .S.T.O.R.Y. - .S.E.T.T.I.N.G.S.

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
// 📚 .S.T.O.R.I.E.S.

export const AppWithReduxStory: Story = {}