import React, { useEffect, useState } from 'react'
import axios from "axios"

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("token");
        // localStorage.clear();
        window.location.replace("/")
    }

    const fetchData = async () => {
        if (!localStorage.getItem("token")) {
            localStorage.clear();
            window.location.replace("/")
        }

        let { data } = await axios.get("http://localhost:3001/api/v1/auth/current-user", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        setUserInfo(data.user)

    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <>
            <div style={{ "margin": "10px" }}>
                <button type="button" onClick={handleLogout} style={{ "float": "right", "padding": "5px", "cursor": "pointer" }}>Logout</button>
                <h2 style={{ "width": "50%" }}>Dashboard</h2>
            </div>
            <div style={{ "margin": "30px 10px" }}>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                    </tr>
                    <tr>
                        <td>{userInfo.firstname} {userInfo.lastname}</td>
                        <td>{userInfo.email}</td>
                        <td>{userInfo.username}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Dashboard
