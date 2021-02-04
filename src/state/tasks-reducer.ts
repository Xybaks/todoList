import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListAC, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string,
    todoListId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}

type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    taskId: string,
    isDone: boolean
}


type ChangeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    taskId: string,
    title: string
}
export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodoListActionType
|RemoveTodoListActionType

export function tasksReducer(state: TasksStateType, action: ActionType): TasksStateType {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            copyState[action.todoListId] = [
                {id: v1(), title: action.title, isDone: false},
                ...copyState[action.todoListId]]
            return copyState

        }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                        if (task.id === action.taskId)
                            return {...task, isDone: action.isDone}
                        else return task
                    }
                )
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                        if (task.id === action.taskId)
                            return {...task, title: action.title}
                        else return task
                    }
                )
            }

        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]: []
            }

        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
                default:
            return state
    }
}

//
// case 'CHANGE-TODOLIST-TITLE': {
//     const todoLists = state.map(tl => {
//         if (tl.id === action.id) {
//             return {...tl, title: action.title};
//         }
//         return tl;
//     })
//     return state;

export const RemoveTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskId, // можно писать  так, из-за совпадения имен taskId=action.taskId
        todoListId // можно писать  так, из-за совпадения имен todoListId=action.todoListId
    }
}
//
export const AddTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListId}
}

export const ChangeTaskStatusTypeAC = (todoListId: string, taskId: string, isDone: boolean): ChangeTaskStatusType => {
    return {type: 'CHANGE-TASK-STATUS', todoListId, taskId, isDone}
}

export const ChangeTaskTitleTypeAC = (todoListId: string, taskId: string, title: string): ChangeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', todoListId, taskId, title}
}