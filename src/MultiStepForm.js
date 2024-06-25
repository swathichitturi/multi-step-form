import React, { useState, useEffect } from 'react';
import './App.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Container, Button, Box, Typography } from '@mui/material';

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (validate()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const validate = () => {
    const newErrors = {};
    if (step === 0) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    }
    if (step === 1) {
      if (!formData.address1) newErrors.address1 = 'Address Line 1 is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zip) newErrors.zip = 'Zip Code is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log('Form submitted', formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
      case 1:
        return <Step2 formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Step3 formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>Multi-Step Form</Typography>
      {renderStep()}
      <Box mt={2}>
        {step > 0 && <Button onClick={handleBack} variant="contained" sx={{ mr: 1 }}>Back</Button>}
        {step < 2 && <Button onClick={handleNext} variant="contained">Next</Button>}
        {step === 2 && <Button onClick={handleSubmit} variant="contained">Submit</Button>}
      </Box>
    </Container>
  );
};

export default MultiStepForm;
