
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {AddItemForm,AddItemFormPropsType} from "./AddItemForm"
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import React from "react";

export default {
    title: 'TodoLists/AddItemForm',
    component: AddItemForm,
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem:action("button inside clicked")
};
