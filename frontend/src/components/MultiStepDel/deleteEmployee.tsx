"use client";

import React, { useState, useEffect } from 'react';
import MultiStep from 'react-multistep';
import Select from 'react-select';
import './deleteClient.css'; // Import the custom CSS file
import { Employee } from '@/types/Employee'; // Import the Employee interface

// Sample employee data
const employees: Employee[] = [
  {
    id: 1,
    name: 'Johan Doe',
    password: 'password123',
    rank: 'Manager',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    password: 'password456',
    rank: 'Supervisor',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    password: 'password789',
    rank: 'Executive',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Bob Brown',
    password: 'password101',
    rank: 'Assistant',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Carol White',
    password: 'password202',
    rank: 'Director',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 6,
    name: 'David Green',
    password: 'password303',
    rank: 'Analyst',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'Eve Black',
    password: 'password404',
    rank: 'Consultant',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Frank Blue',
    password: 'password505',
    rank: 'Specialist',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 9,
    name: 'Grace Red',
    password: 'password606',
    rank: 'Coordinator',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Hank Yellow',
    password: 'password707',
    rank: 'Technician',
    role: 'User',
    status: 'Inactive',
  },
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

  const [formData, setFormData] = useState<Employee | null>(null);
  const [selectedOption, setSelectedOption] = useState<any>(null);

  // Map employees to options for Select component
  const employeeOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
    data: employee, // Store the employee object here
  }));

  // Handle selection of an employee from the dropdown
  const handleEmployeeSelect = (selectedOption: any) => {
    setSelectedOption(selectedOption);
    const selectedEmployee = selectedOption?.data;
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    }
  };

  const Step1 = ({ employeeOptions, handleEmployeeSelect, selectedOption }: any) => {
    return (
      <div className="form-container">
        <h3 className='formTitle'>Employee Details</h3>
        
        <label>
          Search Employee:
          <Select
            options={employeeOptions}
            isSearchable
            onChange={handleEmployeeSelect}
            value={selectedOption}
            placeholder="Search by employee name..."
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
    { name: 'Step1', component: <Step1 employeeOptions={employeeOptions} handleEmployeeSelect={handleEmployeeSelect} selectedOption={selectedOption} /> },
  ];

  return (
    <div>
      <h2>Delete Employee Form</h2>
      <span className='delete-form'>
        <MultiStep steps={steps} />
      </span>
      <button className="display" onClick={onComplete}>Delete</button>
    </div>
  );
};

export default MultiStepForm;