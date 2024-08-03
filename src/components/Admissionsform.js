import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, Grid, TextInput } from '@mantine/core';

function Admissionsform() {
    const [searchParams, setSearchParams] = useSearchParams();
    const formId = searchParams.get("formId")
    let isFormId = false
    if (formId) {
        isFormId = true
    }
    const [error, setError] = useState({ color: "red", visibility: "hidden" })
    const [errorMessage, setErrorMessage] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [dob, setDob] = useState('')
    const [tenthpercentage, setTenthPercentage] = useState('')
    const [twelfthpercentage, setTwelfthPercentage] = useState('')
    const [fees, setFees] = useState('')
    const [mobileno, setMobileNo] = useState('')

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            name: name,
            address: address,
            formId: formId,
            dob: dob,
            tenthPercentage: tenthpercentage,
            twelfthPercentage: twelfthpercentage,
            fees: fees,
            mobileNo: mobileno
        }

        try {
            const response = await axios.post("http://localhost:5000/submitstudentadmissionsform", data);
            console.log("response", response)

            if (response.data.data) {
                navigate("/admissionsform");

            } else {
                setErrorMessage(response.data.message)
                setError({ color: "red", visibility: "visible" });
            }
        } catch (err) {
            setErrorMessage("An error occurred while submitting the form.");
            setError({ color: "red", visibility: "visible" });
            console.error(err);

        }
        clearForm()

    };

    const clearForm = () => {
        setName("")
        setAddress("")
        setDob("")
        setTenthPercentage("")
        setTwelfthPercentage("")
        setMobileNo("")
        setFees("")

    }
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleDob = (e) => {
        setDob(e.target.value)
    }
    const handleTenthPercentage = (e) => {
        setTenthPercentage(e.target.value)
    }
    const handleTwelfthPercentage = (e) => {
        setTwelfthPercentage(e.target.value)
    }
    const handleFees = (e) => {
        setFees(e.target.value)
    }
    const handleMobileNo = (e) => {
        setMobileNo(e.target.value)
    }
    return (
        <>
            <Card className='studentadmissioncontainer' shadow='lg' withBorder>
                {isFormId === true ? <div className='inner_container'>
                    <h3>Admissionsform</h3>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Name" value={name} onChange={handleName} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Address" value={address} onChange={handleAddress} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Dob" value={dob} onChange={handleDob} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Tenth Percentage" value={tenthpercentage} onChange={handleTenthPercentage} />
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Twelfth Percentage" value={twelfthpercentage} onChange={handleTwelfthPercentage} />
                    </div>
                    <div className="box">
                    <Grid>
                    <Grid.Col span={7}>
                        <TextInput className='input' variant="filled" placeholder="Fees" value={fees} onChange={handleFees} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Button onAuxClick={submitHandler}>Pay Fees</Button>
                    </Grid.Col>
                    </Grid>
                    </div>
                    <div className="box">
                        <TextInput className='input' variant="filled" placeholder="Mobile No" value={mobileno} onChange={handleMobileNo} />
                    </div>
                    <div className="pay">
                        <Button onClick={submitHandler}>Submit</Button>

                    </div>
                </div> : <div>form link not valid</div>}
            </Card>
        </>
    )
}

export default Admissionsform;












