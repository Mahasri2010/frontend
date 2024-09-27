import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const BillList = () => {

    const nav = useNavigate()
    const[billdata,setBilldata]=useState([])
    const[select,setSelect] = useState(0)

    const [customer, setCustomer] = useState([])
    // const[dealers,setDealers]=('')

    useEffect(() => {

        axios.get('http://127.0.0.1:4000/bill/all/')
            .then(response => {
                console.log(response.data,"bill")
                setBilldata(response.data)
            })
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/customer/all/')
            .then(response => { console.log(response.data,"customer")
                setCustomer(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const result =billdata.length > 0 ?  billdata.map((bill,index)=>{

        let cust = customer.find(c=>c._id === bill.bill_data.dealers)

       return(
        <tr key={bill.bill_data._id}>
            <td>{index+1}</td>
            <td>{bill.bill_data.bill_number}</td>
            <td>{bill.bill_data.bill_date}</td>
            <td>{cust?cust.customer_name:"-"}</td>
            <td>{bill.bill_data.bill_amount}</td>
            <td>
                <button className='btn btn-info' onClick={()=>nav(`/view/${bill.bill_data._id}`)} >View</button>
            </td>
            <td>
                <button className='btn btn-warning' onClick={()=>nav(`/bill/update/${bill.bill_data._id}`)}>Update</button>
            </td>
            <td>
                <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>setSelect(bill.bill_data)}>Delete</button>
            </td>

        </tr>
       )
    }) : <tr>
        <td colSpan={16}>No data found</td>
    </tr>
           


    const DeleteHandler = () => {

        
        axios.delete(`http://127.0.0.1:4000/bill/${select._id}/`)
            .then(response => {
                console.log(response.data);
                // Remove the deleted item from the local state
                let duplicate_billdata = [...billdata];
                duplicate_billdata.splice(billdata.findIndex(b => b.bill_data._id === select._id), 1);
                setBilldata(duplicate_billdata);
            })
            .catch(error => console.log(error));
    };



  return (

    <div>
    

        <div className='container'>
                <h1 className='text-center'>Bill Details</h1>
                <button className='container-fluids btn btn-primary float-end' onClick={() => nav('/bill')}>+Add Bill</button>

        </div>

        <table className='table'>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Bill No</th>
                    <th>Bill Date</th>
                    <th>Dealer's Name</th>
                    <th>Total Amount</th>
                    <th>View</th>
                    <th>Update</th>
                    <th> Delete </th>
                  
                </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>

            </table>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Remove Data ?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                             <p>Are you sure you want to delete {select.bill_number} ?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={DeleteHandler}>Delete</button>
                        </div>
                    </div>
                </div>
            </div> 


    </div>
  )
}

export default BillList