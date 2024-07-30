import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { NavLink } from "react-router-dom"
// import './App.css'

function App() {
  const [Task, setTask] = useState("")
  const [Todos, setTodos] = useState([])
  const [editId, setEditId] = useState(null)
  const [editTask, setEditTask] = useState("")

  const fetchData = () => {
    const storedTodos = JSON.parse(localStorage.getItem('Todos'))
    if (storedTodos) setTodos(storedTodos)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = () => {
    console.log(Task)
    const newTodo = [...Todos, { id: uuidv4(), Task, isDone: false }]
    setTodos(newTodo)
    setTask("")
    saveToLocal(newTodo)
  }

  const saveToLocal = (newTodo) => {
    localStorage.setItem("Todos", JSON.stringify(newTodo))
  }

  const handleCheck = (id) => {
    const newTodo = Todos.map(ele => ele.id === id ? { ...ele, isDone: !ele.isDone } : ele)
    setTodos(newTodo)
    saveToLocal(newTodo)
  }

  const handleEdit = (id) => {
    const todoToEdit = Todos.find(todo => todo.id === id)
    setEditId(id)
    setEditTask(todoToEdit.Task)
  }

  const handleSaveEdit = () => {
    const updatedTodos = Todos.map(todo =>
      todo.id === editId ? { ...todo, Task: editTask } : todo
    )
    setTodos(updatedTodos)
    saveToLocal(updatedTodos)
    setEditId(null)
    setEditTask("")
  }

  const handleDelete = (id) => {
    const newTodos = Todos.filter(ele => ele.id !== id)
    saveToLocal(newTodos)
    setTodos(newTodos)
  }

  return (
    <>
      <div className="w-full">
        <div className='flex-row '>
          <h1 className='text-4xl uppercase font-bold p-3 text-white w-full mx-auto bg-orange-500'>Sarthak</h1>
        </div>
        <div className="md:mx-56 flex-col bg-[#F8F9FA] shadow-lg  rounded-lg">
          <h1 className='text-center w-full text-green-500 p-3 text-4xl font-bold uppercase my-4'>My ToDo's</h1>
          <div className='text-center p-4'>
            <div className='p-4 rounded-md shadow-lg bg-white flex justify-between'>
              <input
                onChange={e => setTask(e.target.value)}
                value={Task}
                autoFocus
                type="text"
                placeholder='Add New ..'
                className='py-2 w-full m-0 border-none outline-none bg-white font-semibold'
              />
              <button onClick={handleAdd} className='bg-green-500 text-white px-6 py-1  rounded-md'>Add</button>
            </div>
            <div className="container my-4">
              <h1 className='text-left font-bold'>Your Todo's</h1>
              <div className="row">
                {Todos && Todos.length > 0 ?
                  Todos.map(item => (
                    <span key={item.id} className=' my-2 flex justify-between'>
                      <span className='flex'>
                        <input
                          onChange={() => handleCheck(item.id)}
                          type="checkbox"
                          checked={item.isDone}
                          className='mx-3 size-5 mt-1'
                        />
                        {editId === item.id ? (
                          <input
                            type="text"
                            value={editTask}
                            onChange={e => setEditTask(e.target.value)}
                            className='border rounded-md py-1 px-2'
                          />
                        ) : (
                          <h1 className={item.isDone ? "line-through" : ""}>{item.Task}</h1>
                        )}
                      </span>
                      <span>
                        {editId === item.id ? (
                          <button onClick={handleSaveEdit} className='mx-3 bg-green-600 px-3 rounded-md text-white text-right'>Save</button>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(item.id)} className='mx-3 bg-blue-600 px-3 rounded-md text-white text-right'>Edit</button>
                            <button onClick={() => confirm("Are you sure?") && handleDelete(item.id)} className='mx-3 bg-red-600 px-3 rounded-md text-white text-right'>Delete</button>
                          </>
                        )}
                      </span>
                    </span>
                  ))
                  :
                  <><h1 className='text-red-600 font-bold text-xl'>Loading</h1></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
