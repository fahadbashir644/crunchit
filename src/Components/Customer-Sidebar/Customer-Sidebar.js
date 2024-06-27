import React, {useState, useEffect } from 'react';
import './Customer-Sidebar.css';
import { FaCircleUser, FaBattleNet, FaServicestack, FaCodePullRequest, FaUsersGear, FaCircleDollarToSlot, FaCheckDouble } from 'react-icons/fa6';
import logo from '../../Assets/logo.png';
import {Link} from 'react-router-dom';
import { useAuth } from '../Auth/Auth';
import { useHireContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from "axios";

const CustomerSidebar = ({isActive, setIsActive}) => {

  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const { setIsAdmin, setIsVa, email, setBalance, setLogin, isVa, name } = useHireContext();
  const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io('http://137.184.81.218');
        setSocket(newSocket);
        return () => {
          newSocket.disconnect();
        };
    },[]);

    useEffect(() => {
        if(isLoggedIn) {
          const data = {
            email: email,
          };
          axios.post("http://137.184.81.218/getbalance", data).then((res) => {   
            if (res) {
                setBalance(res.data.balance);
            } 
          });
        }
    },[]);

    useEffect(() => {
        if (isLoggedIn) {
          socket?.on('updateBalance', newMessage => {
            if (newMessage.email === email) {
              setBalance(newMessage.balance);
            }
          });
        }
      });

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();
        setIsAdmin(false);
        setIsVa(false);
        setIsLoggedIn(false);
        setIsActive(false);
        setLogin(false);
        navigate('/');
    };

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
      {
        isVa ?
        <>
        <Link to="/history" className="nav-link">
          <FaServicestack />
          <span className="mx-2">History</span>
        </Link>
        </> :
        <>
        <Link to="/select" className="nav-link">
        <FaUsersGear />
        <span className="mx-2">Hire</span>
        </Link>
        <Link to="/transactions" className="nav-link">
          <FaServicestack />
          <span className="mx-2">Finance</span>
        </Link>
        <Link to="/pending" className="nav-link">
          <FaServicestack />
          <span className="mx-2">Pending</span>
        </Link>
        <Link to="/buy" className="nav-link">
          <FaCircleDollarToSlot />
          <span className="mx-2">Buy CrunchCard</span>
        </Link>
        </>
      }
      <Link to="/settings" className="nav-link">
          <FaUsersGear />
          <span className="mx-2">Settings</span>
        </Link>
    </ul>
    <div>
    <div className='profile-bar'>
      <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="grey" width="50px" height="50px" viewBox="0 0 512 512"><path d="M256 73.825a182.175 182.175 0 1 0 182.18 182.18A182.177 182.177 0 0 0 256 73.825zm0 71.833a55.05 55.05 0 1 1-55.054 55.046A55.046 55.046 0 0 1 256 145.658zm.52 208.723h-80.852c0-54.255 29.522-73.573 48.885-90.906a65.68 65.68 0 0 0 62.885 0c19.363 17.333 48.885 36.651 48.885 90.906z" data-name="Profile"/></svg>
      </div>
      <div className='profile-info'>
        <span>{name}</span>
        <span style={{fontSize: '14px'}}>{email}</span>
      </div>
    </div>
    <Link to='/' onClick={handleLogout} className="btn btn-secondary logout-btn">
        Logout
      </Link>
      </div>
  </div>
    </>
  );
};

export default CustomerSidebar;
