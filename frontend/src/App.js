import React, {useState, useEffect, Component} from 'react';
import './App.css';
import { Button } from '@mui/material';

function App() {

  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState(null);

  function processImage(e) {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile); //generates a temporary url for the selected file
    setFileUrl(imageUrl)
  }

  const [data,setData] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });

  useEffect(() => {
    // Using fetch to fetch the api from flask server it will be redirected to proxy
    fetch("/data").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setData({
                name: data.Name,
                age: data.Age,
                date: data.Date,
                programming: data.programming,
            });
            console.log(data)
        })
    );
  }, []); // pass in empty array to ensure this only runs once

  return (
    <div className="App">
      {/*
        <div className="example">
                <h1>Data</h1>
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
 
      </div>
      */}
    <div className="App-header">
      <h1>ProjectName</h1>
      <p>Subheading.</p>
      <Button variant="outlined">
      <label>
        Upload an Image
        <input type="file" accept="image/*" onChange={processImage} />
      </label>
      </Button>
      <Button>Save</Button>
      <img class="image-preview" src={fileUrl}/>
    </div>
      
    </div>
  );
}

export default App;
