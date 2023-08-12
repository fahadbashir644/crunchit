import React from 'react';
import './Footer.css'
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-center text-white">
        <div className="container p-4 pb-0">
            <div className="row justify-content-center">
            <p className="menu">
                <Link to='/pages' className="nav-link footer-tags">Pages</Link>
                <Link to='/about' className="nav-link footer-tags">About</Link>
                <Link to='/contact' className="nav-link footer-tags">Contact</Link>
                <Link to='/company' className="nav-link footer-tags">Company</Link>
            </p>
            </div>
            <section className="mb-1">
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="https://facebook.com"
                role="button"
                ><FaFacebook></FaFacebook>
                </a>
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="https://twitter.com"
                role="button"
                ><FaTwitter></FaTwitter>
                </a>
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="https://google.com"
                role="button"
                ><FaGoogle></FaGoogle>
                </a>
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="https://instagram.com"
                role="button"
                ><FaInstagram></FaInstagram>
                </a>
            </section>
        </div>
        <div className="text-center p-3">
            © 2020 Copyright
        </div>
    </footer>
  );
}

export default Footer;
