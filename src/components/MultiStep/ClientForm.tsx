"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './ClientForm.css'; // Import the custom CSS file

const Step1 = ({ formData, setFormData }) => {
  return (
    <div className="form-container">
      <h3 className='formTitle'>Client Details</h3>

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
        Father Name:
        <input
          type="text"
          value={formData.fatherName}
          onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
        />
      </label>
      <label>
        NIC:
        <input
          type="text"
          value={formData.nic}
          onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
        />
      </label>
      
      <div className='twoInRow'>
        <label>
          Cast:
          <input
            type="text"
            value={formData.cast}
            onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
          />
        </label>
        <label>
          Occupation:
          <input
            type="text"
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          />
        </label>
      </div>
      
      <div className='twoInRow'>
        <label>
          Contact Number:
          <input
            type="text"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
      </div>

      <label>
        Address:
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </label>
      <label>
        Notes:
        <input
          type="text"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
  ];

  const onComplete = () => {
    // Handle form submission here
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      <h2>Client Form</h2>
      <MultiStep steps={steps} />
      <button className="display" onClick={onComplete}>Submit</button>
    </div>
  );
};

export default MultiStepForm;
