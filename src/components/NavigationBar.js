import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/NavigationBar.css';
import {
  MdOutlineLocationOn,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from 'react-icons/md';
import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';

function NavigationBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navigation">
      <div className="brand-container">
        {isMobile ? (
          <img src="images/logo.png" alt="Logo" className="logo-image" />
        ) : (
          <>
            <a href="/" className="brand-name">
              METXTRACT
            </a>
            <img src="images/logo.png" alt="Logo" className="logo-image-web" />
          </>
        )}
      </div>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? 'navigation-menu expanded' : 'navigation-menu'
        }
      >
        <ul>
          <li>
            <div className="hb-section1">
              <h3>METXTRACT</h3>
              <p className="hb-section1text">
                insert *what is METXTRACT?* - Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Sed do eiusmod tempor.{' '}
              </p>
            </div>
          </li>
          <li>
            <div className="hb-section2">
              <h3>GET IN TOUCH</h3>
              <div className="hb-contact-container">
                <MdOutlineLocationOn className="icon" />{' '}
                <span>8819 Ohio St. South Gate, CA 90280</span>
              </div>
              <div className="hb-contact-container">
                <MdOutlineMailOutline className="icon" />{' '}
                <span>metxtract@gmail.com</span>
              </div>
              <div className="hb-contact-container">
                <MdOutlinePhone className="icon" /> <span>+639614222665</span>
              </div>
            </div>
          </li>
          <li>
            <div className="hb-section3">
              <div className="hb-socials">
                <div className="hb-socials_container">
                  <FaFacebookF className="hb-icon_socials" />
                </div>
                <div className="hb-socials_container">
                  <FaInstagram className="hb-icon_socials" />
                </div>
                <div className="hb-socials_container">
                  <FaXTwitter className="hb-icon_socials" />
                </div>
                <div className="hb-socials_container">
                  <MdOutlineMailOutline className="hb-icon_socials" />
                </div>
              </div>
              <div className="hb-socials_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt.
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
