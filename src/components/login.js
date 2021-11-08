import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submitForm = () => {
    fetch(`http://localhost:8000/users?email=${email}&password=${password}`)
      .then(response => response.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        if (response && response.length > 0) {
          dispatch({ type: "authentication", payload: true })
        } else {
          alert("Wrong credentials entered!")
        }
      }

      );

  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
              <div className="card-body p-5 text-center">
                <h2 className="text-white-50 mb-5">Login Form</h2>
                <form name="form">
                  <div className='form-group'>
                    <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" />
                  </div>
                  <div className='form-group'>
                    <input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
                  </div>
                  <button type="button" className="btn btn-primary" onClick={submitForm} className="btn btn-outline-light btn-lg px-5" >Login</button>
                  <Link to="/signup" className="btn btn-link">Register</Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Login