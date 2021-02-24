import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormType)=> {
        console.log("AddItemForm was called")
        const [title, setTitle] = useState<string>("")
        const [error, setError] = useState<string | null>(null)


        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
            setError(null) // очистка при начинании набора имени
        }
        // функция реагирования на    нажатие клавиши Ентер для окончания ввода данных в поле ввода input
        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error !== null) setError(null)
            if (e.key === "Enter") addItem()
        }
        const addItem = () => {
            const itemTitle = title.trim() //  обрезание пробелов по краям текста
            if (itemTitle) {   // если не пустая строка () интерпритируется как  false, то->
                props.addItem(itemTitle) //  вызов функции props.addTask для создания таски у родительской компоненты
            } else {
                setError("Title is required ")
            }
            setTitle("")   //  очистка имени после создания title
        }

        return (
            <div>
                {/*замена импуту: */}
                <TextField
                    // обводка
                    variant={"outlined"}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    error={!!error} // превращение ошибки стринг в булевое значение с тру в фолс, второй ! возвращает тру
                    helperText={error}
                    label={"Title"}
                />
                {/*Button из библиотеки берем @material-ui/core*/}
                <IconButton
                    color="primary"
                    onClick={addItem}><AddBox/> </IconButton>
                {/*{error && <div className="error-message">{error}</div>}*/}
            </div>
        )
    }
)