import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const LaptopAdd = () => {

    const navigate = useNavigate()

    const [lap_brand, setLapBrand] = useState('')

    const [lap_model, setModel] = useState('')

    const [lap_price, setPrice] = useState('')

    const [lap_os, setOs] = useState('')

    const [lap_cato, setCato] = useState('')

    const [lapcategory, setLapcategory] = useState([])

    const Submit = event => {
        event.preventDefault()

        const lap = {
            brand: lap_brand,
            model: lap_model,
            price: lap_price,
            cato_reference: lap_cato,
            os: lap_os
        }

        axios.post('http://127.0.0.1:4000/lapdatas/add/', lap)
            .then(response => {

                console.log(response.data._id, "lapid")

                const laptopId = response.data._id

                const stockdata = {

                    laptop: laptopId,
                    stock: 0

                }

                axios.post('http://127.0.0.1:4000/stock/add/', stockdata)
                    .then(response => {

                        console.log(response.data, "stockdata")
                        navigate('/laptop/')

                    })

                    .catch(error => console.log(error))

            })
    }

    const cato = lapcategory.map((cato, index) => {
        return (
            <option key={index} value={cato._id}>{cato.category}</option>
        )

    })

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/category/all/')
            .then(response => {
                setLapcategory(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    return (

        <div>
            <div className='container'>
                <h1 className='text-center'>New Data</h1>
                <br />
                <button className='container-fluids btn btn-secondary float-end' onClick={() => navigate('/laptop/')}>Back</button> <br />
                <br />
            </div>

            <form className='form row'>
                <div className='col-12 col-sm-12 col-md-6 '>
                    <div className='form-group'>
                        <label >Brand_Name</label>
                        <input className='form-control' type="text" value={lap_brand} onChange={(event) => setLapBrand(event.target.value)} />
                    </div>
                </div>

                <div className='col-12 col-sm-12 col-md-6'>
                    <div className='form-group'>
                        <label> Model</label>
                        <input className='form-control' type="text" value={lap_model} onChange={(event) => setModel(event.target.value)} />
                    </div>
                </div>

                <div className='col-12 col-sm-12 col-md-6 '>
                    <div className='form-group'> *
                        <label>Price</label>
                        <input className='form-control' type="text" value={lap_price} onChange={(event) => setPrice(event.target.value)} />
                    </div>
                </div>

                <div className='col-12 col-sm-12 col-md-6 '>
                    <div className='form-group'>
                        <label htmlFor="">Category:</label>
                        <select className='form-control' onChange={(event) => setCato(event.target.value)}>
                            <option value=""  >select a option</option>
                            {cato}
                        </select>
                    </div>
                </div>

                <div className='col-12 col-sm-12 col-md-6 '>
                    <div className="form-group">
                        <label>Os</label>
                        <input className='form-control' type="text" value={lap_os} onChange={(event) => setOs(event.target.value)} />
                    </div>
                </div>


                <div className='col-12 col-sm-12 col-md-6 '>
                    <input type="submit" className='form-control btn btn-primary my-2' onClick={(event) => Submit(event)} />
                </div>

            </form>


        </div>
    )
}

export default LaptopAdd