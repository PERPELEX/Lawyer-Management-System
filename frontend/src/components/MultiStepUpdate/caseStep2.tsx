"use client";
import React from 'react';

const Step2 = ({ formData, setFormData }) => {
  return (
    <div className="form-container">
      <h3 className='formTitle'>Case Details</h3>

      <div className='twoInRow'>
        <label>
          Case Type:
          <input
            type="text"
            value={formData.caseType || ''}
            onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
          />
        </label>
        <label>
          Case Number:
          <input
            type="text"
            value={formData.caseNumber || ''}
            onChange={(e) => setFormData({ ...formData, caseNumber: e.target.value })}
          />
        </label>
      </div>

      <label>
        Case Title:
        <input
          type="text"
          value={formData.caseTitle || ''}
          onChange={(e) => setFormData({ ...formData, caseTitle: e.target.value })}
        />
      </label>
      <label>
        Case Description:
        <input
          type="text"
          value={formData.caseDescription || ''}
          onChange={(e) => setFormData({ ...formData, caseDescription: e.target.value })}
        />
      </label>
      <label>
        Case Status:
        <select
          value={formData.caseStatus || 'Active'}
          onChange={(e) => setFormData({ ...formData, caseStatus: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
};

export default Step2;