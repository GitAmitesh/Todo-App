import React from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const AddTodo = () => {
    const {
        todo, handleChange, handleAdd
      } = useContext(TodoContext);

    return(
        <div className="addTodo my-5">
            <h2 className="text-lg font-bold mb-3">Add a Task</h2>
            <form onSubmit={(e) => {handleAdd(e)}}>
                <input onChange={handleChange} value={todo} type="text" placeholder=' Write you next task' className='p-2 pl-3 w-full rounded-full'/>
                <div className="flex justify-center mt-3"><button type="submit" disabled={todo.length<=3} className='bg-[#415e53] hover:bg-[#183D3D] disabled:bg-[#5C8374] p-2 py-1 text-md font-semibold text-white rounded-full w-1/3'>SAVE</button></div>
            </form>
        </div>
    );
}

export default AddTodo;