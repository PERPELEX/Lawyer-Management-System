"use client";

import React, { useState, useEffect } from 'react';
import MultiStep from 'react-multistep';
import Select from 'react-select';
import './deleteClient.css'; // Import the custom CSS file
import { Case } from '@/types/Case'; // Import the Case interface

// Sample case data
const cases: Case[] = [
  {
    caseId: 1,
    clientName: 'Johan Doe',
    clientId: 101,
    lawyerName: 'Michael Doe',
    lawyerId: 201,
    offense: 'Theft',
    courtName: 'Supreme Court',
    courtRoom: 'Room 1',
    judge: 'Judge Judy',
    status: 'Active',
    hearingDate: '2023-10-01',
  },
  {
    caseId: 2,
    clientName: 'Jane Smith',
    clientId: 102,
    lawyerName: 'Robert Smith',
    lawyerId: 202,
    offense: 'Fraud',
    courtName: 'High Court',
    courtRoom: 'Room 2',
    judge: 'Judge Brown',
    status: 'Inactive',
    hearingDate: '2023-11-15',
  },
  // Add more cases as needed
];

const MultiStepForm = () => {
  useEffect(() => {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = './updateClient.css';

    document.head.appendChild(stylesheet);
    return () => {
      document.head.removeChild(stylesheet);
    };
  }, []);

  const [formData, setFormData] = useState<Case | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  // Map cases to options for Select component
  const caseOptions = cases.map((caseItem) => ({
    value: caseItem.caseId,
    label: `${caseItem.clientName} - ${caseItem.offense}`,
    data: caseItem, // Store the case object
  }));

  // Handle selection of a case from the dropdown
  const handleCaseSelect = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    const selectedCase = selectedOption?.data;
    if (selectedCase) {
      setFormData(selectedCase);
    }
  };

  const Step1 = ({ caseOptions, handleCaseSelect, selectedOption }: any) => {

    return (
      <div className="form-container">
        <h3 className='formTitle'>Case Details</h3>
        
        <label>
          Search Case:
          <Select
            options={caseOptions}
            isSearchable
            onChange={handleCaseSelect}
            value={selectedOption}
            placeholder="Search by client name or offence..."
          />
        </label>
  
        {/* Additional form fields if needed */}
      </div>
    );
  };

  const onComplete = () => {
    console.log('Data Deleted:', formData);
  };

  const steps = [
    { name: 'Step1', component: <Step1 caseOptions={caseOptions} handleCaseSelect={handleCaseSelect} selectedOption={selectedOption} /> },
  ];

  return (
    <div>
      <h2>Delete Case Form</h2>
      <span className='delete-form'>
        <MultiStep steps={steps} />
      </span>
      <button className="display" onClick={onComplete}>Delete</button>
    </div>
  );
};

export default MultiStepForm;