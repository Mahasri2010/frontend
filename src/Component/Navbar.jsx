import React from 'react'
import { NavLink ,useNavigate } from 'react-router-dom'
import axios from 'axios'


const Navbar = ({setValidUser}) => {

  const navigate = useNavigate()

  const Logout = () =>{

    const data={
      refresh_token:localStorage.getItem("Refresh")
    }

    axios.post('http://127.0.0.1:4000/user/logout/',data)
    .then(response=>{
      localStorage.clear()
      navigate('/')
      setValidUser(false)
    })
    .catch(error=>console.log(error))
  }

  return (
    <div>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">


              <li className="nav-item">
                <NavLink className="nav-link" to={'/laptop/'}> Laptop </NavLink>
              </li>


              <li className="nav-item">
                <NavLink className="nav-link" to={'/list'}>BillList</NavLink>
              </li>


              <li className="nav-item">
                <NavLink className="nav-link" to={'/pay/'}> Payment </NavLink>
              </li>


              <li className="nav-item">
                <NavLink className="nav-link" to={'/customer/list'}> Customer  </NavLink>
              </li>


              <li className="nav-item">
                <NavLink className="nav-link" to={'/cato'}> Category</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to={'/stock/'}> Stock  </NavLink>
              </li>

              
           
              
              
              <li className="nav-item">
                <NavLink className="nav-link" to={'/'}></NavLink>
                <button className='btn btn-secondary' onClick={Logout}>LogOut</button>
              </li>


            </ul>
          </div>
        </div>
      </nav>


    </div>
  )
}

export default Navbar