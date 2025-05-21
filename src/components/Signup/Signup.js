import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({setUserName}) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        if (name) {
            localStorage.setItem('userName', name);
            setUserName(name);
            navigate('/');
        }
    };

    return (
        <section className="signup-section">
            <div className="container">
                <h1>Sign Up</h1>
                <form className="signup-form" onSubmit={handleSignup}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            pattern="[A-Za-z\s]+"
                            title="Name should only contain letters and spaces."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            required
                            pattern="[0-9]{10}"
                            title="Phone number must be 10 digits."
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Country:</label>
                        <select id="country" name="country" required>
                            <option value="" disabled selected>
                                Select your country
                            </option>
                            <option value="usa">United States</option>
                            <option value="uk">India</option>
                            <option value="canada">England</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn-submit">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Signup;