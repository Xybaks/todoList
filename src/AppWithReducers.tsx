import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {
    AddTaskAC,
    ChangeTaskStatusTypeAC,
    ChangeTaskTitleTypeAC,
    RemoveTaskAC,
    tasksReducer
} from "./state/tasks-reducer";


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


function AppWithReducers() {
//BLL
//
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    // список задач c  ключами по todoListID, к ним хук useState,  замена данных по вызову функции setTasks
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "AAA", isDone: false},
            {id: v1(), title: "BBB", isDone: true},
            {id: v1(), title: "CCC", isDone: false},
            {id: v1(), title: "QQQ", isDone: false},
        ],
        [todoListID2]:
            [
                {id: v1(), title: "III", isDone: true},
                {id: v1(), title: "EEE", isDone: false},
                {id: v1(), title: "FFF", isDone: true}
            ]
    })

    function addTodoList(title: string) {
        const action = AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchToTasks(action)

    }

    function removeDodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID)
        dispatchTodoLists(action)
        dispatchToTasks(action)
    }

    function changeDodoListTitle(TodoListTitle: string, todoListID: string) {
        dispatchTodoLists(ChangeTodoListTitleAC(TodoListTitle, todoListID))
    }

// функция удаления задачи
    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(RemoveTaskAC(todoListID, taskID))
    }

//  смена фильтра по переданному значению
    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        dispatchTodoLists(ChangeTodoListFilterAC(todoListID, filterValue))
    }

    // добавление новой  task  по заданному названию title  и ID тудулиста с последующим обновлением tasks через setTasks и UseState
    function addTask(title: string, todoListID: string) {
        dispatchToTasks(AddTaskAC(title, todoListID))
    }

    // function changeTaskStatus - Смена на противоположный параметр isDone для опеделеной task,
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTasks(ChangeTaskStatusTypeAC(todoListID, taskID, isDone))
    }

    //фильтрация отображения тасок  с передачей на вводе параметра фильтрации и ID todoList
    function getTasksForTodoList(filterValue: FilterValuesType, todoListID: string) {
        let filterTasksForTodoList = tasks[todoListID]
        if (filterValue === "active") {
            filterTasksForTodoList = tasks[todoListID].filter(t => t.isDone === false)
        }
        if (filterValue === "completed") {
            filterTasksForTodoList = tasks[todoListID].filter(t => t.isDone === true)
        }
        return filterTasksForTodoList;

    }

    // функция смены имени тасок
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchToTasks(ChangeTaskTitleTypeAC(todoListID, taskID, title))
    }


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
                            let tasksForTodoList = getTasksForTodoList(tl.filter, tl.id)
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
                                            tasks={tasksForTodoList}
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

export default AppWithReducers;
