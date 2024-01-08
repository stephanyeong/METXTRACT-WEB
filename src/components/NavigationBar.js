import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/NavigationBar.css';
import {
  MdOutlineLocationOn,
  MdOutlineMailOutline,
  MdOutlinePhone,
} from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token-uid");
  const [profileText, setProfileText] = useState("Sign In");
  const email = localStorage.getItem("email");
  useEffect(() => {
    if (token) {
      setProfileText("Sign Out");
    } else {
      setProfileText("Sign In");
    }
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleProfileIconClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token-uid");
    navigate("/");
  };

  return (
    <nav className="navigation">
      <div className="brand-container">
        {isMobile ? (
          <img src="images/logo.png" alt="Logo" className="logo-image" />
        ) : (
          <>
          <img src="images/logo.png" alt="Logo" className="logo-image-web" />
            <a href="/" className="brand-name">
              METXTRACT
            </a>
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
              METXTRACT serves as a platform for scholarly research, providing a comprehensive range of features and resources tailored to the needs of academics, researchers, and students. It serves as our final requirement for Capstone Project 2 for the first semester of the Academic Year 2023-2024.
              </p>
            </div>
          </li>
          <li>
            <div className="hb-section2">
              <h3>GET IN TOUCH</h3>
              <div className="hb-contact-container">
                <MdOutlineLocationOn className="icon" />{' '}
                <span>Nat'l Highway, Catbangen, City of San Fernando, LU, 2500</span>
              </div>
              <div className="hb-contact-container">
                <MdOutlineMailOutline className="icon" />{' '}
                <span>colestephany.estrada@student.dmmmsu.<br/>edu.ph</span>
              </div>
              <div className="hb-contact-container">
                <MdOutlinePhone className="icon" /> <span>+63 947 991 3900</span>
              </div>
            </div>
          </li>
          <li>
            <div className="hb-section3">
              <div className="hb-socials_text">
              <div className="copytitle">COPYRIGHT</div> 
              <div className="copyinitials">CSE &nbsp;|&nbsp; JKB &nbsp;|&nbsp; JAB &nbsp;|&nbsp; RJB &nbsp;|&nbsp; EE </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="profile-icon-container" onClick={handleProfileIconClick}>
        <FaUserCircle className="profile-icon" />
        {showProfileDropdown && (
          <div className="profile-dropdown">
            <p style={{ fontSize: '12px' }}>{email}</p>
            <button onClick={handleSignOut}>{profileText}</button>
          </div>
        )}
      </div>
    </nav>
    
  );
}

export default NavigationBar;
