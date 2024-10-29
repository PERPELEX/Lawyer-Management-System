"use client";
import React, { useState } from 'react';

const Step2 = ({ formData, setFormData }) => {
    return (
        <div className="form-container">
        <h3 className='formTitle'>Employee Details</h3>
  
        <div className='twoInRow'>
          <label>
            First Name:
            <input
              type="text"
              value={formData.firstname}
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </label>
        </div>
  
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </label>
        
        <label>
          Confirm Password:
          <input
            type="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </label>
  
        <div className='twoInRow'>
          <label>
            Role:
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </label>
  
          <label>
            Status:
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>
        </div>
      </div>
    );
  };

  export default Step2;