"use client";

import React from 'react';

const Step5 = ({ formData, setFormData }) => {
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

export default Step5;