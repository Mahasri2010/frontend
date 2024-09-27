import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Payment = () => {

  const params = useParams()

  const { id } = params

  const navigate = useNavigate()

  const [pay, setPay] = useState(0)


  const Submit = (event) => {
    event.preventDefault()

    // const pay_data = {
    //   stock: stock
    // }
    // axios.patch(`http://127.0.0.1:4000/stock/update/${id}/`, pay_data)
    //   .then(response => {
    //     console.log(response.data)
    //     navigate('/stock/')
    //   })
    //   .catch(error => console.log(error))
  }

  // useEffect(() => {
  //   axios.get(`http://127.0.0.1:4000/stock/${id}/`)

  //     .then(response => {

  //       console.log(response.data.stock)
  //       setStock(response.data.stock)

  //     })

  //     .catch(error => console.log(error))
  // },[])


  return (
    <div>

      <div className='container-fluids'>
        <h1 className='text-center'>Payment</h1>
        {/* <button className='container-fluids btn btn-secondary float-end' onClick={() => navigate('/stock/')}>  Back </button> */}
      </div>

      <form style={{ width: '50%', position: 'relative', left: '30%' }}>

        <label> Paid: &nbsp;</label>
        <input type="number" value={pay} onChange={event => setPay(event.target.value)} /> &nbsp;

        <input type="submit" className='btn btn-info' onClick={event => Submit(event)} />

      </form>


    </div>
  )
}

export default Payment