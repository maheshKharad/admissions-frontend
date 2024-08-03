import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Studentallform() {
  const [studentallform, setStudentallform] = useState([])
  useEffect(async () => {
    const res = await axios.get('http://localhost:5000/getstudentadmissionsform')
    
    console.log("ghj", res)
  }, [])
  
  return (
    <div>
  
    </div>
  )
}


export default Studentallform;