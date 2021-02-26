// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

import {Task, TaskPropsType} from "./Task"
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import React from "react";


export default {
    title: 'TodoLists/Task',
    component: Task,
    args:{
        todoListId: "todoListId1",
    }
} as Meta;

const changeTaskStatusCallback = action("Status changed inside Task")
const removeTaskCallback = action("Remove Button inside Task clicked")
const changeTaskTitleCallback = action("Title changed inside Task")


const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    removeTask: removeTaskCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeTaskStatus: changeTaskStatusCallback
}
export const TaskIsDoneTrueExample = Template.bind({});
TaskIsDoneTrueExample.args = {
    ...baseArgs,
        task: {id: "dsasdf", title: "JS", isDone: true}
};

export const TaskIsDoneFalseExample = Template.bind({});
TaskIsDoneFalseExample.args = {
    ...baseArgs,
    task: {id: "dsasdf", title: "JS", isDone: false}
};