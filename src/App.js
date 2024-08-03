import React from 'react';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Adminssion from "./components/Adminssion"
import Admissionsform from './components/Admissionsform';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from '@mantine/core';
function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Adminssion" element={<Adminssion />} />
          <Route path="/Admissionsform" element={<Admissionsform />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App;