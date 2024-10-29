"use client";

import React, { useState, useEffect } from 'react';

const Step2 = ({clientData,setChecked,checked, formData, setFormData }) => {
  const [isClientAlsoPlaintiff, setIsClientAlsoPlaintiff] = useState(false);

  useEffect(() => {
    console.log("step2",isClientAlsoPlaintiff);
    setChecked(isClientAlsoPlaintiff);
    console.log("step2",checked);
  },[isClientAlsoPlaintiff]);

  // const [clientData, setClientData] = useState(formData);

  // useEffect(() => {
  //   setFormData({
  //     firstname: '',
  //     lastName: '',
  //     fatherName: '',
  //     nic: '',
  //     cast: '',
  //     occupation: '',
  //     contactNumber: '',
  //     email: '',
  //     address: '',
  //     notes: '',
  //     status: 'Active',
  //   });
  // },[]);

  const handleCheckboxChange = (e) => {
    const checkedBox = e.target.checked;
    setIsClientAlsoPlaintiff(checkedBox);

    if (!checked && checkedBox) {
      // If client is also the plaintiff, retain existing formData
      setFormData({
        ...clientData,
      });
    } else {
      // If client is not the plaintiff, clear the form fields
      setFormData({
        firstname: '',
        lastName: '',
        fatherName: '',
        nic: '',
        cast: '',
        occupation: '',
        contactNumber: '',
        email: '',
        address: '',
        notes: '',
        status: 'Active',
      });
    }
  };

  return (
    <div className="form-container">
      <h3 className='formTitle'>Plaintiff Details</h3>

      {/* Checkbox to check if the client is also the plaintiff */}
      
      <div>
      <div
        className="flex flex-row my-4 cursor-pointer select-none items-center text-body-lg font-medium"
        
      >
        <label className='w-auto z-1' htmlFor="checkboxLabelOne">Is Client also the Plantiff ?</label>
        <div className="relative w-[70%]">
          <input
            type="checkbox"
            id="checkboxLabelOne"
            className="sr-only"
            onChange={handleCheckboxChange}
          />
          <div
            className={`mr-2 mb-2 flex h-5 w-5 items-center justify-center rounded border relative right-8 z-0 ${
              isClientAlsoPlaintiff
                ? "border-primary bg-gray-2 dark:bg-transparent"
                : "border-dark-5 dark:border-dark-6"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${isClientAlsoPlaintiff && "bg-primary"}`}
            ></span>
          </div>
        </div>
      </div>
    </div>
      
      {/* <div className='checkBox'>
        <label for="isClientAlsoPlaintiff" >
          Is the client also the plaintiff?
        </label>
        <input
          id="isClientAlsoPlaintiff"
          type="checkbox"
          checked={isClientAlsoPlaintiff}
          onChange={handleCheckboxChange}
        />
      </div> */}

      <div className='twoInRow'>
        <label>
          First Name:
          <input
            type="text"
            value={formData.firstname || ''}
            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
            disabled={isClientAlsoPlaintiff}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={formData.lastName || ''}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            disabled={isClientAlsoPlaintiff}
          />
        </label>
      </div>

      <label>
        Father Name:
        <input
          type="text"
          value={formData.fatherName || ''}
          onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
          disabled={isClientAlsoPlaintiff}
        />
      </label>
      <label>
        NIC:
        <input
          type="text"
          value={formData.nic || ''}
          onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
          disabled={isClientAlsoPlaintiff}
        />
      </label>

      <div className='twoInRow'>
        <label>
          Cast:
          <input
            type="text"
            value={formData.cast || ''}
            onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
            disabled={isClientAlsoPlaintiff}
          />
        </label>
        <label>
          Occupation:
          <input
            type="text"
            value={formData.occupation || ''}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            disabled={isClientAlsoPlaintiff}
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
            disabled={isClientAlsoPlaintiff}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isClientAlsoPlaintiff}
          />
        </label>
      </div>

      <label>
        Address:
        <input
          type="text"
          value={formData.address || ''}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          disabled={isClientAlsoPlaintiff}
        />
      </label>
      <label>
        Notes:
        <input
          type="text"
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          disabled={isClientAlsoPlaintiff}
        />
      </label>
      <label>
        Status:
        <select
          value={formData.status || 'Active'}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          disabled={isClientAlsoPlaintiff}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
    </div>
  );
};

export default Step2;