"use client";

import React from 'react';

const Step3 = ({ formData, setFormData }) => {
  const defendant = formData.defendant || {};

  return (
    <div className="form-container">
      <h3 className='formTitle'>Defendant Details</h3>

      <div className='twoInRow'>
        <label>
          First Name:
          <input
            type="text"
            value={defendant.firstname || ''}
            onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, firstname: e.target.value } })}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={defendant.lastName || ''}
            onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, lastName: e.target.value } })}
          />
        </label>
      </div>

      <label>
        Father Name:
        <input
          type="text"
          value={defendant.fatherName || ''}
          onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, fatherName: e.target.value } })}
        />
      </label>
      <label>
        NIC:
        <input
          type="text"
          value={defendant.nic || ''}
          onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, nic: e.target.value } })}
        />
      </label>
      
      <div className='twoInRow'>
        <label>
          Cast:
          <input
            type="text"
            value={defendant.cast || ''}
            onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, cast: e.target.value } })}
          />
        </label>
        <label>
          Occupation:
          <input
            type="text"
            value={defendant.occupation || ''}
            onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, occupation: e.target.value } })}
          />
        </label>
      </div>
      
      <div className='twoInRow'>
        <label>
          Contact Number:
          <input
            type="text"
            value={defendant.contactNumber || ''}
            onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, contactNumber: e.target.value } })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={defendant.email || ''}
            onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, email: e.target.value } })}
          />
        </label>
      </div>

      <label>
        Address:
        <input
          type="text"
          value={defendant.address || ''}
          onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, address: e.target.value } })}
        />
      </label>
      <label>
        Notes:
        <input
          type="text"
          value={defendant.notes || ''}
          onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, notes: e.target.value } })}
        />
      </label>
      <label>
        Status:
        <select
          value={defendant.status || 'Active'}
          onChange={(e) => setFormData({ ...formData, defendant: { ...defendant, status: e.target.value } })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
};

export default Step3;