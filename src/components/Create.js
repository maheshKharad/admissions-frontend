import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Card, TextInput } from '@mantine/core';
export const Create = () => {

    const [error, setError] = useState({ color: "red", visibility: "hidden" })
    const [errorMessage, setErrorMessage] = useState('')
    const [title, setTitle] = useState('')
    const [endingDateOfForm, setEndingDateOfForm] = useState('')
    const [branchName, setBranchName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [aFees, setAFees] = useState('')

    const navigate = useNavigate();

    const submitHandler = async () => {
        const data = {
            title: title,
            endingDateOfForm: endingDateOfForm,
            branchName: branchName,
            aFees: aFees
        }
        try {
            const response = await axios.post("http://localhost:5000/create", data);
            console.log("response", response)

            if (response.data.email) {
                navigate("/create");
            } else {
                setErrorMessage(response.data.message)
                setError({ color: "red", visibility: "visible" });
            }
        } catch (err) {
            console.log("Error while GET");
        }
        clearForm()
    };
    const clearForm = () => {
        setTitle("")
        setEndingDateOfForm("")
        setBranchName("")
        setAFees("")
    }
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleEndingDateOfForm = (e) => {
        setEndingDateOfForm(e.target.value)
    }
    const handleBranchName = (e) => {
        setBranchName(e.target.value)
    }
    const handleEmailId = (e) => {
        setEmailId(e.target.value)
    }
    const handleAFees = (e) => {
        setAFees(e.target.value)
    }

    return (
        <div className="container">
            <Card className="inner_container" shadow='sm' withBorder>
                <h3 className='center'>Create Form</h3>
                <TextInput className='input' variant="filled" placeholder="Title" value={title} onChange={handleTitle} />
                <TextInput className='input' variant="filled" placeholder="Date Of Submission" value={endingDateOfForm} onChange={handleEndingDateOfForm} />
                <TextInput className='input' variant="filled" placeholder="Branch Name" value={branchName} onChange={handleBranchName} />
                <TextInput className='input' variant="filled" placeholder="Admission Fees" value={aFees} onChange={handleAFees} />
                <Button onClick={submitHandler}>Submit</Button>
            </Card>
        </div>

    )

}

