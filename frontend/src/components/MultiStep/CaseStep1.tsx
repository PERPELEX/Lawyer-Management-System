"use client";

import React from 'react';
import Select from 'react-select';
import Client from "@types/client";

// Sample client data
const clients: Client[] = [
  {
    id: 1,
    name: 'John Doe',
    fatherName: 'Michael Doe',
    address: '123 Main St',
    occupation: 'Engineer',
    contactNumber: '123456789',
    email: 'john@example.com',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    fatherName: 'Robert Smith',
    address: '456 Oak Ave',
    occupation: 'Doctor',
    contactNumber: '987654321',
    email: 'jane@example.com',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Alice Johnson',
    fatherName: 'David Johnson',
    address: '789 Pine St',
    occupation: 'Teacher',
    contactNumber: '555123456',
    email: 'alice@example.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Bob Brown',
    fatherName: 'Charles Brown',
    address: '321 Maple Ave',
    occupation: 'Lawyer',
    contactNumber: '555987654',
    email: 'bob@example.com',
    status: 'Inactive',
  },
  {
    id: 5,
    name: 'Carol White',
    fatherName: 'Edward White',
    address: '654 Cedar Blvd',
    occupation: 'Nurse',
    contactNumber: '555654321',
    email: 'carol@example.com',
    status: 'Active',
  },
  {
    id: 6,
    name: 'David Green',
    fatherName: 'Frank Green',
    address: '987 Birch Rd',
    occupation: 'Architect',
    contactNumber: '555321987',
    email: 'david@example.com',
    status: 'Inactive',
  },
  {
    id: 7,
    name: 'Eve Black',
    fatherName: 'George Black',
    address: '123 Elm St',
    occupation: 'Artist',
    contactNumber: '555789123',
    email: 'eve@example.com',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Frank Blue',
    fatherName: 'Henry Blue',
    address: '456 Spruce Ln',
    occupation: 'Chef',
    contactNumber: '555456789',
    email: 'frank@example.com',
    status: 'Inactive',
  },
  {
    id: 9,
    name: 'Grace Red',
    fatherName: 'Ian Red',
    address: '789 Willow Dr',
    occupation: 'Scientist',
    contactNumber: '555123789',
    email: 'grace@example.com',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Hank Yellow',
    fatherName: 'Jack Yellow',
    address: '321 Aspen Ct',
    occupation: 'Pilot',
    contactNumber: '555987123',
    email: 'hank@example.com',
    status: 'Inactive',
  },
  // Add more clients as needed
];

const Step1 = ({ formData, setFormData }) => {
  // Map clients to options for React-Select
  const clientOptions = clients.map((client) => ({
    value: client.id,
    label: client.name,
    data: client, // Store the client object
  }));


  
  // Handle selection of client from the dropdown
  const handleClientSelect = (selectedOption: any) => {
    const selectedClient = selectedOption?.data;
    if (selectedClient) {
      // Update the form data with selected client's information
      setFormData({
        firstname: selectedClient.name.split(' ')[0],
        lastName: selectedClient.name.split(' ')[1] || '',
        fatherName: selectedClient.fatherName,
        nic: '',
        address: selectedClient.address,
        occupation: selectedClient.occupation,
        cast: selectedClient.cast || '',
        notes: selectedClient.notes || '',
        contactNumber: selectedClient.contactNumber,
        email: selectedClient.email,
        status: selectedClient.status,
      });
    }
  };

  return (
    <div className="form-container">
      <h3 className='formTitle'>Client Details</h3>

      {/* Searchable dropdown to select a client */}
      <label>
        Search Client:
        <Select
          options={clientOptions}
          isSearchable
          onChange={handleClientSelect}
          placeholder="Search by client name..."
        />
      </label>
      <button className="add-button">Add Client</button>

      {/* Form fields for client information */}
    </div>
  );
};

export default Step1;