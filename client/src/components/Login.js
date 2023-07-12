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
        <div className="">
            <div>
                <center> <h1> Already Member </h1>  </center>
                <span style={{ "float": "right" }}><Link to="/needhelp" style={{ pointerEvents: needhelp ? 'none' : '' }}> Need Help </Link></span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="container">

                    <label>Username : </label>
                    <input type="text" placeholder="Enter Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <div style={{ "disply": "flex" }}>
                        <label>Password : </label>
                        <input type={passwordType} placeholder="Enter Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <i onClick={togglePassword}>
                            {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                        </i>
                    </div>

                    <div style={{ "color": "red", "marginTop": "10px" }}>{error}</div>

                    <button type="submit">Sign In</button>

                    Dont have an account yet <Link to="/register"> Create an account </Link>

                    <Link to="/needhelp" style={{ pointerEvents: needhelp ? '' : 'none' }}> Need Help </Link>
                </div>
            </form>
        </div>


    )
}

export default Login