import React, { useEffect, useState } from 'react';
import { app } from './firebase'; 
import './App.css';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import './style.css';
function App() {
 const [dataSet, setDataSet] = useState([]);

 async function fetchDataFromPdfList() {
    const db = getFirestore(app);
    const pdfListRef = collection(db, 'pdfList');

    try {
      const querySnapshot = await getDocs(pdfListRef);
      const newData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        newData.push(data);
      });
      setDataSet(newData);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
 }

 useEffect(() => {
    fetchDataFromPdfList();
 }, []);

 return (
    <div className="App">
      <header>
        <h1>Research Publication</h1>
      </header>
      <main>
        <ul className="publication-list">
          {dataSet.map((data, index) => (
            <li key={index} className="publication-item">
              <div className="publication-title">{data.title}</div>
              <div className="publication-authors">{data.authors}</div>
              <div className="publication-date">{data.publicationDate}</div>
            </li>
          ))}
        </ul>
      </main>
    </div>
 );
}

export default App;