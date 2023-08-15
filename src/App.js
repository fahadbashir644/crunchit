import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';
import ServiceForm from './Components/Service/Service';
import SchedulePage from './Components/Schedule/Schedule';
import SummaryPage from './Components/Summary/Summary';
import PaymentPage from './Components/Payment/Payment';
import ThanksEnquiryPage from './Components/Thanks-Enquiry/Thanks-Enquiry';
import ThanksPurchasePage from './Components/Thanks-Purchase/Thanks-Purchase';

const HireContext = createContext();

export const useHireContext = () => {
  return useContext(HireContext);
};

function App() {
    const [selectedService, setSelectedService] = useState('');
    const [customService, setCustomService] = useState('');
    const [workingHours, setWorkingHours] = useState(new Map());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isOrientationRequired, setIsOrientationRequired] = useState(false);
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const contextValue = {
        selectedService,
        setSelectedService,
        customService,
        setCustomService,
        workingHours,
        setWorkingHours,
        selectedDate,
        setSelectedDate,
        isOrientationRequired,
        setIsOrientationRequired,
        selectedTimeFrame,
        setSelectedTimeFrame,
        totalPrice,
        setTotalPrice
    };

  return (
    <BrowserRouter>
      
      <div className="app-container">
        <Header />
        <HireContext.Provider value={contextValue}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/select" element={<ServiceForm />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/enquiry" element={<ThanksEnquiryPage />} />
              <Route path="/purchase" element={<ThanksPurchasePage />} />
            </Routes>
        </HireContext.Provider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
