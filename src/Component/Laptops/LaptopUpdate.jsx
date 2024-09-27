import axios from 'axios'
import React, {useState, useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'

const LaptopUpdate = () => {

    const nav = useNavigate()
    const params = useParams()
    const {id} = params


    const[lap_brand,setLapBrand]=useState('')
    const[lap_model,setModel]=useState('')
    const[lap_price,setPrice]=useState('')
    const[lap_os,setOs]=useState('')

    const Submit = event =>{
        event.preventDefault()

        const lap={
            brand:lap_brand,
            model:lap_model,
            price:lap_price,
            os:lap_os
        }

        axios.patch(`http://127.0.0.1:4000/lapdatas/update/${id}`,lap)
        .then(response=>
            {
            response.data
            nav('/')
        })
        .catch(error=>console.log(error))
    }

    useEffect(()=>{
        axios.get(`http://127.0.0.1:4000/lapdatas/${id}`)
        .then(response=>{
            console.log(response.data)
        setLapBrand(response.data.brand)
        setModel(response.data.model)
        setPrice(response.data.price)
        setOs(response.data.os)
    })
    
    .catch(error=>console.log(error))
},[])

  return (

    <div>
        <div className='container'>
            <h1 className='text-center'>Update Data</h1>
            <button className='container-fluids btn btn-secondary float-end' onClick={()=>nav('/laptop/')}>Back</button> <br />
        </div>

        <form className='form'>
            <label>Brand_Name</label>
            <input className='form-control' type="text" value={lap_brand} onChange={(event)=>setLapBrand(event.target.value)} />
            
            <label> Model</label>
            <input className='form-control' type="text" value={lap_model} onChange={(event)=>setModel(event.target.value)} />
            
            <label>Price</label>
            <input className='form-control' type="text" value={lap_price} onChange={(event)=>setPrice(event.target.value)} />
           
            
            <label>Os</label>
            <input className='form-control' type="text" value={lap_os} onChange={(event)=>setOs(event.target.value)} />

            <input type="submit" className='container-fluids form-control btn btn-primary my-2' onClick={(event)=>Submit(event)} />

        </form>
     



    </div>
  )
}

export default LaptopUpdate