"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './updateClient.css'; // Import the custom CSS file
import Step1 from './employeeStep1';
import Step2 from './employeeStep2';


const MultiStepForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        role: 'User',  // Default role
        status: 'Active',  // Default status
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
      <h2>Update Employee Form</h2>
      <MultiStep steps={steps} />
      <button className="display" onClick={onComplete}>Update</button>
    </div>
  );
};

export default MultiStepForm;
