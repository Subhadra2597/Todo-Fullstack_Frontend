import React, { useState } from 'react'
import axios from 'axios'

function Register() {
  let api="http://localhost:3000"

  const[data,setData]=useState({
    email:"",
    username:"",
    password:""
  })
  const changeHandler=(event)=>{
    let tempData={...data}
    tempData[event.target.name]=event.target.value
    setData(tempData)
   }

   const registerHandler=(e)=>{
    e.preventDefault()
    axios.post(`${api}/user/register`,data)
    .then(res=>{
      alert(res.data.message)
    })
    .catch(err=>{
      alert(err.response.data.message)
    }

    )
    console.log(data)
   }

  return (
    <div>
        <form onSubmit={registerHandler}>
            <input type="email" placeholder="email" name="email" onChange={changeHandler} value={data.email}/><br />
            <input type="text" placeholder="username" name="username"onChange={changeHandler} value={data.username}/><br />
            <input type="password" placeholder="password" name="password"onChange={changeHandler} value={data.password}/><br />
            <input type="submit" value = "register" />
        </form>
    </div>
  )
}

export default Register