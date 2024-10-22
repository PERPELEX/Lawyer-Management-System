"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './EmployeeForm.css'; // Import the custom CSS file

// Step1 Component
const Step1 = ({ formData, setFormData }) => {
  return (
    <div className="form-container">
      <h3 className='formTitle'>Employee Details</h3>

      <div className='twoInRow'>
        <label>
          First Name:
          <input
            type="text"
            value={formData.firstname}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </label>
      </div>

      <label>
        Password:
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </label>
      
      <label>
        Confirm Password:
        <input
          type="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      </label>

      <div className='twoInRow'>
        <label>
          Role:
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </label>

        <label>
          Status:
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>
    </div>
  );
};

// MultiStepForm Component
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
  ];

  const onComplete = () => {
    // Handle form submission here
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      <h2>Employee Form</h2>
      <MultiStep steps={steps} />
      <button className="display" onClick={onComplete}>Submit</button>
    </div>
  );
};

export default MultiStepForm;
