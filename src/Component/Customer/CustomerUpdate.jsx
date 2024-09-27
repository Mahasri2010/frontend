import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CustomerUpdate = () => {

    const nav = useNavigate()
    const params = useParams()
    const { id } = params

    const [company, setCompany] = useState('')
    const [name, setName] = useState('')
    const [phno, setPhno] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')



    const SubmitHandler = event => {
        event.preventDefault()

        const data = {
            company_name: company,
            customer_name: name,
            customer_phno: phno,
            customer_email: email,
            customer_address: address
        }
        axios.patch(`http://127.0.0.1:4000/customer/update/${id}`, data)
            .then(response => console.log(response.data))
            .catch(error => console.log(error))
        nav('/customer/list/')
    }

    useEffect(() => {
        axios.get(`http://127.0.0.1:4000/customer/${id}`)
            .then(response => {
                console.log(response.data)
                setCompany(response.data.company_name)
                setName(response.data.customer_name)
                setPhno(response.data.customer_phno)
                setEmail(response.data.customer_email)
                setAddress(response.data.customer_address)
            })

            .catch(error => console.log(error))
    }, [])



    return (
        <div>
            <div>
                <h1 className='text-center'> Customer Update</h1>
                <button className='container-fluids btn btn-secondary float-end' onClick={() => nav('/customer/')}> Back </button> <br />
            </div>


            <form className='form'>

                <label htmlFor="">Company Name :</label>
                <input type="text" className='form-control' value={company} onChange={event => setCompany(event.target.value)} />
                
                <label htmlFor="">Customer Name :</label>
                <input type="text" className='form-control' value={name} onChange={event => setName(event.target.value)} />

                <label htmlFor="">Phone No :</label>
                <input type="number" className='form-control' value={phno} onChange={event => setPhno(event.target.value)} />

                <label htmlFor="">Email :</label>
                <input type="text" className='form-control' value={email} onChange={event => setEmail(event.target.value)} />

                <label htmlFor="">Address :</label>
                <input type="textarea" className='form-control' value={address} onChange={event => setAddress(event.target.value)} />

                <input type="submit" className='container-fluids form-control btn btn-primary my-2' onClick={event => SubmitHandler(event)} />
            </form>


        </div>
    )
}

export default CustomerUpdate