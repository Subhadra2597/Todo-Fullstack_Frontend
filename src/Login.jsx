import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    let api="http://localhost:3000"
    let navigate =useNavigate()
    let[data,setData]=useState({
        email:"",
        password:""
    })
    const changeHandler=(event)=>{
        let tempData={...data}
        tempData[event.target.name]=event.target.value
        setData(tempData)
    }

    const loginHandler=(e)=>{
        e.preventDefault()
        axios.post(`${api}/user/login`,data)
        .then(res=>{
            alert("Loggedin")
            console.log(res.data)
            navigate("/")
            localStorage.setItem("token",res.data.token)
        })
        .catch(err=>{
          console.log(err.response.data.message)
        }
    
        )
        console.log(data)
       }
    
    
    return (
    <>
    <form onSubmit={loginHandler}>

    <input type="email" placeholder="email" name="email"onChange={changeHandler} value={data.email}/><br /><br />
    <input type="password" placeholder="password" name="password" onChange={changeHandler} value={data.password}/>
    <input type="submit" value="submit" />
    </form>
    </>
  )
}

export default Login