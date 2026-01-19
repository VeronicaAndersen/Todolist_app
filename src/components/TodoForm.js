import { useState, useEffect } from 'react';
import { BsChevronDoubleRight } from 'react-icons/bs';
import ListItem from './ListItem';

function TodoForm() {
    const [todos, setTodos] = useState(() => {
        return JSON.parse(localStorage.getItem('Todos')) || [];
    });
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        localStorage.setItem('Todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            isChecked: false
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const toggleChecked = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <>
            <h1>TODO</h1>
            <form className="todo-form" onSubmit={addTodo}>
                <input
                    type="text"
                    className="todo-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a task..."
                />
                <button type="submit" className="todo-button">
                    <BsChevronDoubleRight />
                </button>
            </form>

            {todos.map(todo => (
                <ListItem
                    key={todo.id}
                    text={todo.text}
                    isChecked={todo.isChecked}
                    toggleChecked={() => toggleChecked(todo.id)}
                    deleteTodo={() => deleteTodo(todo.id)}
                />
            ))}

            {todos.length === 0 && <p>No tasks yet!</p>}
        </>
    );
}

export default TodoForm;
