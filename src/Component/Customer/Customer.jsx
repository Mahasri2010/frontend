import axios from 'axios'
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Customer = () => {

    const nav = useNavigate()


    const [company, setCompany] = useState('')
    const [name, setName] = useState('')
    const [phno, setPhno] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

  

    const SubmitHandler = event => {
        event.preventDefault()

        const data = {
            company_name:company,
            customer_name: name,
            customer_phno: phno,
            customer_email: email,
            customer_address: address
        }
        axios.post('http://127.0.0.1:4000/customer/add/', data)
            .then(response => nav('/customer/list/'))
            .catch(error => console.log(error))
            
   
    }



    return (
        <div>
            <div>
                <h1 className='text-center'>Customer Details</h1>
                <button className='container-fluids btn btn-secondary float-end' onClick={()=>nav('/customer/list/')}>Back</button>

                <form className='form' >

                    
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

                    <input type="submit" className='form-control btn btn-primary my-2' onClick={event => SubmitHandler(event)} />
                </form>
            </div>

          



        </div>
    )
}

export default Customer