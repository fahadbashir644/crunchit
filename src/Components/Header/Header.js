import React from 'react';

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark bg-opacity-75 sticky-md-top ">
    <div className="container">
        <a className="navbar-brand" href="#"><h3>Crunch<span className="text-primary">It</span></h3></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ms-md-auto">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#home">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Hire</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Buy CrunchCard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="">Contact Us</a>
                </li>
            </ul>

        </div>
    </div>
</nav>
  );
}

export default Header;
