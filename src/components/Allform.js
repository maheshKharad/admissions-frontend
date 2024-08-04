import React, { useEffect, useState } from 'react';
import { Card, Button, NavLink, Title, Grid, TextInput } from '@mantine/core';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Text } from '@mantine/core';
import { SERVER_URL } from '../server';

export const AllForm = () => {
    // const [component, setComponent] = useState('createComponent');
    const [data, setData] = useState([]);
    const [studentsData, setStudentsData] = useState([])
    const [selectedFormId, setSelectedFormId] = useState('')
    const [selectedStudent, setSelectedStudent] = useState();
    const [opened, { open, close }] = useDisclosure(false);
    const [updateData, setUpdateData] = useState({});

    const getdata = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/getAdmissionForms`);
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching admission forms:", error);
        }
    };
    const handleOpenStudentData = async (id) => {
        try {
            setStudentsData([]);
            setSelectedFormId(id);
            const response = await axios.post(`${SERVER_URL}/getstudentadmissionsform?formId=${id}`);
            setStudentsData(response.data.data);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };
    const handleClickOpen = (student) => {
        setSelectedStudent(student);
        setUpdateData(student);
        open();
    };
    const handleDeleteStudent = async (studentId) => {
        try {

            setSelectedFormId(studentId);
            const response = await axios.delete(`${SERVER_URL}/deletestudent?studentId=${studentId}`);
            setStudentsData(response.data.data);
            setStudentsData(studentsData.filter(student => student._id !== studentId));
        } catch (error) {
            console.error("Error deleting student data:", error);
        }
    };
    const handleDeleteStudentData = async (formId) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/deleteform?formId=${formId}`);
            setData(data.filter(form => form._id !== formId));
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };
    const handleInputChange = (e,field) => {
        
        setUpdateData(preState => ({
            ...preState, 
            [field]: e.target.value
        }));
    };
    const handleUpdateStudent = async () => {
        updateData['studentId'] = selectedStudent._id
        try {
            const response = await axios.put(`${SERVER_URL}/updatestudent`, updateData);
            setStudentsData(studentsData.map(student => student._id === selectedStudent._id ? response.data.data : student))
            close();
            handleOpenStudentData(selectedFormId)
        } catch (error) {
            console.error("Error udate student data:", error);
        }
    };
    useEffect(() => {
        getdata()
    }, []);
    return (
        <>
            <Grid style={{ width: '80vw' }}>
                <Grid.Col span={4} >
                    {Array.isArray(data) ? data.map((form, i) => (
                        <div className="allFormContainer" key={form._id}>
                            <Card className="inner_container" shadow="md" radius="md" withBorder>
                                <div className='p' >
                                    <div>
                                        <Title order={3}>{form.title}</Title>
                                    </div>
                                    <div>
                                        <NavLink variant="filled" style={{ backgroundColor: '#ddddf8', marginTop: '20px', borderRadius: '10px' }} label={`http://localhost:3000/Admissionsform?formId=${form._id}`} href={`http://localhost:3000/Admissionsform?formId=${form._id}`} />
                                    </div>
                                </div>
                                <div className='h1'>
                                    <Button style={{ margin: '5px' }} color='#00008b' onClick={() => { handleOpenStudentData(form._id) }}>Open</Button>
                                    <Button style={{ margin: '5px' }} color='#ff4500' onClick={() => { handleDeleteStudentData(form._id) }}>Delete</Button>
                                </div>
                            </Card>

                        </div>
                    )) : null}
                </Grid.Col>
                <Grid.Col span={8}>
                    <div className='studentCard'>
                        {Array.isArray(studentsData) && studentsData.length > 0 ? studentsData.map((student) => (
                            <Card shadow='md' radius='md' withBorder style={{ margin: '10px' }} key={student._id}>
                                <div style={{ display: 'flex', alignContent: 'space-between' }}>
                                    <div style={{ width: '500px' }}>
                                        <TextInput className='input' variant="filled" placeholder="Name" value={student.name} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Button style={{ margin: '5px' }} color='#05b124' onClick={() => handleClickOpen(student)}>Open</Button>
                                        <Button style={{ margin: '5px' }} color='#ff082d' onClick={() => handleDeleteStudent(student._id)}>Delete</Button>
                                    </div>
                                </div>
                            </Card>
                        )) : <div>No data Available</div>}
                    </div>
                </Grid.Col>
            </Grid>
            <Modal opened={opened} onClose={close} title="Student Data">
                {selectedStudent && (
                    <div>
                        <TextInput name='name' label='Name' value={updateData.name} onChange={(e) => { handleInputChange(e, 'name') }} />
                        <TextInput name='address' label='Address' value={updateData.address} onChange={(e) => { handleInputChange(e, 'address') }} />
                        <TextInput name='dob' label='Date Of Birth' value={updateData.dob} onChange={(e) => { handleInputChange(e, 'dob') }} />
                        <TextInput name='tenthPercentage' label='10th Percentage' value={updateData.tenthPercentage} onChange={(e) => { handleInputChange(e, 'tenthPercentage') }} />
                        <TextInput name='twelfthPercentage' label='12th Percentage' value={updateData.twelfthPercentage} onChange={(e) => { handleInputChange(e, 'twelfthPercentage') }} />
                        <TextInput name='fees' label='Fees' value={updateData.fees} onChange={(e) => { handleInputChange(e, 'fees') }} />
                        <TextInput name='mobileNo' label='MobileNo' value={updateData.mobileNo} onChange={(e) => { handleInputChange(e, 'mobileNo') }} />
                        <Button className='Text' onClick={handleUpdateStudent}>Update</Button>
                    </div>
                )}
            </Modal>
        </>
    );
};