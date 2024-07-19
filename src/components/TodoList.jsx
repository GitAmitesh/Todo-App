import React from "react";
import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

const TodoList = () => {
    const {
        todos, showFinished, handleEdit, handleDelete, handleCheckbox
      } = useContext(TodoContext);
    return(
        <div className="todos">
            {todos.length === 0 && <div className='font-semibold'>No todos to display</div>}
            {todos.map(item => {
              return(showFinished || !item.isCompleted) &&
                <div key={item.id} className="todo flex gap-4 justify-between m-1 md:m-4 items-center">
                    <div className="task flex gap-2">
                        <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id}/>
                        <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                    </div>
                    
                    <div className="buttons flex h-full">
                        <button onClick={(e) => {handleEdit(e, item.id)}}
                                className='bg-[#5C8374] hover:bg-[#183D3D] p-2 py-1 text-sm font-semibold text-white rounded-md mx-1'>
                                    <PencilSquareIcon className="size-4"/>
                        </button>
                        <button onClick={(e) => {handleDelete(e, item.id)}} 
                                className='bg-[#5C8374] hover:bg-[#183D3D] p-2 py-1 text-sm font-semibold text-white rounded-md mx-1'>
                                    <TrashIcon className="size-4"/>
                        </button>
                    </div>
                </div>
            })}
        </div>
    );
}

export default TodoList;