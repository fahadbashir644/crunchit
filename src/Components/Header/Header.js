import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';
import { useHireContext } from '../../App';
import logoVideo from '../../Assets/logo.png';
import './Header.css';
import { FaUserCircle } from "react-icons/fa";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

function Header() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { isAdmin, setIsAdmin, setIsVa, isVa, name, email, balance, setBalance, vaRate } = useHireContext();
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        return () => {
          newSocket.disconnect();
        };
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
        setShowProfileDropdown(false);
        navigate('/');
    };

    const toggleProfileDropdown = () => {
        setShowProfileDropdown(!showProfileDropdown);
    };

    const renderProfileDropdown = () => {
        return (
            <div className={`profile-dropdown ${showProfileDropdown ? 'active' : ''}`}>
                <button onClick={toggleProfileDropdown} className="profile-dropdown-button">
                    <FaUserCircle />
                </button>
                <div className="profile-dropdown-content">
                    <p>{name}</p>
                    <p>{email}</p>
                    <p>Balance: ${balance}</p>
                    {isVa ? <p>Rate: ${vaRate}</p> : ''}
                    <Link to="/settings" className="nav-link">
                        Settings
                    </Link>
                    <button onClick={handleLogout} className="btn btn-secondary">
                        Logout
                    </button>
                </div>
            </div>
        );
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-opacity-75 sticky-md-top">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logoVideo} alt="" style={{ width: '162px', height: '60px' }} />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-md-auto">
                        {isLoggedIn ? (
                            <>
                                <div className='profile-div'>
                                    <span>{name}</span>
                                    <span>Balance: ${balance}</span>
                                </div>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/dashboard" className="nav-link">
                                        Dashboard
                                    </Link>
                                </li>
                                {isVa && (
                                    <li className="nav-item">
                                        <Link to="/history" className="nav-link">
                                            History
                                        </Link>
                                    </li>
                                )}
                                {!isVa && (
                                    <li className="nav-item">
                                        <Link to="/select" className="nav-link">
                                            Hire
                                        </Link>
                                    </li>
                                )}
                                {!isVa && (
                                    <li className="nav-item">
                                        <Link to="/transactions" className="nav-link">
                                            Finance
                                        </Link>
                                    </li>
                                )}
                                {!isVa && (
                                    <li className="nav-item">
                                        <Link to="/buyCrunchcard" className="nav-link">
                                            Buy CrunchCard
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-item mobile-logout">
                                    <button onClick={handleLogout} className="btn btn-secondary">
                                        Logout
                                    </button>
                                </li>
                                <li className="nav-item profile-nav">{renderProfileDropdown()}</li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/buy" className="nav-link">
                                        Buy CrunchCard
                                    </Link>
                                </li>
                                <div className="header-btns">
                                    <li className="nav-item">
                                        <Link to="/login" className="btn btn-primary mr-2">
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/signup" className="btn btn-secondary">
                                            Signup
                                        </Link>
                                    </li>
                                </div>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
