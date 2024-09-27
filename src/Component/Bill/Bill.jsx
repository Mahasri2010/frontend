import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const BillAdd = () => {

    const nav = useNavigate()

    const [bill_number, setBillNumber] = useState('')
    const [bill_date, setBillDate] = useState('')

    const [laptop_data, setLaptopData] = useState([])
    const [laptop_list, setLaptopList] = useState([])

    const [dealers, setDealers] = useState([])
    const [stock, setStock] = useState([])
    const [customer, setCustomer] = useState('')
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);





    // const headers = {
    //     'Content-Type' :'application/json',
    //     'Authorization':`Bearer ${localStorage.getItem('Bearer')}`
    // }



    const AddNewLaptop = event => {
        event.preventDefault()

        const new_laptop_object = {
            laptop_reference: "",
            quantity: 0,
            gst: 0
        }

        setLaptopList([...laptop_list, new_laptop_object])

    }

    // const UpdateLaptops = (event, index, field) => {

    //     const laptop_list_duplicate = [...laptop_list]

    //     switch (field) {
    //         case "id":

    //             laptop_list_duplicate[index].laptop_reference = event.target.value
    //             break

    //         case "quantity":
    //             const selectedLaptop = stock.find(sto => sto.laptop === laptop_reference);

    //             if (selectedLaptop) {
    //                 const availableStock = selectedLaptop.stock;

    //                 // If-else condition for alert
    //                 if (Number(event.target.value) > availableStock) {
    //                     // Alert for quantity exceeding stock
    //                     alert(`Quantity exceeds available stock. Available stock: ${availableStock}`);
    //                     laptop_list_duplicate[index].quantity = availableStock; // Optional: Set to max available stock
    //                 } else if (Number(event.target.value) <= 0) {
    //                     // Alert for invalid quantity (e.g., less than or equal to zero)
    //                     alert('Quantity must be greater than zero.');
    //                     laptop_list_duplicate[index].quantity = 1; // Optional: Set to minimum valid quantity
    //                 } else {
    //                     // Valid quantity case
    //                     laptop_list_duplicate[index].quantity = event.target.value;
    //                 }
    //             } else {
    //                 // If the laptop is not found in stock
    //                 alert('Laptop not found in stock.');
    //             }
    //             break;

    //         case "gst":

    //             laptop_list_duplicate[index].gst = event.target.value
    //             break
    //     }


    //     setLaptopList(laptop_list_duplicate)

    // }


    const UpdateLaptops = (event, index, field) => {
        const laptop_list_duplicate = [...laptop_list];

        switch (field) {
            case "id":
                laptop_list_duplicate[index].laptop_reference = event.target.value;
                break;

            case "quantity":
                const selectedLaptop = stock.find(sto => sto.laptop === laptop_list_duplicate[index].laptop_reference);

                if (selectedLaptop) {
                    const availableStock = selectedLaptop.stock;

                    // If-else condition for alert
                    if (Number(event.target.value) > availableStock) {
                        // Alert for quantity exceeding stock
                        alert(`Quantity exceeds available stock. Available stock: ${availableStock}`);
                        laptop_list_duplicate[index].quantity = availableStock; // Optional: Set to max available stock
                        setIsSubmitDisabled(true); // Disable submit button
                    } else if (Number(event.target.value) <= 0) {
                        // Alert for invalid quantity (e.g., less than or equal to zero)
                        alert('Quantity must be greater than zero.');
                        laptop_list_duplicate[index].quantity = 1; // Optional: Set to minimum valid quantity
                        setIsSubmitDisabled(true); // Disable submit button
                    } else {
                        // Valid quantity case
                        laptop_list_duplicate[index].quantity = event.target.value;
                        setIsSubmitDisabled(false); // Enable submit button
                    }
                } else {
                    // If the laptop is not found in stock
                    alert('Laptop not found in stock.');
                    setIsSubmitDisabled(true); // Disable submit button
                }
                break;

            case "gst":
                laptop_list_duplicate[index].gst = event.target.value;
                break;
        }

        setLaptopList(laptop_list_duplicate);
    };


    const laptops = laptop_data.length > 0 && laptop_data.map((lap, index) => {
        return (
            <option key={index} value={lap._id}>{lap.brand}</option>
        )
    })

    const dealer = dealers.length > 0 && dealers.map((d, index) => {
        return (
            <option key={index} value={d._id}>{d.customer_name}</option>
        )
    })
    console.log(dealer)







    const result = laptop_list.length > 0 && laptop_list.map((lap, index) => {
        return (
            <div className='laptop' key={index}>

                <label htmlFor="">Laptop: </label> <br />
                <select className='form-control' onChange={event => UpdateLaptops(event, index, 'id')}>
                    <option value=""  >select a option</option>
                    {laptops}
                </select>

                <label htmlFor="">Quantity:</label>
                <input type="number" className='form-control' onChange={event => UpdateLaptops(event, index, "quantity")} />

                <label htmlFor="">Gst:</label>
                <input type="number" className='form-control' onChange={event => UpdateLaptops(event, index, 'gst')} />


            </div>
        )
    })

    const CreateBill = event => {
        event.preventDefault()

        const bill = [
            {
                bill_number: bill_number,
                bill_date: bill_date,
                dealers: customer
            },
            laptop_list
        ]

        console.log(bill)

        axios.post('http://127.0.0.1:4000/bill/', bill)
            .then(response => {
                console.log(response.data)
                nav('/list')
            })
            .catch(error => console.log(error))
    }
    console.log(customer, ";;;")


    // useEffect(() => console.log(laptop_list), [laptop_list])

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/lapdatas/all/')
            .then(response => {
                setLaptopData(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/customer/all/')
            .then(response => {
                console.log(response.data, "customer")
                setDealers(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:4000/stock/all/')
            .then(response => {
                console.log(response.data, "stock")
                setStock(response.data)
            })
            .catch(error => console.log(error))
    }, [])



    return (
        <div>
            <div className='container'>

                <h1 className='text-center'>Create Bill</h1>

                <button className='btn btn-secondary float-end' onClick={() => nav('/list')}>Back</button>

            </div>

            <div className='container'>
                <form className='form'>
                    <label htmlFor="">Bill  Number</label>
                    <input type="text" className='form-control' value={bill_number} onChange={event => setBillNumber(event.target.value)} />

                    <label htmlFor="">Bill  Date</label>
                    <input type="date" className='form-control' value={bill_date} onChange={event => setBillDate(event.target.value)} /> <br />


                    <div>
                        <label htmlFor="">Dealer's Name</label> <br />
                        <select className='form-control' onChange={event => setCustomer(event.target.value)}>
                            <option value=""  >select a option</option>
                            {dealer}
                        </select> <br />

                    </div>

                    <div>
                        <button onClick={event => AddNewLaptop(event)} className='container-fluids btn btn-primary'>Add Laptop</button> <br />
                    </div>

                    {result}



                    <input type="submit" className='container-fluids btn btn-primary my-2' disabled={isSubmitDisabled} onClick={event => CreateBill(event)} />

                </form>
            </div>

        </div>
    )
}

export default BillAdd