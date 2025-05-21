import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Players from './components/Players/players';
import { PlayersProvider } from './PlayerContext';

const App = () => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
          setUserName(storedUserName);
      }
  }, []);

    const handleLogout = () => {
        localStorage.removeItem('userName');
        setUserName('');
    };

    return (
        <Router>
            <Header userName={userName} handleLogout={handleLogout} />
            <PlayersProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup setUserName={setUserName}  />} />
                <Route path="/players" element={<Players />} />
            </Routes>
            </PlayersProvider>
        </Router>
    );
};

export default App;
