"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './CaseForm.css'; // Import the custom CSS file
import Step1 from './CaseStep1';
import Step2 from './CaseStep2';
import Step3 from './CaseStep3';
import Step4 from './CaseStep4';
import Step5 from './CaseStep5';


const MultiStepForm = () => {
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    client:{
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
    },
    plantif:{
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
    },
    defendant:{
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
    },
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
    { name: 'Step1', component: <Step1 formData={formData.client} setFormData={(data) => setFormData({ ...formData, client: data })} /> },
    { name: 'Step2', component: <Step2 clientData={formData.client} checked={checked} setChecked={setChecked} formData={formData.plantif} setFormData={(data) => setFormData({ ...formData, plantif: data })} /> },
    { name: 'Step3', component: <Step3 clientData={formData.client} checked={checked} setChecked={setChecked} formData={formData.defendant} setFormData={(data) => setFormData({ ...formData, defendant: data })} /> },
    { name: 'Step4', component: <Step4 formData={formData.case} setFormData={(data) => setFormData({ ...formData, case: data })} /> },
    { name: 'Step5', component: <Step5 formData={formData.hearing} setFormData={(data) => setFormData({ ...formData, hearing: data })} /> },
    
    
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
