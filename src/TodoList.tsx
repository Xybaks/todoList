import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EbitableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from "./Task";


type TodoListsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeDodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeDodoListTitle: (TodoListTitle: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void

}

export const TodoList: React.FC<TodoListsType> = React.memo(({addTask,
                                                                 id,
                                                                 title,
                                                                 changeFilter,
                                                                 removeDodoList,
                                                                 changeDodoListTitle,
                                                                 ...props}) => {
    console.log("TodoList was rendered")
    //вместо пропсов можно делать так : брать таски , тудулисты useSelector, а функции из useDispatch
    // const todolist = useSelector<AppRootStateType, TodoListType>(state =>
    //     state.todoLists.filter(todo => todo.id === props.id)[0]);
    // const tasks = useSelector<AppRootStateType, Array<TaskType>>(state =>
    //     state.tasks[props.id]);
    // const dispatch = useDispatch();


    //3 функции изменения отображаемых тасок
    const onAllClickHandler = useCallback(() => {
        changeFilter("all", id)
    }, [changeFilter, id])

    const onActiveClickHandler = useCallback(() => {
        changeFilter("active", id)
    }, [changeFilter, id])

    const onCompletedClickHandler = useCallback(() => {
        changeFilter("completed", id)
    }, [changeFilter, id])
//функция удаления тудулиста
    const removeDodoList1 =useCallback( () => {
       removeDodoList(id)
    },[removeDodoList,id])
//функция добавления тудулиста
    const addTask1 = useCallback((title: string) => {
        addTask(title, id)
    }, [addTask, id])

    const changeTaskStatus = useCallback((title1: string) => {
        changeDodoListTitle(title1, id)}, [changeDodoListTitle,id]
    )

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }
    return (
        <div>
            <h3 style={{textAlign: "center"}}><EditableSpan title={title} changeTitle={changeTaskStatus}/>
                <IconButton size="small" onClick={removeDodoList1}><Delete color="secondary"/></IconButton>
            </h3>
            <AddItemForm
                addItem={addTask1}
            />
            <div style={{marginTop: "10px"}}>
                <Button
                    // className={props.filter === "all" ? "active-filter" : ""}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    // className={props.filter === "active" ? "active-filter" : ""}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    style={{margin: "3px"}}
                    size={"small"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
            <ul style={{listStyle: "none", padding: "0"}}>{
                tasksForTodolist.map(t => {
                    return (
                        <Task
                            key={t.id}
                            changeTaskTitle={props.changeTaskTitle}
                            changeTaskStatus={props.changeTaskStatus}
                            removeTask={props.removeTask}
                            todoListId={id}
                            task={t}

                        />
                    )
                })
            }

            </ul>

        </div>);
})

