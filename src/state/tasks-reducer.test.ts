import {v1} from 'uuid';
import {TasksStateType} from "../App";
import {
    ActionType,
    AddTaskAC,
    ChangeTaskStatusTypeAC,
    ChangeTaskTitleTypeAC,
    RemoveTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {AddTodoListAC, RemoveTodoListAC} from "./todolists-reducer";

let startTasksState: TasksStateType = {}
beforeEach(() => {
    startTasksState = {
        ["todoListID1"]: [
            {id: "1", title: "AAA", isDone: false},
            {id: "2", title: "BBB", isDone: true},
            {id:"3", title: "CCC", isDone: false},
            {id: "4", title: "QQQ", isDone: false},
        ],
        ["todoListID2"]:
            [
                {id: "1", title: "III", isDone: true},
                {id:"2", title: "EEE", isDone: false},
                {id: "3", title: "FFF", isDone: true}
            ]
    }
})

test('correct task should be removed', () => {
    const action: ActionType = RemoveTaskAC("todoListID2", "rwger")
    const endState = tasksReducer(startTasksState, action)

    expect(endState["todoListID2"].length).toBe(2);
});

test('correct task should be added', () => {
    const action: ActionType = AddTaskAC("newTask", "todoListID1")
    const endState = tasksReducer(startTasksState, action)

    expect(endState["todoListID1"].length).toBe(5);
    expect(endState["todoListID1"][0].title).toBe("newTask");
});

test('STATUS of specified task should be changed', () => {
    const startState: TasksStateType = {

    };
    const action = ChangeTaskStatusTypeAC("todolistId2", "2", false);
    const endState = tasksReducer(startState, action)
    console.log(endState)

    expect(endState["todolistId2"][2].isDone).toBe(false);
    expect(endState["todolistId2"][1].isDone).toBe(false)

});


test('TITLE of specified task should be changed', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = ChangeTaskTitleTypeAC("todolistId2", "3", "lemon");

    const endState = tasksReducer(startState, action)
    console.log(endState)

    expect(startState["todolistId2"][2].title).toBe("tea");
    expect(endState["todolistId2"][2].title).toBe("lemon");
});


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = AddTodoListAC("new todolist");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState); // получение всех ключей объекта endState
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    };

    const action = RemoveTodoListAC("todolistId2");
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});

