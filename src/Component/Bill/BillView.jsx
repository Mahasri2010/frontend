import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const View = () => {

    const navigate = useNavigate()

    const params = useParams()

    const { id } = params

    const [parentbill, setParentbill] = useState({

        bill_number: "",
        bill_date: "",
        // dealers: '',
        bill_amount: ""
    })
    const [childbill, setChildbill] = useState([])
    const [lapid, setLapid] = useState([])
    const [customer_id, setCustomerid] = useState('')
    const [customer_data, setCustomerdata] = useState([])


    useEffect(() => {

        axios.get(`http://127.0.0.1:4000/bill/${id}`)

            .then(response => {

                // console.log(response.data.product_data,"product")

                // console.log(response.data.bill_data)

                setParentbill(response.data.bill_data)

                setChildbill(response.data.product_data)
                console.log(response.data.product_data,"child")
                setCustomerid(response.data.bill_data.dealers)
                console.log(response.data.bill_data.dealers,"c")
            })
            .catch(error => console.log(error))

        axios.get(`http://127.0.0.1:4000/lapdatas/all/`)

            .then(response => {

                console.log(response.data, "laptopdata")
                setLapid(response.data)
            })

            .catch(error => console.log(error))

    }, [])


    useEffect(() => {

         if (customer_id.length > 0) {


            axios.get(`http://127.0.0.1:4000/customer/${customer_id}/`)

                .then(response => {

                    // console.log(response.data, "customer")
                    setCustomerdata(response.data)


                })

                .catch(error => console.log(error))
        }



    }, [customer_id])


    let result = childbill.map((data, index) => {
        console.log(childbill,"--")

        let laptop = lapid.find(lap => lap._id === data.laptop_reference)
        console.log(lapid,"lap")


        return (

            <tr key={index}>

                <td>{index + 1}</td>
                <td>{laptop?laptop.brand:"-"}</td>
                <td>{data.quantity}</td>
                <td>{laptop?laptop.price:"-"}</td>
                <td>{data.amount}</td>
                <td>{data.gst}</td>
                <td>{data.gst_amount}</td>
                <td>{data.sub_total}</td>

            </tr>


        )
    })

    return (

        <div>
            <h2 className='text-center'>Bill View</h2> <br />

            <div className='container-fluid'>
                <button className='btn btn-secondary float-end' onClick={() => navigate('/list')}>
                    Back
                </button> <br /> <br />
            </div>

            <div className='container-fluid' >

                <h4>Bill Number: {parentbill.bill_number} </h4>
                <h4> Date: {(parentbill.bill_date).slice(0, 10)} </h4>
                <h4>Bill Amount: {parentbill.bill_amount}</h4>
                <h4>Dealer:{customer_data.customer_name}</h4><br /> <br />

            </div>


            <div className='container-fluid'>
                <table className='table' style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Laptop</th>
                            {/* <th>Category</th> */}
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>amount</th>
                            <th>gst</th>
                            <th>gst_amount</th>
                            <th>subTotal</th>

                        </tr>
                    </thead>

                    <tbody>
                        {result}
                    </tbody>
                </table>
                {/* <h5 className='float-end'>Grand total = ${grand_total}</h5> */}
            </div>

        </div>
    )
}

export default View