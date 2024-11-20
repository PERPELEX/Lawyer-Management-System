"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './ClientForm.css'; // Import the custom CSS file

const Step1 = ({ formData, setFormData }) => {
  return (
    <div className="form-container">
      <h3 className='formTitle'>Judge Details</h3>

      <label>
        Judge Name:
        <input
          type="text"
          value={formData.judgeName}
          onChange={(e) => setFormData({ ...formData, judgeName: e.target.value })}
        />
      </label>
      <label>
        Designation:
        <input
          type="text"
          value={formData.designation}
          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
        />
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
  );
};

const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    judgeName: '',
    designation: '',
    status: 'Active',
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
      <h2>Judge Form</h2>
      <span className='client-form'>
        <MultiStep steps={steps} />
      </span>
      <button className="display" onClick={onComplete}>Submit</button>
    </div>
  );
};

export default MultiStepForm;