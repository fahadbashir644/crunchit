import React, { useState } from 'react';

const HireNow = () => {
    const servicesList = [
        'Data entry',
        'Social media',
        'LinkedIn assistant',
        'Bookkeeping',
        'Graphic design',
        // Add more services
    ];
      
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedService, setSelectedService] = useState('');
    const [customService, setCustomService] = useState('');
    const [selectedHours, setSelectedHours] = useState([]);
    const [isOrientationRequired, setIsOrientationRequired] = useState(false);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('');
    const [email, setEmail] = useState('');

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleBack = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleCustomServiceChange = (event) => {
        setCustomService(event.target.value);
    };

    const renderPage = () => {
        switch (currentPage) {
        case 1:
            return (
            <div>
                <h2>Service</h2>
                <form>
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
                </form>
                <button onClick={handleNext}>Next</button>
            </div>
            );
        case 2:
            return (
            <div>
                <h2>Schedule</h2>
                {/* Working hours selection */}
                {/* Orientation required */}
                {/* Select time frame */}
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack}>Back</button>
            </div>
            );
        case 3:
            return (
            <div>
                <h2>Summary</h2>
                {/* Display selected information */}
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack}>Back</button>
            </div>
            );
        case 4:
            return (
            <div>
                <h2>Pay</h2>
                {/* Payment input */}
                {/* Account creation */}
                <button onClick={handleNext}>Next</button>
                <button onClick={handleBack}>Back</button>
            </div>
            );
        case 5:
            return (
            <div>
                <h2>Thanks for Enquiry</h2>
                {/* Input email */}
                <p>Thank you for your request...</p>
            </div>
            );
        case 6:
            return (
            <div>
                <h2>Thanks for Purchase</h2>
                <p>Thanks for your purchase...</p>
            </div>
            );
        default:
            return null;
        }
    };

    return (
        <div style={{minHeight: '60vh'}}>
        <h1>HIRE NOW WIZARD</h1>
        {renderPage()}
        </div>
    );
};

export default HireNow;
