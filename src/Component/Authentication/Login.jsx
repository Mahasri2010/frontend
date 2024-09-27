import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const Login = ({setValidUser}) => {

const navigate = useNavigate()
    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[error,setError]=useState('')

    const Submit = event =>{
        event.preventDefault()

        const data = {
          username:username,
          password:password
        }

        axios.post('http://127.0.0.1:4000/user/validate/',data)
        .then(response=>{
          console.log(response.data)

          localStorage.setItem("Bearer",response.data.access_token)
          localStorage.setItem("Refresh",response.data.refresh_token)
          localStorage.setItem("valid_user", true)

          if(response.data.status === false) setError(response.data.message)
            else navigate('/laptop/')
          setValidUser(true)
        })
      .catch(error=>console.log(error))

    }

    useEffect(()=>{

      const fetchToken = async () =>{

        const refresh_token = localStorage.getItem("Refresh")

        axios.post('http://127.0.0.1:4000/user/token/',{refresh_token:refresh_token})
        .then(response=>{
          localStorage.setItem('Bearer',response.data.access_token)
        })
        .catch(error=>console.log(error))
      }

      fetchToken()

      setInterval(fetchToken,29000)
      
    },[])



  return (
    <div>
        <form className='form'>
            <h1 className='text-center'>Login</h1>
            
            <label htmlFor="">UserName</label>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} className='form-control' />
            <p style={{color:'red'}}>{error}</p>
            <label htmlFor="">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)}  className='form-control' />
           

            <input type="submit" className='btn btn-primary form-control my-3'onClick={Submit} />
        </form>
    </div>
  )
}

export default Login