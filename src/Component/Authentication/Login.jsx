// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import './Login.css'

// const Login = ({ setValidUser }) => {

//   const navigate = useNavigate()
//   const [isLogin, setIsLogin] = useState(true)
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [error, setError] = useState('')

//   const toggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleLogin = event => {
//     event.preventDefault()

//     const data = {
//       username: username,
//       password: password
//     }

//     axios.post('http://127.0.0.1:4000/user/validate/', data)
//       .then(response => {
//         console.log(response.data)

//         localStorage.setItem("Bearer", response.data.access_token)
//         localStorage.setItem("Refresh", response.data.refresh_token)
//         localStorage.setItem("valid_user", true)

//         if (response.data.status === false) setError(response.data.message)
//         else navigate('/laptop/')
//         setValidUser(true)
//       })
//       .catch(error => console.log(error))

//   }

//   const handleSignup = event => {
//     event.preventDefault()

//     setError('')

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       setError('Passwords do not match!');
//       return; // Prevent further execution if passwords don't match
//     }
//     const data = {
//       username: username,
//       password: password
//     }

//     axios.post('http://127.0.0.1:4000/user/create/', data)
//       .then(response => {
//         console.log(response.data)
//         navigate('/')

//         // localStorage.setItem("Bearer", response.data.access_token)
//         // localStorage.setItem("Refresh", response.data.refresh_token)
//         // localStorage.setItem("valid_user", true)

//         // if (response.data.status === false) setError(response.data.message)
//       })
//       .catch(error => console.log(error))

//   }

//   useEffect(() => {

//     const fetchToken = async () => {

//       const refresh_token = localStorage.getItem("Refresh")

//       axios.post('http://127.0.0.1:4000/user/token/', { refresh_token: refresh_token })
//         .then(response => {
//           localStorage.setItem('Bearer', response.data.access_token)
//         })
//         .catch(error => console.log(error))
//     }

//     fetchToken()

//     setInterval(fetchToken, 29000)

//   }, [])



//   return (
//     <div className='form' >

//       <h1 className='text-center'>{isLogin ? 'Login' : 'SignUp'}</h1>
//       <p style={{ color: 'red' }}>{error}</p>
//       {isLogin ? (
//         <form onSubmit={handleLogin}>
//           <div>
//             <label className='form-label'>Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={e => setUsername(e.target.value)}
//               className='form-control'
//               placeholder='Enter your username'
//               required
//             />
//           </div>

//           <div className='mb-3'>
//             <label className='form-label'>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               className='form-control'
//               placeholder='Enter your password'
//               required
//             />
//           </div>
//           <div className='d-grid'>
//             <button type='submit' className='btn btn-primary rounded-pill button' >
//               {'Login'}
//             </button>
//           </div>
//         </form>
//       ) : (
//         <form onSubmit={handleSignup}>
//           <div>
//             <label htmlFor="">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={e => setUsername(e.target.value)}
//               className='form-control'
//               placeholder='Enter your username'
//               required
//             />
//           </div>
//           <div className='mb-3'>
//             <label htmlFor='signupPassword'>Password</label>
//             <input
//               type="password"
//               id='signupPassword'
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               className='form-control'
//               placeholder='Enter your password'
//               required
//             />
//           </div>
//           <div className='mb-3'>
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={e => setConfirmPassword(e.target.value)}
//               className='form-control'
//               placeholder='Confirm your Password'
//               required
//             />
//           </div>
//           <div className='d-grid'>
//             <button type='submit' className='btn btn-primary rounded-pill'>
//               Sign Up
//             </button>
//           </div>
//         </form>
//       )}
//       <button className='text-center btn btn-link mt-3' onClick={toggleForm}>
//         {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
//       </button>
//     </div>
//   )
// }

// export default Login
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setValidUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const data = { username, password };

    axios
      .post('http://127.0.0.1:4000/user/validate/', data)
      .then((response) => {
        console.log(response.data);

        localStorage.setItem('Bearer', response.data.access_token);
        localStorage.setItem('Refresh', response.data.refresh_token);
        localStorage.setItem('valid_user', true);

        if (response.data.status === false) setError(response.data.message);
        else navigate('/laptop/');
        setValidUser(true);
      })
      .catch((error) => console.log(error));
  };

  const handleSignup = (event) => {
    event.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const data = { username, password };

    axios
      .post('http://127.0.0.1:4000/user/create/', data)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const fetchToken = async () => {
      const refresh_token = localStorage.getItem('Refresh');

      axios
        .post('http://127.0.0.1:4000/user/token/', { refresh_token })
        .then((response) => {
          localStorage.setItem('Bearer', response.data.access_token);
        })
        .catch((error) => console.log(error));
    };

    fetchToken();
    setInterval(fetchToken, 29000);
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
       <div className="col-12 col-sm-6 col-md-4 col-lg-3">  {/*className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 col-xxl-2" */}
        <h1 className="text-center mb-4">{isLogin ? 'Login' : 'SignUp'}</h1>
        <p style={{ color: 'red' }}>{error}</p>
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary rounded-pill w-100">
                Login
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-control"
                placeholder="Confirm your Password"
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary rounded-pill w-100">
                Sign Up
              </button>
            </div>
          </form>
        )}
        <button className="btn btn-link w-100 mt-3" onClick={toggleForm}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Login;
