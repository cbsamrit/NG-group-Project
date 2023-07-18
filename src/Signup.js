import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css'
function SignupValidation(values) {
  let errors = {};

  if (values.name === '') {
    errors.name = 'Name should not be empty';
  } else {
    errors.name = '';
  }

  if (values.email === '') {
    errors.email = 'Email should not be empty';
  } else {
    errors.email = '';
  }

  if (values.password === '') {
    errors.password = 'Password should not be empty';
  } else {
    errors.password = '';
  }

  return errors;
}

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = SignupValidation(values);
    setErrors(validationErrors);

    if (
      validationErrors.name === '' &&
      validationErrors.email === '' &&
      validationErrors.password === ''
    ) {
     
      axios
        .post('http://localhost:8081/signup', values)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
     <video autoPlay loop muted className="background-video">
     <source src={require('./pexels-ron-lach-10508548-4096x2160-25fps.mp4')} type="video/mp4" />
  </video>
      <div className="p-3 w-25" style={{ backgroundColor : '#faebd7', opacity : 0.9 ,  borderRadius : '25px'  , position: 'absolute' , right: '100px', top : '250px'}}>
        <h2 style={{textAlign: 'center' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <button type="submit" className="btn btn-dark w-100 rounded-0">
            Sign up
          </button>
          <p style={{textAlign : 'center' , paddingTop :'10px'}}>Already have an account? Login Here!</p>
          <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;


