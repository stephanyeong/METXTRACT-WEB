import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

//Paths
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './components/Home';

function MainContent() {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Login />;
  }

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div
          className="main-content"
          style={{
            flex: 1,
            overflow: 'auto',
            paddingBottom: 15,
            backgroundColor: '#F4F7FE',
            boxSizing: 'border-box',
            minHeight: '100%',
          }}
        >
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="Home" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
function App() {
  return (
    <Router>
        <MainContent />
    </Router>
  );
}

export default App;