"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './ClientForm.css'; // Import the custom CSS file

const Step1 = ({ formData, setFormData }) => {
  return (
    <div className="form-container">
      <h3 className='formTitle'>Court Details</h3>

      <label>
        Court Name:
        <input
          type="text"
          value={formData.courtName}
          onChange={(e) => setFormData({ ...formData, courtName: e.target.value })}
        />
      </label>
      <label>
        Type:
        <input
          type="text"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
      </label>
      <label>
        Province:
        <input
          type="text"
          value={formData.province}
          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
        />
      </label>
      <label>
        Division:
        <input
          type="text"
          value={formData.division}
          onChange={(e) => setFormData({ ...formData, division: e.target.value })}
        />
      </label>
      <label>
        District:
        <input
          type="text"
          value={formData.district}
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
        />
      </label>
      <label>
        Tehsil:
        <input
          type="text"
          value={formData.tehsil}
          onChange={(e) => setFormData({ ...formData, tehsil: e.target.value })}
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
    courtName: '',
    type: '',
    province: '',
    division: '',
    district: '',
    tehsil: '',
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
      <h2>Court Form</h2>
      <span className='client-form'>
        <MultiStep steps={steps} />
      </span>
      <button className="display" onClick={onComplete}>Submit</button>
    </div>
  );
};

export default MultiStepForm;