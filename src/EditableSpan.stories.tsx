
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {EditableSpan,EditableSpanPropsType} from "./EbitableSpan"
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import React from "react";

 export default {
    title: 'TodoLists/EditableSpan',
    component: EditableSpan,
    argTypes:{
        changeTitle:{
            description:" Value of EditableSpan was changed "
        },
        value:{
            defaultValue:"HTML",
            description:"Start Value  of EditableSpan"
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeTitle:action("Value of EditableSpan was changed"),
    title:"EditableSpanTitle"
};
