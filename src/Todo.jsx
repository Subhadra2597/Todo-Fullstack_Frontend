import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
//const dotenv= require("dotenv")
let API=import.meta.env.VITE_API_URL
//dotenv.config("./env")
function Todo() {
  const [tasks, setTasks] = useState([])
  const[taskInput,setTaskInput]=useState("")
  const[editId,setEditId]=useState(false)
  const[editedTask,setEditedtask]=useState("")
  const getTask=()=>{
    axios.get(`${API}/task`)
    .then(res=>{
      console.log(res.data)
        setTasks(res.data.taskItems)
    }
    )
  }
  useEffect(()=>{
    getTask()
  },[])

  const changeHandler=(e)=>{
     setTaskInput(e.target.value)

  }

  const deleteTask=(index)=>{
    axios.delete(`${API}/task/task/`+index)
    .then(res=>{
        getTask()

    })
    .catch(err=>{
    console.log(err.response.data.message)
    })
  }

  const formSubmitHandler=(e)=>{
    e.preventDefault()
    axios.post(`${API}/task`,{task:taskInput})
    .then(res=>{
      console.log(taskInput)
      setTaskInput(taskInput)
      getTask()
    })
    .catch(()=>{
      console.log("Error")
    })
    
  }
  const saveChanges=()=>{
    axios.put(`${API}/task/edit-task/${editId}`,{task:editedTask})
    .then(res=>{
      setEditId()
      console.log(editedTask)
      getTask()
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <>
    <h1>Todo</h1>
    
    <form onSubmit={formSubmitHandler}>
      <input  type="text" value={taskInput} onChange={changeHandler}/>
      <button >Add Task</button>
      <p>{taskInput}</p>
        </form>
      <ul>
        {
          tasks.map((task,index)=>{
            return(

              <li key={index}>{editId==task._id
                ?<>
                <input type="text" defaultValue={editedTask} onChange={(e)=>{setEditedtask(e.target.value)}}/>
                <button onClick={saveChanges}>Save</button>
                </>
                :<>
               {task.task}
               <button onClick={()=>{
                setEditId(task._id)
                setEditedtask(task.task)
                }}>Edit</button>
               <button onClick={()=>{deleteTask(task._id)}}>Delete</button>
               </>
               }
              </li>
                  )
                
                            }
                  )
        }
      </ul><p>{editId}</p>
        

    </>
  )
}

export default Todo
