import React, { useState } from 'react';

const servicesList = [
  'Data entry',
  'Social media',
  'LinkedIn assistant',
  'Bookkeeping',
  'Graphic design',
  // Add more services
];

const ServiceForm = () => {
  const [selectedService, setSelectedService] = useState('');
  const [customService, setCustomService] = useState('');

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleCustomServiceChange = (event) => {
    setCustomService(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h2>Select Service</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Service:
          <select value={selectedService} onChange={handleServiceChange}>
            <option value="">Select...</option>
            {servicesList.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </label>
        {selectedService === 'Other' && (
          <label>
            Custom Service:
            <input
              type="text"
              value={customService}
              onChange={handleCustomServiceChange}
            />
          </label>
        )}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default ServiceForm;
