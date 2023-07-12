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
        <div className="">
            <center> <h1> Registration </h1> </center>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label>First Name : </label>
                    <input type="text" placeholder="Enter First Name" name="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />

                    <label>Last Name : </label>
                    <input type="text" placeholder="Enter Last Name" name="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />

                    <label>Email : </label>
                    <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Username : </label>
                    <input type="text" placeholder="Enter Username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                    <label>Password : </label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <div style={{ "color": "red", "marginTop": "10px" }}>{error}</div>

                    <button type="submit">Sign Up</button>

                    Already have an account <Link to="/"> Click Here </Link>
                </div>
            </form>
        </div>
    )
}

export default Register