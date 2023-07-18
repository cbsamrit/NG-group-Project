import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validation from './LoginValidation';
import axios from 'axios';
import Home from "./Home";
import './App.css'
function Login({ history }) {
  // Define the Login functional component and receive the 'history' object as a prop

  const [active, setActive] = useState(true);
  // Initialize the 'active' state variable as true using the useState hook
  // setActive is a function used to update the 'active' state

  const [values, setValues] = useState({
    // Initialize the 'values' state object using useState hook
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  // Initialize the 'errors' state object using useState hook

  const handleInput = (event) => {
    // Define the handleInput function to handle input changes
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    // Update the 'values' state by creating a new object that spreads the previous values and updates the specific property with the new value
  };

  const handleSubmit = (event) => {
    // Define the handleSubmit function to handle form submission
    event.preventDefault();
    // Prevent the default form submission behavior

    setErrors(Validation(values));
    // Validate the form values and set the 'errors' state with the validation results

    if (values.email && values.password) {
      // Check if email and password values are present

      axios
        .post('http://localhost:8081/login', values)
        // Send a POST request to the specified URL ('http://localhost:8081/login') with the 'values' object as the payload
        .then((res) => {
          const userData = res.data;
          // Retrieve the response data

          if (userData === 'Invalid credentials') {
            // If the response data indicates invalid credentials
            setErrors({ email: 'Invalid credentials' });
            // Update the 'errors' state with an error message
          } else {
            setActive(false);
            // Set the 'active' state to false
            history.push('/home');
            // Redirect to the home page using the 'history' object
          }
        })
        .catch((err) => console.log(err));
        // If an error occurs during the request, log the error to the console
    }
  };

  return (
    <div>
      {/* Return the JSX markup for the component */}
      <video autoPlay loop muted className="background-video">
      <source src={require('./pexels-ron-lach-10508548-4096x2160-25fps.mp4')} type="video/mp4" />

  </video>
      {/* Background video element */}
      {active ? (
        // Conditional rendering based on the 'active' state
        <div className="d-flex justify-content-end align-items-center vh-100 ">
          {/* Container for login form */}
          <div className="p-3  w-25" style={{ backgroundColor : '#faebd7',opacity : 0.9, borderRadius : '25px' , position: 'absolute', right: '100px', top : '300px' }}>
            {/* Login form */}
            <h2 style={{ textAlign: 'center'}}>Login</h2>
            {/* Login heading */}
            <form onSubmit={handleSubmit}>
              {/* Form element */}
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                {/* Email input */}
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleInput}
                  className="form-control rounded-0"
                />
                {/* Error message for email validation */}
                {errors.email && <span className="text-danger">{errors.email}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                {/* Password input */}
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                  className="form-control rounded-0"
                />
                {/* Error message for password validation */}
                {errors.password && <span className="text-danger">{errors.password}</span>}
              </div>
              <button type="submit" className="btn btn-dark w-100 rounded-0">
                Log in
              </button>
              {/* Login button */}
              <p style={{textAlign : 'center' , paddingTop :'10px'}}>New here? Create a new account!</p>
              {/* Account creation message */}
              <Link
                to="/signup"
                className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
              >
                Create Account
              </Link>
              {/* Link to create a new account */}
            </form>
          </div>
        </div>
      ) : (
        <Home />
      )}
      {/* Render the Home component if 'active' is false */}
    </div>
  );
}

export default Login;
