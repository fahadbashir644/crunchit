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
import LoginPage from './Components/Login/Login';
import SignupPage from './Components/Signup/Signup';
import { AuthProvider } from './Components/Auth/Auth';
import CustomerDashboard from './Components/Customer-Dashboard/Customer-Dashboard';
import VaDashboard from './Components/VA-Dashboard/VA-Dashboard';

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
    const [balance, setBalance] = useState(0);
    const [isVa, setIsVa] = useState(sessionStorage.getItem('isVa') ? sessionStorage.getItem('isVa') : false);
    const [email, setEmail] = useState(sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '');

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
        setTotalPrice,
        balance,
        setBalance,
        email,
        setEmail,
        isVa,
        setIsVa
    };

  return (
    <BrowserRouter>
      <AuthProvider>
      <div className="app-container">
        <Header />
        <HireContext.Provider value={contextValue}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/select" element={<ServiceForm />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/enquiry" element={<ThanksEnquiryPage />} />
              <Route path="/purchase" element={<ThanksPurchasePage />} />
              <Route path="/dashboard" element={isVa ? <VaDashboard /> : <CustomerDashboard />} />
            </Routes>
        </HireContext.Provider>
        <Footer />
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
