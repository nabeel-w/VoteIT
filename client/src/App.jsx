import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
// import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import OtpPage from './OtpPage';
// import LandingPage from './LandingPage';

function App() {
  return (
            <>
                <Routes>
                    <Route exact path="/login" element={<LoginPage />} />
                    <Route exact path="/register" element={<RegisterPage/>} />
                    <Route exact path="/otp" element={<OtpPage/>} />
                    <Route exact path="/home"/>
                    <Route exact path="/" element={<Home />}/>
                </Routes>
            </>
  );
}

export default App;
