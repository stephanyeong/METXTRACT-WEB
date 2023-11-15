import React from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Carousel from './components/Carousel';
import Table from './components/Table';

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
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>Twitter</p>
          <p>Facebook</p>
          <p>Instagram</p>
        </div>
        <div className="footer-section">
          <h3>Address</h3>
          <p>123 Main Street</p>
          <p>City, Country</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
