import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'


const StudentList = () => {


  const navigate = useNavigate()
  const [select, setSelect] = useState(0)



  const [marks, setMarks] = useState('')

  useEffect(() => {
    axios.get('http://127.0.0.1:4000/marks/all/')
      .then(response => {
        console.log(response.data)
        setMarks(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  let result = marks.length > 0 ? marks.map((data, index) => {
    return (
      <tr key={data._id}>
        <td>{index + 1}</td>
        <td>{data.studentname}</td>
        <td>{data.studentroll}</td>
        <td>{data.studentage}</td>
        <td>{data.cls}</td>
        <td>{data.exam}</td>
        <td>{data.tamil}</td>
        <td>{data.english}</td>
        <td>{data.maths}</td>
        <td>{data.science}</td>
        <td>{data.social}</td>
        <td>{data.total}</td>
        <td>{data.average}</td>
        <td>{data.result}</td>
        <td>{data.grade}</td>
        <td>
          <button className='btn btn-warning' onClick={() => navigate(`/update/${data._id}/`)}>Update</button>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => setSelect(data)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
        </td>
      </tr>
    )

  }) :

    <tr><td colSpan={15} className='text-center'>No data found</td></tr>



  // const DeleteHandler = () => {

  //   axios.delete(`http://127.0.0.1:4000/marks/delete/${select._id}/`)
  //     .then(response => {
  //       console.log(response.data)
  //       let duplicate = [...marks]
  //       duplicate.splice(marks.findIndex(stu => stu._id === select._id), 1)
  //       setMarks(duplicate)
  //     })

  // }

  const DeleteHandler = () => {
    axios.delete(`http://127.0.0.1:4000/marks/delete/${select._id}/`)
        .then(response => {
            console.log(response.data);
            // Remove the deleted item from the local state
            let duplicate = [...marks];
            duplicate.splice(marks.findIndex(stu => stu._id === select._id), 1);
            setMarks(duplicate);
        })
        .catch(error => console.log(error));
};




  return (


    <div>
      <div className='container'>
        <h1 className='text-center'>Student Marklist</h1>
        <button className='container-fluids btn btn-primary float-end' onClick={() => navigate('/add')}>+ Add New Student</button>
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Student Name</th>
            <th>Student RollNo</th>
            <th>Age</th>
            <th>Class</th>
            <th>Exam</th>
            <th>Tamil</th>
            <th>English</th>
            <th>Maths</th>
            <th>Science</th>
            <th>Social</th>
            <th>Total</th>
            <th>Average</th>
            <th>Result</th>
            <th>Grade</th>
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
              <p>Are you sure you want to delete {select.studentname} ?</p>
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

export default StudentList