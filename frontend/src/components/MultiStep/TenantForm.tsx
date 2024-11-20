"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './ClientForm.css'; // Import the custom CSS file

const Step1 = ({ formData, setFormData }) => {
  return (
    <div className="form-container">
      <h3 className='formTitle'>Tenant Details</h3>

      <label>
        Tenant Name:
        <input
          type="text"
          value={formData.tenantName}
          onChange={(e) => setFormData({ ...formData, tenantName: e.target.value })}
        />
      </label>
      <label>
        License No:
        <input
          type="text"
          value={formData.lisenceNo}
          onChange={(e) => setFormData({ ...formData, lisenceNo: e.target.value })}
        />
      </label>
      <label>
        Office Address:
        <input
          type="text"
          value={formData.officeAdress}
          onChange={(e) => setFormData({ ...formData, officeAdress: e.target.value })}
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
    tenantName: '',
    lisenceNo: '',
    officeAdress: '',
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
      <h2>Tenant Form</h2>
      <span className='client-form'>
        <MultiStep steps={steps} />
      </span>
      <button className="display" onClick={onComplete}>Submit</button>
    </div>
  );
};

export default MultiStepForm;