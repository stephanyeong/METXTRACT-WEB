import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Carousel from './components/Carousel';
import Table from './components/Table';
import { MdOutlineLocationOn, MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Carousel />
      <div className="disclaimer-text">
        <strong>Disclaimer:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit odio, aliquam quis dui vel, fermentum luctus nisl. Donec in maximus lectus, ut venenatis velit. Nam sagittis et ante et convallis. Nulla quis scelerisque turpis. Duis sodales porttitor tellus. Vestibulum vestibulum turpis commodo turpis consequat, convallis mollis elit fermentum. Aenean efficitur gravida risus ut malesuada. Cras at tortor nec lorem tempor suscipit.
        <hr className="divider"/>
      </div>
      <div className="table">
        <Table />
      </div>
      <footer className="footer">
        <div className="footer-section1">
          <h3>METXTRACT</h3>
          <p>insert *what is METXTRACT?* - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. </p>
          <p><br/>Copyright: insert *initial*</p>
        </div>
        <div className="footer-section2">
          <div className="contact_title">Get in Touch</div>
          <div className="contact-container">
            <MdOutlineLocationOn className="icon"/> <span>8819 Ohio St. South Gate, CA 90280</span>
          </div>
          <div className="contact-container">
            <MdOutlineMailOutline className="icon"/> <span>metxtract@gmail.com</span>
          </div>
          <div className="contact-container">
            <MdOutlinePhone className="icon"/> <span>+639614222665</span>
          </div>
        </div>
        <div className="footer-section3">
          <div className="socials">
            <div className="socials_container"><FaFacebookF className="icon_socials"/></div>
            <div className="socials_container"><FaInstagram className="icon_socials"/></div>
            <div className="socials_container"><FaXTwitter className="icon_socials"/></div>
            <div className="socials_container"><MdOutlineMailOutline className="icon_socials"/></div>
          </div>
          <div className="socials_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
