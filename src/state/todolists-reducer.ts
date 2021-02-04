import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId:string;
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export function todoListsReducer(state: Array<TodoListType>, action: ActionType) {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id:action.todoListId  ,
                title: action.title,
                filter: "all"
            }
            return [newTodoList, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            const todoLists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title};
                }
                return tl;
            })
            return todoLists;
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter};
                }
                return tl;
            });
        }
        default:
            return state;
    }
}

export const RemoveTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title,todoListId:v1()}
}

export const ChangeTodoListTitleAC = (todolistId: string, newTitle: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: newTitle}
}

export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}
