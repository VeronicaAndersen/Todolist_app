import { useState, useEffect } from 'react'
import { BsChevronDoubleRight } from 'react-icons/bs';
import ListItem from './ListItem';

function TodoForm() {
    // Gets todoItems from localstorage if there´s.
    const [allTodos, setAllTodos] = useState(() => {
        return JSON.parse(localStorage.getItem("Todos")) || []
    })
    const [todo, setTodo] = useState()

    // Add todos and prevent page to relode. 
    const addTodo = (e) => {
        e.preventDefault()
        const todoItem = {
            id: new Date().getTime(),
            text: todo,
            isChecked: false
        }
        if (todo !== "") {
            setAllTodos([...allTodos].concat(todoItem))
            setTodo("")
        }
    }
    // Gets all todos
    const getAllTodos = () => {
        let stored = JSON.parse(localStorage.getItem("Todos"))
        if (stored) {
            setAllTodos(stored)
        }
    }
    // Updates if todo is done
    const toggleChecked = (id) => {
        let updatedTodos = [...allTodos].map(todo => {
            if (todo.id === id) {
                todo.isChecked = !todo.isChecked
            }
            return todo
        })
        setAllTodos(updatedTodos)
    }
    // Deletes todo
    const deleteTodo = (id) => {
        const filteredTodo = allTodos.filter(todo => todo.id !== id)
        setAllTodos(filteredTodo)
    }

    useEffect(() => {
        getAllTodos()
    }, [])


    useEffect(() => {
        localStorage.setItem("Todos", JSON.stringify(allTodos))
    }, [allTodos])

    return (
        <>
        {/* Form with input and a button */}
            <h1>TODO</h1>
            <form className="todo-form" onSubmit={addTodo} >
                <input type={"text"} className="todo-input" value={todo || ''} onChange={(e) => setTodo(e.target.value)} />
                <button className="todo-button" onClick={addTodo} >
                    <BsChevronDoubleRight />
                </button>
            </form>


            { // Will be shown if there´s any todos in the list.
                allTodos.map(todo => (
                    <ListItem
                        key={todo.id}
                        deleteTodo={() => deleteTodo(todo.id)}
                        text={todo.text}
                        isChecked={todo.isChecked}
                        toggleChecked={() => toggleChecked(todo.id)}
                    />
                ))
            }
            { // Else list will display this text.
                allTodos.length === 0 && (
                    <p>Done!</p>
                )
            }
        </>
    )
}

export default TodoForm