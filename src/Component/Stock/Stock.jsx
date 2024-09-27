import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Stock = () => {

  const navigate = useNavigate()

  const [lap, setLap] = useState([])
  
  const[stock,setStock]=useState([])

//   const headers = {
//     'Content-Type' :'application/json',
//     'Authorization':`Bearer ${localStorage.getItem('Bearer')}`
// }

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/lapdatas/all/')
      .then(response => {
        console.log(response.data)
        setLap(response.data)
      })
      .catch(error => console.log(error))
  },[])

  useEffect(()=>{
    axios.get('http://127.0.0.1:4000/stock/all/')
    .then(response=>{
     console.log(response.data) 
     setStock(response.data)
    })
    .catch(error=>console.log(error))
  },[])

  const result = lap.map((lap, index) => {
   for(let s of stock){
    if( lap._id === s.laptop){
      return (
        <tr key={lap._id}>
          <td>{index + 1}</td>
          <td>{lap.brand}</td>
          <td>{lap.model}</td>
          <td>{s.stock}</td>
          <td>
          <button className='container-fluids btn btn-primary ' onClick={()=>navigate(`/stock/add/${s._id}`)}> Add Stock</button>
          </td>
        </tr>
      )
      
    }
   }

  })


  return (
    <div>
        {/* { ((valid_user === true) || (localStorage.getItem('valid_user') === true))  &&  <Navbar setValidUser={setValidUser}></Navbar>  */}
      <div>
        <h1 className='text-center'>Stock Lists</h1>
      </div>

      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Laptop Brand</th>
              <th>Laptop Model</th>
              <th>Stock</th>
              <th>Add Stock</th>
            </tr>
          </thead>
          <tbody>
            {result}
          </tbody>
        </table>

      </div>

    </div>
  )
}

export default Stock