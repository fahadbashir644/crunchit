import React from 'react';
import './Footer.css'
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-center text-white">
        <div className="container p-4 pb-0">
            <div className="row justify-content-center">
            <p className="menu">
                <a href="#">Pages</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
                <a href="#">Company</a>
            </p>
            </div>
            <section className="mb-1">
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="#"
                role="button"
                ><FaFacebook></FaFacebook>
                </a>
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="#"
                role="button"
                ><FaTwitter></FaTwitter>
                </a>
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="#"
                role="button"
                ><FaGoogle></FaGoogle>
                </a>
                <a
                className="btn btn-outline-light rounded-circle btn-floating m-1"
                href="#"
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
