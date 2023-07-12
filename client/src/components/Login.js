import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from "react-router-dom"
import 'font-awesome/css/font-awesome.min.css';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
    const [needhelp, setNeedHelp] = useState("")
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post('http://localhost:3001/api/v1/auth/login', { username, password })

            if (data.success) {
                localStorage.setItem('token', data.token)
                window.location.replace("/")
            } else {
                console.log(data.message)
                setError(data.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setNeedHelp(username.length > 0 || password.length > 0);
    }, [username, password]);

    console.log(needhelp);
    return (
        <div className="container">
            <div className="card">
                <div className="text">
                    <h3>Already Member</h3>
                    <p style={{ "marginTop": "10px" }}><Link to="/needhelp" style={{ pointerEvents: needhelp ? 'none' : '' }}> Need Help </Link></p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-text">
                        <input type="text" placeholder="Enter Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    </div>
                    <div className="input-text">
                        <input type={passwordType} placeholder="Enter Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <i onClick={togglePassword}>
                            {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                        </i>
                    </div>
                    <h6 style={{ "color": "red", "marginTop": "10px", "marginLeft": "10px" }}>{error}</h6>
                    <div className="buttons">
                        <button type="submit">Sign in</button>
                    </div>
                    <div className="forgot">
                        <h3>Dont have an account yet. <Link to="/register"> Create an account </Link></h3>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
