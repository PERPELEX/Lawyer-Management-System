"use client";
import React, { useEffect } from 'react';

const Step3 = ({ caseID, formData, setFormData }) => {
  useEffect(() => {
    // Function to fetch plantif data based on caseID
    const fetchPlantifData = async (caseID) => {
      // Replace this with your actual data fetching logic
      // For example, you can use fetch or axios to get data from an API
      const response = await fetch(`/api/plantif/${caseID}`);
      const data = await response.json();

      // Update formData with fetched plantif data
      setFormData({
        firstname: data.firstname || '',
        lastName: data.lastName || '',
        fatherName: data.fatherName || '',
        nic: data.nic || '',
        address: data.address || '',
        occupation: data.occupation || '',
        cast: data.cast || '',
        notes: data.notes || '',
        contactNumber: data.contactNumber || '',
        email: data.email || '',
        status: data.status || 'Active',
      });
    };

    if (caseID) {
      fetchPlantifData(caseID);
    }
  }, [caseID, setFormData]);

  return (
    <div className="form-container">
      <h3 className='formTitle'>Plantif Details</h3>

      <div className='twoInRow'>
        <label>
          First Name:
          <input
            type="text"
            value={formData.firstname || ''}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </label>
      </div>

      <label>
        Father Name:
        <input
          type="text"
          value={formData.fatherName || ''}
          onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
        />
      </label>
      <label>
        NIC:
        <input
          type="text"
          value={formData.nic || ''}
          onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
        />
      </label>
      
      <div className='twoInRow'>
        <label>
          Cast:
          <input
            type="text"
            value={formData.cast || ''}
            onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
          />
        </label>
        <label>
          Occupation:
          <input
            type="text"
            value={formData.occupation || ''}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          />
        </label>
      </div>
      
      <div className='twoInRow'>
        <label>
          Contact Number:
          <input
            type="text"
            value={formData.contactNumber || ''}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
      </div>

      <label>
        Address:
        <input
          type="text"
          value={formData.address || ''}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
      </label>
      <label>
        Notes:
        <input
          type="text"
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </label>
      <label>
        Status:
        <select
          value={formData.status || 'Active'}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
};

export default Step3;