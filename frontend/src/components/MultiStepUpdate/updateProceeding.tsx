"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './updateProceeding.css'; // Import the custom CSS file

// Sample data for pre-filling the form
const sampleData = {
  hearing: {
    hearingDate: '2023-10-01',
    hearingTime: '10:00',
    hearingLocation: 'Court Room 1',
    hearingStatus: 'Active',
  }
};

const MultiStepForm = () => {
  const [formData, setFormData] = useState(sampleData);

  const Step1 = ({ formData, setFormData }) => {
    const hearingData = formData.hearing || {};
  
    return (
      <div className="form-container">
        <h3 className='formTitle'>Hearing Details</h3>
  
        <div className='twoInRow'>
          <label>
            Hearing Date:
            <input
              type="date"
              value={hearingData.hearingDate || ''}
              onChange={(e) => setFormData({ ...formData, hearing: { ...hearingData, hearingDate: e.target.value } })}
            />
          </label>
          <label>
            Hearing Time:
            <input
              type="time"
              value={hearingData.hearingTime || ''}
              onChange={(e) => setFormData({ ...formData, hearing: { ...hearingData, hearingTime: e.target.value } })}
            />
          </label>
        </div>
  
        <label>
          Hearing Location:
          <input
            type="text"
            value={hearingData.hearingLocation || ''}
            onChange={(e) => setFormData({ ...formData, hearing: { ...hearingData, hearingLocation: e.target.value } })}
          />
        </label>
  
        <label>
          Hearing Status:
          <select
            value={hearingData.hearingStatus || 'Active'}
            onChange={(e) => setFormData({ ...formData, hearing: { ...hearingData, hearingStatus: e.target.value } })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
      </div>
    );
  };

  const steps = [
    { name: 'Step1', component: <Step1 formData={formData} setFormData={setFormData} /> },
  ];

  const onComplete = () => {
    // Handle form submission here
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      <h2>Update Proceeding Form</h2>
      <h2>Data to be brought</h2>
      <span className='proceeding-update'>
        <MultiStep steps={steps} />
      </span>
      <button className="display" onClick={onComplete}>Submit</button>
    </div>
  );
};

export default MultiStepForm;