import React, { useEffect } from 'react';
import './Sidebar.css';
import { FaBattleNet, FaServicestack, FaCodePullRequest, FaUsersGear, FaCircleDollarToSlot } from 'react-icons/fa6';
import logo from '../../Assets/logo.png';
import {Link} from 'react-router-dom';
import { useAuth } from '../Auth/Auth';
import { useHireContext } from '../../App';

const Sidebar = ({isActive, setIsActive}) => {

  const {setIsLoggedIn} = useAuth();
  const {setIsAdmin, setIsVa} = useHireContext();
  const handleLogout = () => {
      localStorage.clear();
      sessionStorage.clear();
      setIsAdmin(false);
      setIsVa(false);
      setIsLoggedIn(false);
      setIsActive(false);
  }

  return (
    <>
       <div className={`side-navbar  ${isActive ? 'active-nav' : ''} d-flex justify-content-between flex-wrap flex-column`} id="sidebar">
    <ul className="nav flex-column text-white w-100">
      <div className='logo-div'>
      <img src={logo} alt='' style={{width:'162px', height:'60px'}}/>
      </div>
      <Link to="/dashboard" className="nav-link">
        <FaBattleNet />
        <span className="mx-2">Dashboard</span>
      </Link>
      <Link to="/hiringRequests" className="nav-link">
        <FaCodePullRequest />
        <span className="mx-2">Hiring Requests</span>
      </Link>
      <Link to="/virtualAssistants" className="nav-link">
        <FaUsersGear />
        <span className="mx-2">Virtual Assistants</span>
      </Link>
      <Link to="/setHourlyRate" className="nav-link">
        <FaCircleDollarToSlot />
        <span className="mx-2">Set Hourly Rate</span>
      </Link>
      <Link to="/setService" className="nav-link">
        <FaServicestack />
        <span className="mx-2">Set Service</span>
      </Link>
      <Link to='/' onClick={handleLogout} className="mt-4 btn btn-secondary">
        Logout
      </Link>
    </ul>
  </div>
    </>
  );
};

export default Sidebar;
