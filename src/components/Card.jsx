import React, { useEffect } from 'react'
import { useState } from 'react'
import './Card.css'
import { v4 as uuidv4 } from 'uuid';
import { IoMdAdd } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const Card = ({theme}) => {

    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    
    
    useEffect(() => {
        const todoString = localStorage.getItem("todos");
        if (todoString) {
                const savedTodos = JSON.parse(todoString);
                setTodos(savedTodos);  
        }
    }, []);

    const saveToLS =(newTodos)=>{
        localStorage.setItem("todos", JSON.stringify(newTodos))
    }

    const handleChange = (e) => {
        setTodo(e.target.value)
    }
    const handleAdd = () => {
        const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
        setTodos(newTodos)
        setTodo("")
        saveToLS(newTodos)
    }
    const handleDone = (id) => {
        const newTodos = todos.map(item =>
            item.id === id ? { ...item, isCompleted: true } : item
        )
        setTodos(newTodos)
        saveToLS(newTodos)
    }
    const handleDelete = (id) => {
        const newTodos= todos.filter(item => item.id !== id)
        setTodos(newTodos)
        saveToLS(newTodos)
    }


    


    const pendingTasks = todos.filter(task => !task.isCompleted);
    const completedTasks = todos.filter(task => task.isCompleted);
    

    return (
        
        <div className={`container my-7 mx-auto flex justify-center min-h-[80vh] ${theme}`}>
            {/* first responsive change */}
            <div className="card w-full sm:w-3/4 lg:w-1/2 p-3 sm:p-5   "> 
                <h1 className='text-white text-xl font-bold m-2'>Add a Todo </h1>
                <div className="mainInput flex justify-between">
                    <input onChange={handleChange} value={todo} className='w-5/6 p-2  ' type="text" placeholder='Add a new task' onKeyPress={e => e.key === 'Enter' && handleAdd()}/>
                    <button onClick={handleAdd} className="icon flex justify-center items-center"><IoMdAdd size={35} style={{ color: "white" }} /></button>
                </div>

                {/* Pending Tasks */}

                <h1 className='text-white text-xl font-bold m-2'>Task Todo - ({pendingTasks.length})</h1>
                {pendingTasks.length > 0 ? (
                pendingTasks.map(task => {

                    return <div key={task.id} className="current  flex justify-between py-2 gap-2">


                        <div className="texts w-5/6 p-2  rounded">{task.todo}</div>
                        <div className="buttons flex gap-2 sm:gap-6">
                            <button name={todo.id} onClick={() => handleDone(task.id)} ><FaCheck size={25} /></button>
                            <button onClick={() => handleDelete(task.id)} ><MdDeleteOutline size={25} /></button>
                        </div>
                    </div>
                })
            ) : (
                <p className="text-gray-400 m-2">No tasks to do</p>
            )}
                 {/* Completed Tasks */}
                 
                    <h2 className="text-white text-xl font-bold m-2">
                        Completed Tasks - ({completedTasks.length})
                    </h2>
                    {completedTasks.length > 0 ? (
                        completedTasks.map(task => (
                            <div key={task.id} className= {` flex items-center justify-between rounded py-2 `} >
                                <div className="completed text-white line-through w-5/6 p-2  rounded">{task.todo}</div>
                                <div className="flex gap-2">
                                    
                                    <button 
                                        onClick={() => handleDelete(task.id)}
                                        className="text-red-400 hover:text-red-300"
                                        title="Delete"
                                    >
                                        <MdDeleteOutline size={25} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 m-2">No completed tasks</p>
                    )}
                   
            </div>
        </div>

    
    )
}

export default Card
