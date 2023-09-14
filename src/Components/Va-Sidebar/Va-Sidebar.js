import React, { useEffect } from 'react';
import './Va-Sidebar.css';
import { FaBattleNet, FaServicestack, FaCodePullRequest, FaUsersGear, FaCircleDollarToSlot } from 'react-icons/fa6';
import logo from '../../Assets/logo.png';
import {Link} from 'react-router-dom';

const VaSidebar = ({isActive}) => {

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
    </ul>
  </div>
    </>
  );
};

export default VaSidebar;
