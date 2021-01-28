import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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

type TaskstateType = {
    [key: string]: Array<TaskType>
}


function App() {
//BLL
//
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    // список задач c  ключами по todoListID, к ним хук useState,  замена данных по вызову функции setTasks
    const [tasks, setTasks] = useState<TaskstateType>({
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
        let newTodoListId = v1()
        let newTodoList: TodoListType = {id: newTodoListId, title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

// функция удаления задачи по её ID и ID тудулиста c последующим вызовом в setTasks нового массива для перерисовки  массива tasks
    function removeTask(taskID: string, todoListID: string) {
        const todolistTasks = tasks[todoListID]
        tasks[todoListID] = todolistTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})
        //  переменную можно сократить
        // tasks[todoListID] = todolistTasks[todoListID].filter(task => task.id !== taskID)
        // setTasks({...tasks})
    }

//  смена фильтра по переданному значению
    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const todolist = todoLists.find(tl => tl.id === todoListID)
        if (todolist) {
            todolist.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    // добавление новой  task  по заданному названию title  и ID тудулиста с последующим обновлением tasks через setTasks и UseState
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    // function changeTaskStatus - Смена на противоположный параметр isDone для опеделеной task,
    //   находя по taskID в массиве tasks,  затем смотрим, есть ли task
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const task = tasks[todoListID].find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
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
        const task = tasks[todoListID].find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    //  функция удаления тудулиста
    function removeDodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    // функция изменения имени тудулиста
    function changeDodoListTitle(TodoListTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = TodoListTitle
            setTodoLists([...todoLists])
        }
    }

    //UI
    return (
        <div className="App">
            {/*AppBar комопнента @material-ui - гогтовый Header*/}
            <AppBar position="static">
                <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                    <div style={{display:"flex"}}>
                        <Typography variant="h6" style={{margin:"20px"}} >
                            News
                        </Typography>
                    <Typography variant="h6" style={{margin:"20px"}}>
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

export default App;
