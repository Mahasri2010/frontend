import React, { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LaptopList from './Component/Laptops/LaptopList'
import LaptopAdd from './Component/Laptops/LaptopAdd'
import Navbar from './Component/Navbar'
import LaptopUpdate from './Component/Laptops/LaptopUpdate'
import Bill from './Component/Bill/Bill'
import BillList from './Component/Bill/BillList'
import BillUpdate from './Component/Bill/BillUpdate'
import BillView from './Component/Bill/BillView'
import Category from './Component/Category'
import Customer from './Component/Customer/Customer'
import CustomerUpdate from './Component/Customer/CustomerUpdate'
import CustomerList from './Component/Customer/CustomerList'
import Stock from './Component/Stock/Stock'
import StockAdd from './Component/Stock/StockAdd'
import Login from './Component/Authentication/Login'
import Payment from './Component/Payment/Payment'
import PayList from './Component/Payment/PayList'


const App = () => {


  const [valid_user,setValidUser] = useState(false)

  useEffect(()=>{

    console.log(localStorage.getItem('valid_user'))
    if(localStorage.getItem('valid_user') !== null) setValidUser(true)
  }, [])


  return (
    <div>
  
     {valid_user === true && <Navbar setValidUser={setValidUser} />}
      
      <Routes>

       <Route path='/' element={<Login/>} />
        <Route path='/laptop/' element={<LaptopList />} />
        <Route path='/laptop/add/' element={<LaptopAdd />} />
        <Route path='/laptop/update/:id' element={<LaptopUpdate />} />
        <Route path='cato' element={<Category />} />
        <Route path='/customer/' element={<Customer/>}/>
        <Route path='/customer/:id' element={<CustomerUpdate/>}/>
        <Route path='/customer/list/' element={<CustomerList/>}/>
        <Route path='/stock/' element={<Stock/>} />
        <Route path='/stock/add/:id' element={<StockAdd/>} />
        <Route path='/list' element={<BillList/>} />
        <Route path='/bill' element={<Bill />} />
        <Route path='bill/update/:id' element={<BillUpdate />} />
        <Route path='/view/:id' element={<BillView />} />
        <Route path='/pay/' element={<PayList />} />
        <Route path='/paid/:id' element={<Payment />} />
        
     




        
        {/* <Route path='/student' element={<StudentList />} />
        <Route path='/add' element={<StudentAdd />} />
        <Route path='/bill/update/:id' element={<StudentUpdate />} />  */}
      </Routes>

    </div>
  )
}

export default App