import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logoVideo from '../../Assets/logo.png';
import './Header.css';

function Header() {

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
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/select" className="nav-link">
                                Hire
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
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
