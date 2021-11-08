import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

const Register = () => {

    const history = useHistory()
    const [formInputs, setFormInputs] = useState({})

    const getRegister = () => {

        fetch("http://localhost:8000/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formInputs),
        })
            .then(response => response.json())
            .catch(error => console.error("Error:", error))
            .then(response =>
               {
                alert("Signup Successful")
                history.push("/login")
               }
            );
    }

    const handleChange = (e) => {
        formInputs[e.target.name] = e.target.value;
        setFormInputs(formInputs);
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <h2 className="text-white-50 mb-5">Registration Form</h2><form>
                                    <div className='form-group'>
                                        <input type="text" name="firstName" className="form-control" onChange={handleChange} placeholder="First Name" />
                                    </div>
                                    <div className='form-group'>
                                        <input type="text" name="lastName" className="form-control" onChange={handleChange} placeholder="Last Name" />
                                    </div>
                                    <div className='form-group'>
                                        <input type="email" name="email" className="form-control" onChange={handleChange} placeholder="Email" />
                                    </div>
                                    <div className='form-group'>
                                        <input type="password" name="password" className="form-control" onChange={handleChange} placeholder="Password" />
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={getRegister} className="btn btn-outline-light btn-lg px-5" >Register</button>

                                    <Link to="/login" className="btn btn-link">Login</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Register