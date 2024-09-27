import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const BillUpdate = () => {

  const nav = useNavigate()
  const params = useParams()
  const { id } = params

  const [bill_number, setBillNumber] = useState('')
  const [bill_date, setBillDate] = useState('')
  const [dealers, setDealers] = useState('')

  const [parentbill, setParentbill] = useState({})
  const [childbill, setChildbill] = useState({})
  const [laptop_data, setLaptopData] = useState([])
  const [customer_data, setCustomerData] = useState([])
  // const [category, setCategory] = useState([])
  const[stock,setStock]=useState([])




  const laptops = laptop_data.length > 0 && laptop_data.map((lap, index) => {
    return (
      <option key={index} value={lap._id}>{lap.brand}</option>
    )
  })

  // const dealer = customer_data.length > 0 && dealers.map((d, index) => {
  //   return (
  //     <option key={index} value={d._id}>{d.customer_name}</option>
  //   )
  // })
  // console.log(dealers, "dealers")

  const stc = childbill.length > 0 && childbill.map((prd,index)=>{
    for(let s of stock){
      if(s.stock === prd.quantity) <p style={{color:"red"}}> decrease your quantity!! </p>
    }
  }) 





  const result = childbill.length > 0 && childbill.map((lap, index) => {
    return (
      <div className='laptop' key={index} style={{ backgroundColor: lap.delete === true && "lightpink" }}>

        <label htmlFor="">Laptop: </label> <br />
        <select value={lap.laptop_reference} onChange={event => UpdateLaptops(event, index, 'id')}>
          <option value=""  >select a option</option>
          {laptops}
        </select> <br />



        <label htmlFor="">Quantity:</label><br />
        <input type="number" value={lap.quantity} onChange={event => UpdateLaptops(event, index, "quantity")} /> <br />
        {stc}

        <label htmlFor="">Gst:</label> <br />
        {/*  className='form-control'  style={{width:'30%',alignItems:'center'}} value={lap.gst} */}
        <input type="number" value={lap.gst} onChange={event => UpdateLaptops(event, index, 'gst')} /> &nbsp;

        <input type="button" className='btn btn-danger' value={'X'} onClick={event => DeleteLaptops(event, index)} />


      </div>
    )
  })

  const AddNewLaptop = event => {
    event.preventDefault()

    const new_laptop_object = {
      laptop_reference: "",
      quantity: 0,
      gst: 0,
      existing: false,
      new: true,
      update: false,
      delete: false
    }

    setChildbill([...childbill, new_laptop_object])

  }

  const UpdateLaptops = (event, index, field) => {

    const laptop_list_duplicate = [...childbill]

    switch (field) {
      case "id":

        laptop_list_duplicate[index].laptop_reference = event.target.value
        break

      case "quantity":

        laptop_list_duplicate[index].quantity = event.target.value
        break

      case "gst":

        laptop_list_duplicate[index].gst = event.target.value
        break
    }
    if (laptop_list_duplicate[index].existing === true)
      laptop_list_duplicate[index].update = true


    setChildbill(laptop_list_duplicate)

  }

  const DeleteLaptops = (event, index) => {

    const laptop_list_duplicate = [...childbill]

    if (laptop_list_duplicate[index].existing === true) {
      laptop_list_duplicate[index].delete = true
      laptop_list_duplicate[index].update = false
    }
    else {
      laptop_list_duplicate.splice(index, 1)
    }
    setChildbill(laptop_list_duplicate)

  }


  const UpdateBill = event => {
    event.preventDefault()

    const bill = [
      {
        bill_number: bill_number,
        bill_date: bill_date,
        dealers: dealers
      },
      childbill
    ]

    axios.patch(`http://127.0.0.1:4000/bill/${id}/`, bill)
      .then(response => {
        response.data
        nav('/list')
      })
      .catch(error => console.log(error))
  }


  useEffect(() => {

    axios.get(`http://127.0.0.1:4000/bill/${id}`)
      .then(response => {

        console.log(response.data, "total")

        setBillNumber(response.data.bill_data.bill_number)

        setBillDate(response.data.bill_data.bill_date)

        setDealers(response.data.bill_data.dealers)

        setParentbill(response.data.bill_data)

        const existing_data = []

        for (let product of response.data.product_data) {

          product.existing = true,
            product.new = false,
            product.update = false,
            product.delete = false

          existing_data.push(product)
        }

        setChildbill(response.data.product_data)
      })
      .catch(error => console.log(error))


    axios.get('http://127.0.0.1:4000/lapdatas/all/')
      .then(response => {

        setLaptopData(response.data)
      })
      .catch(error => console.log(error))

      if(customer_data.length>0) {
        axios.get(`http://127.0.0.1:4000/customer/all/`)
        .then(response => {
          console.log(response.data, "customer")
          setCustomerData(response.data.customer_name)
        })
        .catch(error => console.log(error))
      }
  }, [])

  // useEffect(()=>{
  //   axios.get('http://127.0.0.1/stock/all/')
  //   .then(response=>{
  //     console.log(response.data,"stock")
  //     setStock(response.data)
  //   })
  //   .catch(error=>console.log(error))
  // },[])






  return (

    <div>
      <div className='container'>

        <h1 className='text-center'> Update Bill</h1>

        <button className='btn btn-secondary float-end' onClick={() => nav('/list')}>Back</button>

      </div>

      <div className='container'>
        <form className='form'>
          <label htmlFor="">Bill  Number</label>
          <input type="text" className='form-control' value={bill_number} onChange={event => setBillNumber(event.target.value)} />

          <label htmlFor="">Bill  Date</label>
          <input type="date" className='form-control' value={bill_date} onChange={event => setBillDate(event.target.value)} /> <br />

{/* 
          <label htmlFor="">Dealers</label>
          <select className='form-control' value={dealers} onChange={event => setDealers(event.target.value)}>
            <option value=""  >select a option</option>
            {dealer}
          </select> <br /> */}




          <div>
            <button className='btn btn-info float-end' onClick={event => AddNewLaptop(event)}>Add Laptop</button>
          </div> <br /> <br />

          {result} <br />

          <input type="submit" className=' form-control btn btn-primary ' onClick={event => UpdateBill(event)} />

        </form>

      </div>

    </div>
  )
}

export default BillUpdate