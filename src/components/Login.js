import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, TextInput } from '@mantine/core';
import { SERVER_URL } from '../server';
function Login() {
    const intialState = {
        email: "",
        password: "",
    };
    const [login, setLogin] = useState(intialState);
    const [error, setError] = useState({ color: "red", visibility: "hidden" })
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();
    const inputHandler = (e) => {
        setError({ color: "red", visibility: "hidden" });
        setLogin({ ...login, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_URL}/login`, login);

            console.log("response", response)

            if (response.data.email) {
                navigate("/Adminssion");
            } else {
                setErrorMessage(response.data.message)
                setError({ color: "red", visibility: "visible" });
            }
        } catch (err) {
            console.log("Error while GET");

        }
    };
    return (
        <div className="container">
            <Card className="inner_container" shadow='sm' withBorder >
                <h3 className='center'>Login In</h3>
                <form>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Email" name="email" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Password" name="password" onChange={inputHandler} />
                    </div>
                    <div className="box1">
                    <Button onClick={submitHandler}>Login</Button>

                        <p>
                            <Link to="/SignUp"><b>SignUp</b></Link>
                        </p>
                    </div>
                    <span style={error}>{errorMessage}</span>
                </form>
            </Card>
        </div>
    )
}

export default Login;