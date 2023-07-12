import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Register = () => {
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")
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
            let { data } = await axios.post('http://localhost:3001/api/v1/auth/register', { firstname, lastname, email, username, password })

            if (data.success === true) {
                console.log("Success")
                window.location.replace("/login")
            } else {
                console.log(data)
                setError(data.message)
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="text">
                    <h3>Registration</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-text">
                        <input type="text" placeholder="Enter First Name" name="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />

                    </div>
                    <div className="input-text">
                        <input type="text" placeholder="Enter Last Name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />

                    </div>
                    <div className="input-text">
                        <input type="email" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    </div>
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
                        <button type="submit">Sign Up</button>
                    </div>
                    <div className="forgot">
                        <h3>Already have an account <Link to="/"> Click Here </Link></h3>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
