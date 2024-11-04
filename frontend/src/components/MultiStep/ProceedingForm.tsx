"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './ProceedingForm.css'; // Import the custom CSS file
import Step1 from './ProceedingStep1';
import Step2 from './ProceedingStep2';


const MultiStepForm = () => {
  const [formData, setFormData] = useState({
    
    case:{
      caseType: '',
      caseNumber: '',
      caseTitle: '',
      caseDescription: '',
      caseStatus: 'Active',
    },
    hearing:{
      hearingDate: '',
      hearingTime: '',
      hearingLocation: '',
      hearingStatus: 'Active',
    }
  });

  const steps = [
    { name: 'Step1', component: <Step1 formData={formData.case} setFormData={(data) => setFormData({ ...formData, case: data })} /> },
    { name: 'Step2', component: <Step2 formData={formData.hearing} setFormData={(data) => setFormData({ ...formData, hearing: data })} /> },
  ];

  const onComplete = () => {
    // Handle form submission here
    console.log('Form Submitted:', formData);
  };

  return (
    <div>
      <h2>Case Proceeding Form</h2>
      <MultiStep steps={steps} />
      <button className="display" onClick={onComplete}>Submit</button>
    </div>
  );
};

export default MultiStepForm;
