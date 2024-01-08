import React from 'react';
import '../App.css';
import NavigationBar from './NavigationBar';
import Carousel from './Carousel';
import Table from './Table';
import { MdOutlineLocationOn, MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";


function Home() {
  return (
    <div className="App">
      <NavigationBar />
      <Carousel />
      <div className="table">
        <Table />
      </div>
      <footer className="footer">
        <div className="footer-section1">
          <h3>About Us</h3>
          <p>METXTRACT serves as a platform for scholarly research, providing a comprehensive range of features and resources tailored to the needs of academics, researchers, and students. It serves as our final requirement for Capstone Project 2 for the first semester of the Academic Year 2023-2024.</p>
          <p className="copyright"><br/>Copyright:  CSE  |  JKB  |  JAB  |  RJB  |  EE</p>
        </div>
        <div className="footer-section2">
          <div className="new-h3">Contact Us</div>
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

export default Home;
