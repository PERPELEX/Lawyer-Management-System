"use client";

import React, { useState, useEffect } from 'react';
import MultiStep from 'react-multistep';
import './updateClient.css'; // Import the custom CSS file
import Step1 from './clientStep1';
import Step2 from './clientStep2';


const MultiStepForm = () => {

  useEffect(() => {
    // Create the stylesheet link element
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = './updateClient.css'; // Replace with your stylesheet path

    // Add the stylesheet to the head of the document
    document.head.appendChild(stylesheet);

    // Cleanup function to remove the stylesheet when component unmounts
    return () => {
      document.head.removeChild(stylesheet);
    };
  }, []); // Empty dependency array ensures this runs only on mount/unmount

  const [formData, setFormData] = useState({
      firstname: '',
      lastName: '',
      fatherName: '',
      nic: '',
      address: '',
      occupation: '',
      cast: '',
      notes: '',
      contactNumber: '',
      email: '',
      status: 'Active',
  });

  const steps = [
    { name: 'Step1', component: <Step1 formData={formData} setFormData={setFormData} /> },
    { name: 'Step2', component: <Step2 formData={formData} setFormData={setFormData} /> },
    
    
    
  ];

  const onComplete = () => {
    // Handle form submission here
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      <h2>Update Client Form</h2>
      <span className='update-form'>
        <MultiStep steps={steps} />
      </span>
      <button className="display" onClick={onComplete}>Update</button>
    </div>
  );
};

export default MultiStepForm;