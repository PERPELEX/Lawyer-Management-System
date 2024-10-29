"use client";
import React, { useEffect } from 'react';

const Step5 = ({ caseID, formData, setFormData }) => {
  useEffect(() => {
    // Function to fetch hearing data based on caseID
    const fetchHearingData = async (caseID) => {
      // Replace this with your actual data fetching logic
      // For example, you can use fetch or axios to get data from an API
      const response = await fetch(`/api/hearing/${caseID}`);
      const data = await response.json();

      // Update formData with fetched hearing data
      setFormData({
        hearingDate: data.hearingDate || '',
        hearingTime: data.hearingTime || '',
        hearingLocation: data.hearingLocation || '',
        hearingStatus: data.hearingStatus || 'Active',
      });
    };

    if (caseID) {
      fetchHearingData(caseID);
    }
  }, [caseID, setFormData]);

  return (
    <div className="form-container">
      <h3 className='formTitle'>Hearing Details</h3>

      <div className='twoInRow'>
        <label>
          Hearing Date:
          <input
            type="date"
            value={formData.hearingDate || ''}
            onChange={(e) => setFormData({ ...formData, hearingDate: e.target.value })}
          />
        </label>
        <label>
          Hearing Time:
          <input
            type="time"
            value={formData.hearingTime || ''}
            onChange={(e) => setFormData({ ...formData, hearingTime: e.target.value })}
          />
        </label>
      </div>

      <label>
        Hearing Location:
        <input
          type="text"
          value={formData.hearingLocation || ''}
          onChange={(e) => setFormData({ ...formData, hearingLocation: e.target.value })}
        />
      </label>
      <label>
        Hearing Status:
        <select
          value={formData.hearingStatus || 'Active'}
          onChange={(e) => setFormData({ ...formData, hearingStatus: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
};

export default Step5;