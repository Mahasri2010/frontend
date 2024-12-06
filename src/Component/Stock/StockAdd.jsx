import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const StockAdd = () => {

  const params = useParams()

  const { id } = params

  const navigate = useNavigate()

  const [stock, setStock] = useState(0)


  const Submit = (event) => {
    event.preventDefault()

    const stock_data = {
      stock: stock
    }
    axios.patch(`http://127.0.0.1:4000/stock/update/${id}/`, stock_data)
      .then(response => {
        console.log(response.data)
        navigate('/stock/')
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:4000/stock/${id}/`)

      .then(response => {

        console.log(response.data.stock)
        setStock(response.data.stock)

      })

      .catch(error => console.log(error))
  }, [])


  return (
    <div>

      <div className='container'>
        <h1 className='text-center'>StockAdd</h1>
        <br />
        <button className='container-fluids btn btn-secondary float-end' onClick={() => navigate('/stock/')}>  Back </button>
        <br />

      </div>

      <form className='row justify-content-center'>
        <div className='col-12 col-md-6'>
          <div className='mb-3'>
            <label htmlFor='stock' className='form-label'>Stock :</label>
            <input type="number" value={stock} onChange={event => setStock(event.target.value)} /> &nbsp;
          </div>

          <input type="submit" className='btn btn-info w-50' onClick={event => Submit(event)} />

        </div>



      </form>


    </div>
  )
}

export default StockAdd