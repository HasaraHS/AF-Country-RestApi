import React, { useEffect, useState } from 'react'
import Card from '../Components/Card';


const Test = () => {
  const [datas , setData] = useState([]);

  useEffect(() => {
    const fetchContries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all")
      const data = await response.json();
      setData(data)
    }
    fetchContries()
  } , [])

  return (
    <div>
      <Card datas={datas}/>
    </div>
  )
}

export default Test
