import React from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const AddTodo = () => {
    // Destructuring values from TodoContext
    const {
        todo, handleChange, handleAdd, editId, inputRef
      } = useContext(TodoContext);

    return(
        <div className="addTodo my-5">
            <h2 className="text-lg font-bold mb-3">{editId ? 'Edit Task' : 'Add a Task'}</h2>
            {/* Form to handle adding or editing a todo */}
            <form onSubmit={(e) => {handleAdd(e)}}>
                <input onChange={handleChange}
                       ref={inputRef}  
                       value={todo} 
                       type="text" 
                       placeholder=' Write you next task' 
                       className='p-2 pl-3 w-full rounded-full'/>
                <div className="flex justify-center mt-3">
                    <button type="submit" 
                    disabled={todo.length<=3} 
                    className='bg-[#415e53] hover:bg-[#183D3D] disabled:bg-gray-400 disabled:text-gray-600  p-2 py-1 text-md font-semibold text-white rounded-full w-1/3'>
                        { editId? "UPDATE":"SAVE" }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodo;