"use client";

import React from 'react';
import Select from 'react-select';
import Case from "@types/Case";

// Sample case data
const cases: Case[] = [
  {
    caseId: 1,
    clientName: 'John Doe',
    clientId: 101,
    lawyerName: 'Michael Smith',
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
    lawyerName: 'Robert Brown',
    lawyerId: 202,
    offense: 'Fraud',
    courtName: 'High Court',
    courtRoom: 'Room 2',
    judge: 'Judge Joe',
    status: 'Inactive',
    hearingDate: '2023-11-15',
  },
  // Add more cases as needed
];

const Step1 = ({ formData, setFormData }) => {
  // Map cases to options for React-Select
  const caseOptions = cases.map((caseItem) => ({
    value: caseItem.caseId,
    label: `${caseItem.clientName} - ${caseItem.offense}`,
    data: caseItem, // Store the case object
  }));

  // Handle selection of case from the dropdown
  const handleCaseSelect = (selectedOption: any) => {
    const selectedCase = selectedOption?.data;
    if (selectedCase) {
      // Update the form data with selected case's information
      setFormData({
        caseId: selectedCase.caseId,
        clientName: selectedCase.clientName,
        clientId: selectedCase.clientId,
        lawyerName: selectedCase.lawyerName,
        lawyerId: selectedCase.lawyerId,
        offense: selectedCase.offense,
        courtName: selectedCase.courtName,
        courtRoom: selectedCase.courtRoom,
        judge: selectedCase.judge,
        status: selectedCase.status,
        hearingDate: selectedCase.hearingDate,
      });
    }
  };

  return (
    <div className="form-container">
      <h3 className='formTitle'>Case Details</h3>

      {/* Searchable dropdown to select a case */}
      <label>
        Search Case:
        <Select
          options={caseOptions}
          isSearchable
          onChange={handleCaseSelect}
          placeholder="Search by client name or offense..."
        />
      </label>
      
    </div>
  );
};

export default Step1;