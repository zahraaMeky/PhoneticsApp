import { useNavigate,Navigate } from 'react-router-dom';
import Login from './Login';
import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
function Logout() {
    const navigate = useNavigate();
    let user = localStorage.removeItem("username");
    navigate('/login');
    if (user == null) return < Navigate to="/" />;
}
export default Logout;