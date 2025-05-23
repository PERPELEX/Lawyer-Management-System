"use client";

import React, { useState } from 'react';
import MultiStep from 'react-multistep';
import './updateCase.css'; // Import the custom CSS file
import Step1 from './caseStep1';
import Step2 from './caseStep2';
import Step3 from './caseStep3';
import Step4 from './caseStep4';
import Step5 from './caseStep5';


const MultiStepForm = () => {
    const [checked, setChecked] = useState(false);
    const [formData, setFormData] = useState({
        case: {
            caseId: '',
            caseType: '',
            caseNumber: '',
            caseTitle: '',
            caseDescription: '',
            caseStatus: 'Active',
        },
        plantif: {
            firstname: '',
            lastName: '',
            fatherName: '',
            nic: '',
            address: '',
            occupation: '',
            cast: '',
            notes: '',
            contactNumber: '',
            email: '',
            status: 'Active',
        },
        defendant: {
            firstname: '',
            lastName: '',
            fatherName: '',
            nic: '',
            address: '',
            occupation: '',
            cast: '',
            notes: '',
            contactNumber: '',
            email: '',
            status: 'Active',
        },
        hearing: {
            hearingDate: '',
            hearingTime: '',
            hearingLocation: '',
            hearingStatus: 'Active',
        }
    });

    const steps = [
        { name: 'Step1', component: <Step1 formData={formData.case} setFormData={(data) => setFormData({ ...formData, case: data })} /> },
        { name: 'Step2', component: <Step2 formData={formData.case} setFormData={(data) => setFormData({ ...formData, case: data })} /> },
        { name: 'Step3', component: <Step3 caseID={formData.case.caseId} formData={formData.plantif} setFormData={(data) => setFormData({ ...formData, plantif: data })} /> },
        { name: 'Step4', component: <Step4 caseID={formData.case.caseId} formData={formData.defendant} setFormData={(data) => setFormData({ ...formData, defendant: data })} /> },
        { name: 'Step5', component: <Step5 formData={formData.hearing} setFormData={(data) => setFormData({ ...formData, hearing: data })} /> },


    ];

    const onComplete = () => {
        // Handle form submission here
        console.log('Form Submitted:', formData);
    };

    return (
        <div>
            <h2>Update Case Form</h2>
            <h2>Search bar to not be used and instead using data brought from link</h2>
            <MultiStep steps={steps} />
            <button className="display" onClick={onComplete}>Submit</button>
        </div>
    );
};

export default MultiStepForm;
