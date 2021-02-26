// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {AppWithRedux} from "./AppWithRedux"
import {Meta, Story} from "@storybook/react/types-6-0";
import React from "react";
import {ReduxStoreProviderDecorator} from "./stories/decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Todolists/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};