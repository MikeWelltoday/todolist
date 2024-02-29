import type {StorybookConfig} from '@storybook/react-webpack5'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app',
        '@storybook/addon-onboarding',
        '@storybook/addon-interactions',
        {
            name: '@storybook/addon-storysource',
            options: {
                rule: {
                    test: [/\.stories\.tsx?$/]
                },
                loaderOptions: {
                    prettierConfig: {
                        printWidth: 80,
                        singleQuote: true,
                        option: {parser: 'typescript'}
                    }
                }
            }
        }
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {
            builder: {
                useSWC: true
            }
        }
    },
    docs: {
        autodocs: 'tag'
    },
    staticDirs: ['..\\public']
}
export default config
