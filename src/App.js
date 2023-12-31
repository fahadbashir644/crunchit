import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import React, { createContext, useContext, useState, useEffect } from 'react';
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
import HiringRequests from './Components/Hiring-Requests/Hiring-Requests';
import VirtualAssistants from './Components/Virtual-Assistants/Virtual-Assistants';
import SetHourlyRate from './Components/Set-Hourly-Rate/Set-Hourly-Rate';
import AdminDashboard from './Components/Admin-Dashboard/Admin-Dashboard';
import axios from "axios";

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
    const [hourlyRate, setHourlyRate] = useState(0);
    const [isVa, setIsVa] = useState(sessionStorage.getItem('isVa') ? sessionStorage.getItem('isVa') : false);
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin') ? sessionStorage.getItem('isAdmin') : false);
    const [email, setEmail] = useState(sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '');

    const contextValue = {
        hourlyRate,
        setHourlyRate,
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
        setIsVa,
        isAdmin,
        setIsAdmin
    };

    useEffect(() => {
      axios.get("http://localhost:8000/getHourlyRate").then((res) => {   
        if (res) {
          setHourlyRate(res.data.hourlyRate);
        } 
      });
    }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
      <div className="app-container">
      <HireContext.Provider value={contextValue}>
        <Header />
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
              <Route path="/dashboard" element={ isVa ? <VaDashboard /> : isAdmin ? <AdminDashboard /> : <CustomerDashboard />} />
              <Route path="/hiringRequests" element={<HiringRequests />} />
              <Route path="/virtualAssistants" element={<VirtualAssistants />} />
              <Route path="/setHourlyRate" element={<SetHourlyRate />} />
            </Routes>
        <Footer />
        </HireContext.Provider>
      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
