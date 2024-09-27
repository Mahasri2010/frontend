import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Category = () => {

    const [category, setCategory] = useState('')
    const [all_data, setAlldata] = useState([])
   

    const Submit = event => {
        event.preventDefault()

        const data = {
            category: category
        }

        axios.post('http://127.0.0.1:4000/category/add/', data)
            .then(response => {
                console.log(response.data)
                // setAlldata(prevData=>[...prevData,response.data])
                // let duplicate = [...all_data]
                // duplicate.splice(duplicate._id,1)
                // setAlldata(duplicate)
            })
            .catch(error => console.log(error))
            setCategory('')
        
    }

    let result = all_data.map((category, index) => {
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{category.category}</td>
            <td>
             <input type="button" className='btn btn-danger' value={'X'} onClick={() => DeleteLaptops(category)} />
            </td>
          </tr>
        )

    })

    const DeleteLaptops = (category) =>{
       
        axios.delete(`http://127.0.0.1:4000/category/delete/${category._id}`)
        .then(response=>{
            console.log(response.data)
            let duplicate = [...all_data]
            duplicate.splice(all_data.findIndex(cato => cato._id === category._id), 1);
            setAlldata(duplicate)
        })
        .catch(error=>console.log(error))
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/category/all/')
            .then(response => {
                console.log(response.data)
                setAlldata(response.data)
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div>
            
            <div className='text-center' >
                <h1>New Catogory</h1>
                <input type="text" value={category} onChange={(event) => setCategory(event.target.value)} /> &nbsp; &nbsp;
                <input type="submit" className='container-fluids btn btn-primary my-2' onClick={event => Submit(event)} />
            </div>

            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Categories</th>
                            <th>Delete</th>
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

export default Category