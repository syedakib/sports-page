import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toggle from '../ToggleTheme/Toggle';
import './Header.css';

const Header = ({ userName, handleLogout }) => {
    const [displayName, setDisplayName] = useState(userName);
    const [toggleOn, setToggleOn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setDisplayName(userName);
    }, [userName]);

    const handleToggle = () => {
        setToggleOn((prev) => {
            const newValue = !prev;
            if (newValue) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
            return newValue;
        });
    };

    return (
        <header className="header">
            <a href="/" className="logo-link">Barcelona Football Club</a>
            <ul className="navigation">
                <li className="link" onClick={() => navigate('/')}>Home</li>
                <li className="link" onClick={() => navigate('/players')}>Players</li>
                <li className="link" onClick={() => navigate('/the-club')}>The Club</li>
                <li className="link" onClick={() => navigate('/contact')}>Contact Us</li>
            </ul>
            <div className="controls">
                {displayName ? (
                    <>
                        <span className="welcome-message">Welcome, {displayName}!</span>
                        <button className="btn-logout" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <a href="/signup">
                        <button>Sign Up</button>
                    </a>
                )}
            </div>
            <div className="toggle-wrapper">
                <Toggle checked={toggleOn} onChange={handleToggle} />
            </div>

        </header>
    );
};

export default Header;