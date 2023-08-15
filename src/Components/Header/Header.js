import React from 'react';
import {Link} from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-opacity-75 sticky-md-top ">
    <div className="container">
        <Link to="/" className="navbar-brand"><h3>Crunch<span className="text-primary">It</span></h3></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-md-auto">
                <li className="nav-item">
                    <Link to='/' className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to='/select' className="nav-link">Hire</Link>
                </li>
                <li className="nav-item">
                    <Link to='/buy' className="nav-link">Buy CrunchCard</Link>
                </li>
                <li className="nav-item">
                    <Link to='/contact' className="nav-link">Contact Us</Link>
                </li>
            </ul>

        </div>
    </div>
</nav>
  );
}

export default Header;
