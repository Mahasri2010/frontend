import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const StudentAdd = () => {

  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
  const [age, setAge] = useState('')
  const [cls, setCls] = useState('')
  const [exam, setExam] = useState('')
  const [tamil, setTamil] = useState(0)
  const [english, setEnglish] = useState(0)
  const [maths, setMaths] = useState(0)
  const [science, setScience] = useState(0)
  const [social, setSocial] = useState(0)
  const [result, setResult] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState('')
  const [grade, setGrade] = useState('')

  //  useEffect(()=>{

  //   const calculation={
  //     tamil,
  //     english,
  //     maths,
  //     science,
  //     social
  //   }

  //   axios.get('http://127.0.0.1:4000/marks/total/',calculation)
  //   .then(response=>{
  //     console.log(response.data)
  //     setTotal(response.data.total)
  //     setAverage(response.data.average)
  //     setResult(response.data.result)
  //     setGrade(response.data.grade)
  //   })
  //   .catch(error=>console.log(error))
  //  },[tamil,english,maths,science,social])




  const SubmitHandler = event => {
    event.preventDefault()

    const marks = {
      studentname: name,
      studentroll: roll,
      studentage: age,
      cls: cls,
      exam: exam,
      tamil: tamil,
      english: english,
      maths: maths,
      science: science,
      social: social,
      total: total,
      average: average,
      result: result,
      grade: grade
    }

    axios.post('http://127.0.0.1:4000/marks/add/', marks)
      .then(response => {
        response.data
        navigate('/student')
      })
      .catch(error => console.log(error))

  }




  const Result = () => {

    if (Number(tamil) > 40 && Number(english) > 40 && Number(maths) > 40 && Number(science) > 40 && Number(social) > 40) {
      setResult("PASS")
    }
    else {
      setResult("FAIL")
    }

  }

  const Grade = (average) => {

    if (average >= 90) {
      setGrade("O Outstanding");
    } else if (average >= 80) {
      setGrade("A+");
    } else if (average >= 70) {
      setGrade("A");
    } else if (average >= 60) {
      setGrade("B+");
    } else if (average >= 50) {
      setGrade("B");
    } else if (average >= 40) {
      setGrade("C");
    } else if (average < 40) {
      setGrade("F-Fail");
    } else {
      setGrade("Enter correct Marks!");
    }
  }


  useEffect(() => {

    const tot = Number(tamil) + Number(english) + Number(maths) + Number(science) + Number(social)
    const avg = tot / 5

    setTotal(tot)
    setAverage(avg)
    Result()
    Grade(avg)

    // Setting the result based on marks
    // setResult(() => {
    //   if (Number(tamil) > 40 &&
    //       Number(english) > 40 &&
    //       Number(maths) > 40 &&
    //       Number(science) > 40 &&
    //       Number(social) > 40) {
    //     return "PASS"
    //   } else {
    //     return "FAIL"
    //   }
    // })

    //Setting the grade based on the average
    //   setGrade(() => {
    //     if (calculatedAverage >= 90) {
    //       return "O Outstanding"
    //     } else if (calculatedAverage >= 80) {
    //       return "A+"
    //     } else if (calculatedAverage >= 70) {
    //       return "A"
    //     } else if (calculatedAverage >= 60) {
    //       return "B+"
    //     } else if (calculatedAverage >= 50) {
    //       return "B"
    //     } else if (calculatedAverage >= 40) {
    //       return "C"
    //     } else {
    //       return "F-Fail"
    //     }
    //   })

  }, [tamil, english, maths, science, social])





  return (

    <div>
      <div className='container'>
        <h1 className='text-center'>New Student Data</h1>
        <button className='btn btn-secondary' onClick={() => navigate('/student')}>Back</button>
      </div>

      <form className='form'>
        <label htmlFor="">Student Name</label>
        <input className='form-control' type="text" value={name} onChange={(event) => setName(event.target.value)} />

        <label htmlFor="">Student RollNo</label>
        <input className='form-control' type="text" value={roll} onChange={(event) => setRoll(event.target.value)} />


        <label htmlFor="">Age</label>
        <input className='form-control' type="text" value={age} onChange={(event) => setAge(event.target.value)} />

        <label htmlFor="">Class</label>
        <select className="form-control" value={cls} onChange={(event) => setCls(event.target.value)}>

          <option value="I-'Standard' " >I-"Standard"</option>
          <option value="II-'Standard' ">II-"Standard"</option>
          <option value="III-'Standard'">III-"Standard"</option>
          <option value="IV-'Standard'">IV-"Standard"</option>
          <option value="V-'Standard'">V-"Standard"</option>
          <option value="VI-'Standard'">VI-"Standard"</option>
          <option value="VII-'Standard'">VII-"Standard"</option>
          <option value="VIII-'Standard'">VIII-"Standard"</option>
          <option value="IX-'Standard'">IX-"Standard"</option>
          <option value="X-'Standard'">X-"Standard"</option>


        </select>

        <label htmlFor="">Exam</label>
        <select className="form-control" value={exam} onChange={(event) => setExam(event.target.value)}>
          <option value="mid-term-1">First Mid-Term Exam</option>
          <option value="quarterly">Quarterly Exam</option>
          <option value="mid-term-2">Second Mid-Term Exam</option>
          <option value="half-yearly">Half-yearly Exam</option>
          <option value="mid-term-3">Third Mid-Term Exam</option>
          <option value="annual">Annual Exam</option>
        </select>


        <label htmlFor="">Tamil</label>
        <input className='form-control' type="text" value={tamil} onChange={(event) => setTamil(+event.target.value)} />

        <label htmlFor="">English</label>
        <input className='form-control' type='text' value={english} onChange={(event) => setEnglish(+event.target.value)} />

        <label htmlFor="">Maths</label>
        <input className='form-control' type="text" value={maths} onChange={(event) => setMaths(+event.target.value)} />

        <label htmlFor="">Science</label>
        <input className='form-control' type="text" value={science} onChange={(event) => setScience(+event.target.value)} />

        <label htmlFor="">Social</label>
        <input className='form-control' type="text" value={social} onChange={(event) => setSocial(+event.target.value)} /> <br /> <br />

        {/* <button type='button' onClick={Total} className='btn btn-secondary my-2'>Total</button> */}
        <input className='form-control' placeholder='Total Marks' type="number" value={total} /> <br /> <br />

        {/* <button type='button' onClick={Average} className='btn btn-secondary my-2'>Average</button> */}
        <input className='form-control' placeholder='Average' type="number" value={average} />  <br /> <br />

        {/* <button type='button' onClick={Result} className='btn btn-secondary my-2'>Result</button> */}
        <input className='form-control' placeholder='Result' type="text" value={result} /> <br /> <br />

        {/* <button type='button' onClick={Grade} className='btn btn-secondary my-2' > Grade</button> */}
        <input className='form-control' placeholder='Grade' type="text" value={grade} /> <br /> <br />

        <input className='container btn btn-primary my-2' type="submit" onClick={(event) => SubmitHandler(event)} />



      </form>

    </div>
  )
}

export default StudentAdd