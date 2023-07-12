import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        // localStorage.clear();
        window.location.replace("/")
    }
    return (
        <>
            <div>Dashboard</div>
            <button type="button" onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Dashboard