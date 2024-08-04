import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER_URL } from '../server';

function Studentallform() {
  const [studentallform, setStudentallform] = useState([])
  useEffect(async () => {
    const res = await axios.get(`${SERVER_URL}/getstudentadmissionsform`)
    
    console.log("ghj", res)
  }, [])
  
  return (
    <div>
  
    </div>
  )
}


export default Studentallform;