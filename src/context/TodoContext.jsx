import { useState, createContext, useEffect, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext();

// Get todos from localStorage 
function getLocalItems() {
    let list = localStorage.getItem("todos");
    return list ? JSON.parse(list) : [];
};

export const TodoProvider = (props) => {
    const [todo, setTodo] = useState(""); // State for the current todo input
    const [todos, setTodos] = useState(getLocalItems()); // State for the list of todos
    const [showFinished, setshowFinished] = useState(false); // State to show/hide completed todos
    const [editId, setEditId] = useState(null); // State for the ID of the todo being edited
    const inputRef = useRef(null); // Ref for the input element

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
    // Toggle the visibility of completed todos
    const toggleFinished = () => {
        setshowFinished(!showFinished);
    }
     
    // Handle editing a todo
    const handleEdit = (e, id) => {
        const todoItem = todos.find(item => item.id === id);
        setTodo(todoItem.todo);
        setEditId(id);
        //focus the input field when edit is triggered
        inputRef.current.focus();
        inputRef.current.setSelectionRange(todoItem.todo.length, todoItem.todo.length);
    }
    
    // Handle deleting a todo
    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item=>{
          return item.id!== id;
        });
        setTodos(newTodos);
    }
    
    //Handle input change
    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    
     // Handle adding a new todo or updating an existing one
    const handleAdd = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (editId) {
            // Update the existing todo
            const updatedTodos = todos.map(item =>
              item.id === editId ? { ...item, todo } : item
            );
            setTodos(updatedTodos);
            setTodo("");
            setEditId(null);
        }else{
            //create a new todo
            setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]);
            setTodo("");
        }
    }
    
    // Handle toggling the completed state of a todo
    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
          return item.id === id;
        })
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
    }
    

    return(
        // Provide the TodoContext to all children components
        <TodoContext.Provider value={{ todo, todos, setTodos, showFinished, toggleFinished, handleEdit, handleDelete, handleChange, handleAdd, handleCheckbox, inputRef, editId }}>
            {props.children}
        </TodoContext.Provider>
    );
}