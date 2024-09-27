import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CustomerList = () => {



    const nav = useNavigate()
    const [select, setSelect] = useState(0)
    const [alldata, setAlldata] = useState([])

    const DeleteHandler = () => {
        axios.delete(`http://127.0.0.1:4000/customer/delete/${select._id}/`)
            .then(response => {
                console.log(response.data);
                // Remove the deleted item from the local state
                let duplicate = [...alldata];
                duplicate.splice(alldata.findIndex(stu => stu._id === select._id), 1);
                setAlldata(duplicate);
            })
            .catch(error => console.log(error));
    }



    let result = alldata.map((c, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{c.company_name}</td>
                <td>{c.customer_name}</td>
                <td>{c.customer_phno}</td>
                <td>{c.customer_email}</td>
                <td>{c.customer_address}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => nav(`/customer/${c._id}/`)}>Update</button>
                </td>
                <td>
                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setSelect(c)}>Delete</button>

                </td>
            </tr>
        )

    })

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/customer/all/')
            .then(response => {
                console.log("first")
                console.log(response.data)
                setAlldata(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <div>
                <h1 className='text-center'>Customers Lists</h1>
                <button className='container-fluids btn btn-primary float-end' onClick={() => nav('/customer/')}> + new customer</button>

            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Company Name</th>
                        <th>Customer Name</th>
                        <th>Phone No</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Update</th>
                        <th>Delete</th>
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
                            <p>Are you sure you want to delete {select.customer_name} ?</p>
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

export default CustomerList