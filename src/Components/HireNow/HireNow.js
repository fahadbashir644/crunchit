import React, { useState } from 'react';
import SchedulePage from './Schedule/Schedule';

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
    // const [selectedHours, setSelectedHours] = useState([]);
    // const [isOrientationRequired, setIsOrientationRequired] = useState(false);
    // const [selectedTimeFrame, setSelectedTimeFrame] = useState('');
    // const [email, setEmail] = useState('');

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
            <div className='container mt-5'>
                <form>
                    <div className="form-group">
                        <label htmlFor="serviceSelect">Service:</label>
                        <select
                        className="form-control"
                        id="serviceSelect"
                        value={selectedService}
                        style={{width: "50%"}}
                        onChange={handleServiceChange}
                        >
                        <option value="">Select...</option>
                        {servicesList.map((service, index) => (
                            <option key={index} value={service}>
                            {service}
                            </option>
                        ))}
                        <option value="Other">Other</option>
                        </select>
                    </div>
                    {selectedService === 'Other' && (
                        <div className="mt-4 form-group">
                        <label htmlFor="customServiceInput">Custom Service:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="customServiceInput"
                            value={customService}
                            style={{width: "50%"}}
                            onChange={handleCustomServiceChange}
                        />
                        </div>
                    )}
                </form>
                <button className="mt-4 btn btn-primary" onClick={handleNext}>Next</button>
            </div>
            );
        case 2:
            return (
            <div>
                <SchedulePage onNext={handleNext} onBack={handleBack}/>
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
        {renderPage()}
        </div>
    );
};

export default HireNow;
