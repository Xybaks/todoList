import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EbitableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";

type TodoListsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeDodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeDodoListTitle: (TodoListTitle: string,todoListID: string ) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void

}

export function TodoList(props: TodoListsType) {
    //3 функции изменения отображаемых тасок
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
//функция удаления тудулиста
    const removeDodoList = () => {
        props.removeDodoList(props.id)
    }
//функция добавления тудулиста
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

     const changeTaskStatus = (title:string)=>{
         props.changeDodoListTitle(title,props.id)
     }

    return (
        <div>
        <h3 style={{textAlign:"center"}}><EditableSpan title={props.title} changeTitle={changeTaskStatus}/>
            <IconButton size="small" onClick={removeDodoList}><Delete color="secondary"/></IconButton>
        </h3>
        <AddItemForm
            addItem={addTask}
        />
            <div style={{marginTop:"10px"}}>
                <Button
                    // className={props.filter === "all" ? "active-filter" : ""}
                    style={{margin:"3px"}}
                    size={"small"}
                    variant={props.filter === "all" ?"contained":"outlined"}
                    color={props.filter === "all" ?"secondary":"primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    // className={props.filter === "active" ? "active-filter" : ""}
                    style={{margin:"3px"}}
                    size={"small"}
                    variant={props.filter === "active" ?"contained":"outlined"}
                    color={props.filter === "active" ?"secondary":"primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    style={{margin:"3px"}}
                    size={"small"}
                    variant={props.filter === "completed" ?"contained":"outlined"}
                    color={props.filter === "completed" ?"secondary":"primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        <ul style={{listStyle:"none",padding:"0"}}>{
            props.tasks.map(task => {
                //  функции реагирования для изменения статуса, удаления тасок, изменения имени таски :
                const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                }

                const removeTask = () => {
                    props.removeTask(task.id, props.id)
                }

                const changeTaskTitle = (title: string) => {
                    props.changeTaskTitle(task.id, title, props.id)
                }

                return (
                    <li key={task.id} className={task.isDone ? "is-done" : ""}>
                        <Checkbox onChange={changeTaskStatus}
                        checked={task.isDone}
                    />

                        <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                        <IconButton size="small" onClick={removeTask}><Delete color="primary"/></IconButton>
                    </li>
                )
            })
        }

        </ul>

    </div>);
}

