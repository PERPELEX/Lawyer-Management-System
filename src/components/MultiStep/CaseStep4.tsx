"use client";

import React from 'react';

const Step4 = ({ formData, setFormData }) => {
  const caseData = formData.case || {};

  return (
    <div className="form-container">
      <h3 className='formTitle'>Case Details</h3>

      <div className='twoInRow'>
        <label>
          Case Type:
          <input
            type="text"
            value={caseData.caseType || ''}
            onChange={(e) => setFormData({ ...formData, case: { ...caseData, caseType: e.target.value } })}
          />
        </label>
        <label>
          Case Number:
          <input
            type="text"
            value={caseData.caseNumber || ''}
            onChange={(e) => setFormData({ ...formData, case: { ...caseData, caseNumber: e.target.value } })}
          />
        </label>
      </div>

      <label>
        Case Title:
        <input
          type="text"
          value={caseData.caseTitle || ''}
          onChange={(e) => setFormData({ ...formData, case: { ...caseData, caseTitle: e.target.value } })}
        />
      </label>
      <label>
        Case Description:
        <input
          type="text"
          value={caseData.caseDescription || ''}
          onChange={(e) => setFormData({ ...formData, case: { ...caseData, caseDescription: e.target.value } })}
        />
      </label>

      <label>
        Case Status:
        <select
          value={caseData.caseStatus || 'Active'}
          onChange={(e) => setFormData({ ...formData, case: { ...caseData, caseStatus: e.target.value } })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
};

export default Step4;