"use client";

import React from 'react';
import Select from 'react-select';
import Employee from "@types/Employee";

// Sample employee data
const employees: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    password: 'password123',
    rank: 'Manager',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    password: 'password456',
    rank: 'Senior Developer',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    password: 'password789',
    rank: 'Team Lead',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Bob Brown',
    password: 'password101',
    rank: 'Developer',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Carol White',
    password: 'password202',
    rank: 'HR',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 6,
    name: 'David Green',
    password: 'password303',
    rank: 'Architect',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'Eve Black',
    password: 'password404',
    rank: 'Designer',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Frank Blue',
    password: 'password505',
    rank: 'Chef',
    role: 'User',
    status: 'Inactive',
  },
  {
    id: 9,
    name: 'Grace Red',
    password: 'password606',
    rank: 'Scientist',
    role: 'Admin',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Hank Yellow',
    password: 'password707',
    rank: 'Pilot',
    role: 'User',
    status: 'Inactive',
  },
  // Add more employees as needed
];

const Step1 = ({ formData, setFormData }) => {
  // Map employees to options for React-Select
  const employeeOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
    data: employee, // Store the employee object
  }));

  // Handle selection of employee from the dropdown
  const handleEmployeeSelect = (selectedOption: any) => {
    const selectedEmployee = selectedOption?.data;
    if (selectedEmployee) {
      // Update the form data with selected employee's information
      setFormData({
        firstname: selectedEmployee.name.split(' ')[0],
        lastName: selectedEmployee.name.split(' ')[1] || '',
        password: selectedEmployee.password,
        confirmPassword: selectedEmployee.password,
        rank: selectedEmployee.rank,
        role: selectedEmployee.role,
        status: selectedEmployee.status,
      });
    }
  };

  return (
    <div className="form-container">
      <h3 className='formTitle'>Employee Details</h3>

      {/* Searchable dropdown to select an employee */}
      <label>
        Search Employee:
        <Select
          options={employeeOptions}
          isSearchable
          onChange={handleEmployeeSelect}
          placeholder="Search by employee name..."
        />
      </label>

      
    </div>
  );
};

export default Step1;