import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const PayList = () => {

    const[dealer,setDealer]=useState([])
    const[bill,setBill]=useState([])
    const[pay,setPay]=useState([])


const result = bill.length > 0 && bill.map((pay,index)=>{
    const deal = dealer.find(d=>d._id === pay.dealers)
    return(
        <div key={index}>
            <tr>
                <td>{index+1}</td>
                <td>{deal?deal.customer_name:'-'}</td>
                <td>{}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

        </div>

    )
})

    useEffect(()=>{
        axios.get('http://127.0.0.1/customer/all/')
        .then(response=>{
            console.log(response.data,"dealers")
            setDealer(response.data)
        })
        .catch(error=>console.log(error))

        axios.get('http://127.0.0.1/bill/all/')
        .then(response=>{
            console.log(response.data,"bill")
            setBill(response.data)
        })
        .catch(error=>console.log(error))

        axios.get('http://127.0.0.1/bill/all/')
        .then(response=>{
            console.log(response.data,"payment")
            setPay(response.data)
        })
        .catch(error=>console.log(error))

    },[])

    return (

        <div>
             
            <div>
                <h1 className='text-center'>Payment Lists</h1>
            </div>

            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Dealer's</th>
                            <th>Total Purchase</th>
                            <th>Paid</th>
                            <th>Balance</th>
                            <th>View</th>
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

export default PayList