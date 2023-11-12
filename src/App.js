import React, { useEffect, useState } from 'react';
import { app } from './firebase'; 
import './App.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './style.css';
import NavigationBar from './components/NavigationBar';
import Table from './components/Table';


function App() {

  return (
    <div className="App">
      <NavigationBar />
      {/* <header>
        <h1>Research Publication</h1>
      </header> */}
      <div className="table">
      <Table />
      </div>
    </div>
  );
}

export default App;