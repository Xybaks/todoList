import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EbitableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    removeTask: (taskID: string, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    todoListId: string
    task: TaskType
}

const Task = React.memo((props: TaskPropsType) => {
    //  функции реагирования для изменения статуса, удаления тасок, изменения имени таски :
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId)
    }

    const removeTask = () => {
        props.removeTask(props.task.id, props.todoListId)
    }

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListId)
    }
    return (
        <li className={props.task.isDone ? "is-done" : ""}>
            <Checkbox onChange={changeTaskStatus}
                      checked={props.task.isDone}
            />

            <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
            <IconButton size="small" onClick={removeTask}><Delete color="primary"/></IconButton>
        </li>
    )
})
export default Task