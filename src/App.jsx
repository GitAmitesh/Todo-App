import { useContext } from 'react'
import Navbar from './components/Navbar'
import AddTodo from './components/AddTodo'
import { TodoContext } from './context/TodoContext'
import TodoList from './components/TodoList'

function App() {
  const {
    showFinished, toggleFinished
  } = useContext(TodoContext);


  return (
    <>
      <Navbar/>

      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-[#93B1A6] min-h-96 md:w-1/2">

          <h1 className="text-center text-xl font-bold">Manage your tasks at one place</h1>

          {/* ADDING A TODO */}
          <AddTodo/>  

          {/* VIEWING AND MANAGING TODOS */}
          <h1 className='text-lg font-bold'>Your Tasks</h1>
          <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> <span className='text-base font-semibold'>Show Completed Tasks</span>
          <TodoList/>
          
      </div>
    </>
  );
}

export default App;
