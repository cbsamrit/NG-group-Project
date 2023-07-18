import React, { useState } from 'react';
import axios from 'axios';
// Import the required dependencies: useState for state management and axios for making HTTP requests
 // Track the logout status
function Home() {
  // Define the Home functional component

  const [values, setValues] = useState({
    // Initialize the 'values' state object using useState hook
    Alcohol: '',
    'Malic Acid': '',
    Ash: '',
    'Ash Alcanity': '',
    Magnesium: '',
    'Total Phenols': '',
    Flavanoids: '',
    'Nonflavanoid Phenols': '',
    Proanthocyanins: '',
    'Color Intensity': '',
    Hue: '',
    OD280: '',
    Proline: ''
  });


  // Initialize the 'values' state object with empty string values for each property
  // setValues is a function used to update the 'values' state

  const [prediction, setPrediction] = useState('');
  const handleLogout = () => {
    // Perform any necessary logout actions
    window.location.href = '/'; // Redirect to the login page
  };
  // Initialize the 'prediction' state variable with an empty string
  // setPrediction is a function used to update the 'prediction' state

  const handleInput = (event) => {
    // Define the handleInput function to handle input changes
    const { name, value } = event.target;
    // Destructure the 'name' and 'value' from the event target (input element)

    setValues((prev) => ({ ...prev, [name]: value }));
    // Update the 'values' state by creating a new object that spreads the previous values and updates the specific property with the new value
  };

  const handlePredict = async () => {
    // Define the handlePredict function to handle the prediction request
    const allValuesEntered = Object.values(values).every((value) => !!value);
    // Check if all values are entered by checking if every value in the 'values' object is truthy

    if (allValuesEntered) {
      // If all values are entered
      try {
        const response = await axios.post('http://127.0.0.1:5000/predict', values);
        // Send a POST request to the specified URL with the 'values' object as the payload
        // Await the response from the server

        setPrediction(response.data.prediction);
        // Update the 'prediction' state with the prediction value received from the server        
      } catch (error) {
        console.log('An error occurred while making the prediction request:', error);
      }
    } else {
      console.log('Please enter all values.');
    }
  };

  return (
    <div style={{height : '900px'}}>
      {/* Return the JSX markup for the component */}
      <div
        className=""
       /* style={{
          backgroundColor: '',
          padding: '5px',
          borderRadius: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
          color: '#fff',
          zIndex : 0
        }}*/
       
      >
        
        {/* Outer container for the form */}
        <div
          
          style={{ backgroundColor : '#faebd7' , paddingTop : '15px' , opacity : 0.9 ,fontWeight: 'bold' , fontFamily: 'Arialss', fontSize: '30px', color: '#954535' , zIndex : 1 ,height :'70px'}}
        >
           <div>
                <span style={{ padding: '5px' , alignItems : 'Left' ,border : '2px solid #954535' , borderRadius :'10px' , position :'relative', left:'10px'}}> NG </span>
                <span className="text-center" style={{position : 'relative' , right : '-125px'}}>
  Predict Your Customer Segment within a single click Of a button for your New Wine!
</span>

           <span>
           <button
                className="btn btn-default text-decoration-none align-items-left"
                style={{
                  
                  
                  border: '3px solid #fff',
                  borderRadius : '10px',
                  backgroundColor:"#daa06d",
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight : 'bold' , 
                  fontFamily: 'Helvetica, sans-serif',
                  fontSize: '18px',
                  width : '100px' ,
                  height : '40px' ,
                  position : 'absolute' ,
                  right : '10px'
                }}
                onClick={handleLogout}
              >
                Log Out
              </button>
              
              </span>
           </div>
        </div>
        {/* Heading for the page */}

        <h6 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px', color: 'white' , textAlign: 'center' }}>
          Enter ingredient values to predict your Customer Segment
        </h6>
        {/* Instructions for entering values */}

        <form>
          {/* Form element */}
          <div className="row" style={{ backgroundColor : '#faebd7',opacity : 0.9 , margin : '20px 150px 10px 150px' ,paddingTop : '10px' , borderRadius : '20px'}}>
            {/* Render input fields for each value */}
            {Object.entries(values).map(([key, value]) => (
              // Iterate over the entries of 'values' object as an array of [key, value] pairs
              <div className="col-md-4 mb-3" key={key} style={{ textAlign : 'center'}} >
                {/* Each value is rendered as a column in a grid layout */}
                <label
                  htmlFor={key}
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '18px',
                    color: '#954535',
                    fontWeight: 'bold',
                    // textAlign: 'center', 
                  }}
                >
                  {key}
                </label>
                {/* Label for the input field */}
                <input
                  type="float"
                  className="form-control"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleInput}
                  required
                  min="0"
                />
                {/* Input field for entering the value */}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-warning container mt-4 d-flex justify-content-center align-items-center"
            style={{
              width: '100px',
              height: '50px',
              fontFamily: 'Helvetica, sans-serif',
              fontSize: '18px',
              color: '#fff',
              backgroundColor:"#daa06d",
              border: '3px solid #fff',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight : 'bold'
            }}
            onClick={handlePredict}
          >
            Predict
          </button>
          {/* Button to trigger prediction */}
        </form>

        {prediction && (
          // If 'prediction' is not empty, render the following section
          <div className="mt-4">
            <h3
              className="container mt-4 text-center"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#954535' , fontWeight: 'bold',}}
            >
              Prediction Result
            </h3>
            {/* Heading for the prediction result */}
            <div
              className="card"
              style={{
                backgroundColor: '#fff',
                borderRadius: '5px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Card to display the prediction value */}
              <div className="card-body text-center" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                <h5 style={{ fontSize : '30px'}}>Your Customer Segment should be {prediction} </h5>

              </div>
              {/* Display the prediction value */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

