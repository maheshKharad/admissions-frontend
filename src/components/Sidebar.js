import React, { Component, useState } from 'react';
import { Create } from "./Create";
import { AllForm } from "./Allform";
import { useDisclosure } from '@mantine/hooks';
import { Drawer, Button, Image, Divider } from '@mantine/core';
import { Burger } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const Sidebar = (params) => {
    const [component, setComponent] = useState('createComponent')
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const handleClickCreateForm = () => {
        console.log("hello")
        setComponent('createComponent')
        close()
    }
    const handleClickAllForm = () => {
        console.log("bye")
        setComponent('allFormComponent')
        close()
    }
    const handleClickLogout = () => {
        navigate("/");
    }

    return (
        <>
            <div className='mainapp'>
                <div className='burger'>
                    <Burger onClick={open} opened={opened} />
                </div>
                <div className='css'>
                    <Drawer opened={opened} overlayProps={{ backgroundOpacity: 0.5, blur: 1 }} size="200" onClose={close} withCloseButton={false}>
                        <div className='drawer'>
                            <div>
                                <Image
                                    radius="md"
                                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                                />
                                <Divider my="md" />
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <div className='Btn1'>
                                    <Button variant="light" onClick={handleClickCreateForm}>Create forms</Button>
                                </div>
                                <div className='Btn1'>
                                    <Button variant="light" onClick={handleClickAllForm}>All forms</Button>
                                </div>
                            </div>
                            <div className='Btn1' style={{ position: 'absolute', bottom: '10px' }}>
                                <Button variant="filled" onClick={handleClickLogout}>LogOut</Button>
                            </div>
                        </div>
                    </Drawer>
                </div>
                <div className='allForm'>{component === 'createComponent' ? <Create /> : <AllForm />}</div>
            </div>
        </>
    );
}