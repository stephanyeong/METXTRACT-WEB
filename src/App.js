import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Carousel from './components/Carousel';
import Table from './components/Table';
import { MdOutlineLocationOn, MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { fontStyle } from '@mui/system';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Carousel />
      <div className="table">
        <Table />
      </div>
      <footer className="footer">
        <div className="footer-section1">
          <h3>METXTRACT</h3>
          <p>METXTRACT serves as a platform for scholarly research, providing a comprehensive range of features and resources tailored to the needs of academics, researchers, and students. It serves as our final requirement for Capstone Project 2 for the first semester of the Academic Year 2023-2024.</p>
          <p className="copyright"><br/>Copyright:  CSE  |  JKB  |  JAB  |  RJB  |  EE</p>
        </div>
        <div className="footer-section2">
          <div className="new-h3">Get in Touch</div>
          <div className="contact-container">
            <MdOutlineLocationOn className="icon"/> <span>Nat'l Highway, Catbangen, City of San Fernando, LU, 2500</span>
          </div>
          <div className="contact-container">
            <MdOutlineMailOutline className="icon"/> <span>colestephany.estrada@student.dmmmsu.edu.ph</span>
          </div>
          <div className="contact-container">
            <MdOutlinePhone className="icon"/> <span>+63 947 991 3900</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
