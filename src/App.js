import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Players from './components/Players/players';
import { PlayersProvider } from './components/useContexts/PlayerContext';
import { ThemeProvider } from './components/useContexts/ThemeContext';

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
        <ThemeProvider>
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
        </ThemeProvider>
    );
};

export default App;
