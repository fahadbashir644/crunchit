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
import AdminDashboard from './Components/Admin-Dashboard/Admin-Dashboard';
import axios from "axios";
import SetService from './Components/Set-Service/Set-Service';
import Sidebar from './Components/Sidebar/Sidebar';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import History from './Components/History/History';
import BuyCrunchcard from './Components/Buy-Crunchcard/Buy-Crunchcard';
import Finance from './Components/Finance/Finance';
import Settings from './Components/Settings/Settings';

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
    const [balance, setBalance] = useState(sessionStorage.getItem('balance') ? sessionStorage.getItem('balance') : 0);
    const [hourlyRate, setHourlyRate] = useState(0);
    const [isVa, setIsVa] = useState(sessionStorage.getItem('isVa') ? sessionStorage.getItem('isVa') : false);
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('isAdmin') ? sessionStorage.getItem('isAdmin') : false);
    const [name, setName] = useState(sessionStorage.getItem('name') ? sessionStorage.getItem('name') : false);
    const [email, setEmail] = useState(sessionStorage.getItem('email') ? sessionStorage.getItem('email') : '');
    const [isActive, setIsActive] = useState(sessionStorage.getItem('isAdmin') ? true : false);
    const [selectedTimezone, setSelectedTimezone] = useState(null);
    const [vaRate, setVaRate] = useState(sessionStorage.getItem('vaRate') ? sessionStorage.getItem('vaRate') : 0);

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
        setIsAdmin,
        setIsActive,
        setSelectedTimezone,
        selectedTimezone,
        name,
        setName,
        vaRate,
        setVaRate
    };

  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
      <HireContext.Provider value={contextValue}>
      {isAdmin ? <Sidebar isActive={isActive} setIsActive={setIsActive} /> : '' }
      <div className={`app-container ${isActive ? 'active-cont' : ''}`}>
      {isAdmin ?
      <a className="btn border-0" id="menu-btn" onClick={toggleSidebar}>
        {isActive ? <FaAngleLeft /> : <FaAngleRight />}
        </a> : ''}
        {!isAdmin ? <Header /> : ''}
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
              <Route path="/setService" element={<SetService />} />
              <Route path="/history" element={<History />} />
              <Route path="/buyCrunchcard" element={<BuyCrunchcard />} />
              <Route path="/transactions" element={<Finance />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
        <Footer />
      </div>
      </HireContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
