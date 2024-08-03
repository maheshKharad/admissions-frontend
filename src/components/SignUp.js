import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, TextInput } from '@mantine/core';
function SingUp() {
    const intialState = {

    };
    const [signup, setSignUp] = useState(intialState);
    const [error, setError] = useState({ color: "red", visibility: "hidden" })
    const navigate = useNavigate()
    const inputHandler = (e) => {
        setSignUp({ ...signup, [e.target.name]: e.target.value });
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(signup);
        if (signup.Password !== signup.confirmPassword) {
            setError({ color: "red", visibility: "visible" });
            navigate("/signup");
        }
        try {
            const response = await axios.post("http://localhost:5000/signup", signup);
            navigate("/");
            console.log(response)
        } catch (err) {
            console.log("Error post")
        }


    };
    return (
        <div className="container">
            <Card className="inner_container" shadow='sm' withBorder >
                <h3 className='center'>Sign Up</h3>
                <form>
                    <div className="box">
                        <TextInput className='input' variant="filled" type="collegename" placeholder="collegename" name="collegeName" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="address" name="address" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="city" name="city" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="pincode" name="pincode" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Email" name="email" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Password" name="password" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="conform Password" name="confirmPassword" onChange={inputHandler} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="mobile no" name="mobileNo" onChange={inputHandler} />
                    </div>
                    <div className="box1">
                        <button>Singup</button>
                        <p>
                            <Link to="/">
                                <b>Login</b>
                            </Link>
                        </p>
                    </div>
                    <span style={error}>Password and confirmPassword did not match</span>

                </form>
            </Card>
        </div>
    )
}

export default SingUp;