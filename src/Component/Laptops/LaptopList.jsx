import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const LaptopList = () => {


    // const headers = {
    //     'Content-Type' :'application/json',
    //     'Authorization':`Bearer ${localStorage.getItem('Bearer')}`
    // }

    const nav = useNavigate()
    const [select, setSelect] = useState(0)

    const [laptop, setLaptop] = useState([])
    const [lapcategory, setLapcategory] = useState([])
    const[stock,setStock]=useState([])

    useEffect(() => {

        // console.log(headers, "headers")

    
        axios.get('http://127.0.0.1:4000/lapdatas/all/')
            .then(response => {
                console.log(response.data,"laptop")
                setLaptop(response.data)
            })
            .catch(error => console.log(error));

            axios.get('http://127.0.0.1:4000/category/all/')
            .then(response => {
                console.log(response.data,"category")
                setLapcategory(response.data)
            })
            .catch(error => console.log(error));
    }, [])



    useEffect(() => {

        axios.get('http://127.0.0.1:4000/stock/all/')
            .then(response => {
                console.log(response.data,"stock")
                setStock(response.data)
            })
            .catch(error => console.log(error));
    }, [])


    const result = laptop.map((d, index) => {
        const cato = lapcategory.find(cato => cato._id === d.cato_reference)
        // console.log(cato)
        return (

            <tr key={d._id}>
                <td>{index + 1}</td>
                <td>{d.brand}</td>
                <td>{cato ? cato.category : "not defined"}</td>
                <td>{d.model}</td>
                <td>{d.price}</td>
                <td>{d.os}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => nav(`/laptop/update/${d._id}/`)} >Update</button>
                </td>
                <td>
                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setSelect(d)}>Delete</button>
                </td>
            </tr>
        )
    })


    const DeleteHandler = () => {
        axios.delete(`http://127.0.0.1:4000/lapdatas/delete/${select._id}/`)
            .then(response => {
                console.log(response.data);
                // Remove the deleted item from the local state
                let duplicate = [...laptop];
                duplicate.splice(laptop.findIndex(stu => stu._id === select._id), 1);
                setLaptop(duplicate);
            })
            .catch(error => console.log(error));

            
            let result =[]

            if(stock.length>0)
            {
               result = stock.find(st =>st.laptop === select._id)
                   
               console.log(result,"stock delete")
               
            }

            
            axios.delete(`http://127.0.0.1:4000/stock/${result._id}/`)
            .then(response => {

                console.log(response.data)

             navigate('/laptop/')

            })
            .catch(error => console.log(error));
    }

    return (

        <div>
        
            <div className='container'>
                <h1 className='text-center'>Laptop Lists</h1>
                <button className='container-fluids btn btn-primary float-end' onClick={() => nav('/laptop/add/')}>+Add new laptop</button>

            </div>

            <table className='table'>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Brand Name</th>
                        <th>Category</th>
                        <th>Model NO</th>
                        <th>Price</th>
                        <th>Os</th>
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
                            <p>Are you sure you want to delete {select.brand} ?</p>
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

export default LaptopList