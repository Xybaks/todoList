import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./state/todolists-reducer";
import {
    AddTaskAC,
    ChangeTaskStatusTypeAC,
    ChangeTaskTitleTypeAC,
    RemoveTaskAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";


export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type FilterValuesType = "all" | "active" | "completed"
//
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
//BLL
//

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()
    // список задач c  ключами по todoListID, к ним хук useState,  замена данных по вызову функции setTasks

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
    }, [dispatch])

    const removeDodoList = useCallback((todoListID: string) => {
        dispatch(RemoveTodoListAC(todoListID))
    }, [dispatch])

    const changeDodoListTitle = useCallback((TodoListTitle: string, todoListID: string) => {
        dispatch(ChangeTodoListTitleAC(TodoListTitle, todoListID))
    }, [dispatch])

// функция удаления задачи
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(RemoveTaskAC(todoListID, taskID))
    }, [dispatch])

//  смена фильтра по переданному значению
    const changeFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filterValue))
    }, [dispatch])

    // добавление новой  task  по заданному названию title  и ID тудулиста с последующим обновлением tasks через setTasks и UseState
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(AddTaskAC(title, todoListID))
    }, [dispatch])

    // function changeTaskStatus - Смена на противоположный параметр isDone для опеделеной task,
    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(ChangeTaskStatusTypeAC(todoListID, taskID, isDone))
    }, [dispatch])

    // функция смены имени тасок
    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(ChangeTaskTitleTypeAC(todoListID, taskID, title))
    }, [dispatch])

     //UI
    return (
        <div className="App">
            {/*AppBar комопнента @material-ui - гогтовый Header*/}
            <AppBar position="static">
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <div style={{display: "flex"}}>
                        <Typography variant="h6" style={{margin: "20px"}}>
                            News
                        </Typography>
                        <Typography variant="h6" style={{margin: "20px"}}>
                            About
                        </Typography>
                    </div>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "10px", background: "greenyellow", borderRadius: "10px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10} style={{
                                        margin: "10px",
                                        padding: "30px",
                                        background: "lightskyblue",
                                        borderRadius: "10px"
                                    }}>
                                        <TodoList
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            tasks={tasks[tl.id]}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeTaskStatus={changeTaskStatus}
                                            removeDodoList={removeDodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeDodoListTitle={changeDodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        }
                    )
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
