import { useState, createContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export const TodoContext = createContext();

function getLocalItems() {
    let list = localStorage.getItem("todos");
    return list ? JSON.parse(list) : [];
};

export const TodoProvider = (props) => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState(getLocalItems());
    const [showFinished, setshowFinished] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
    
    const toggleFinished = () => {
        setshowFinished(!showFinished);
    }
      
    const handleEdit = (e, id) => {
        const todoItem = todos.find(item => item.id === id);
        setTodo(todoItem.todo);
        setEditId(id);
    }
    
    const handleDelete = (e, id) => {
        let newTodos = todos.filter(item=>{
          return item.id!== id;
        });
        setTodos(newTodos);
    }
    
    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    
    const handleAdd = (e) => {
        e.preventDefault();
        if (editId) {
            // Update the existing todo
            const updatedTodos = todos.map(item =>
              item.id === editId ? { ...item, todo } : item
            );
            setTodos(updatedTodos);
            setTodo("");
            setEditId(null); // Reset editId after updating
        }else{
            setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}]);
            setTodo("");
        }
    }
    
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
        <TodoContext.Provider value={{ todo, todos, setTodos, showFinished, toggleFinished, handleEdit, handleDelete, handleChange, handleAdd, handleCheckbox }}>
            {props.children}
        </TodoContext.Provider>
    );
}