import React, {useState, useEffect, Component} from 'react';
import './App.css';
import { Button } from '@mui/material';
import axios from "axios";

function App() {

  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState(null);
  
  function processImage(e) {
    const imageFile = e.target.files[0];
    setFile(imageFile)
    const imageUrl = URL.createObjectURL(imageFile); //generates a temporary url for the selected file
    setFileUrl(imageUrl)
  }

  async function handleSave(e) {
    console.log("save pressed")

    const formData = new FormData();
    formData.append("file", file) // file in backend

    // POST request to send image to backend
    var response = await fetch(
      "http://127.0.0.1:5000/upload",
      {
        method: "post",
        body: formData
      }
    )

    if (response.status == 200) {
      console.log("It worked")
    }
  }

  async function getImage() {
    var image_name = "Google_logo.png"
    // GET request
    var response = await fetch(
      "http://127.0.0.1:5000/image?img="+image_name
    )

    if (response.status == 200) {
      console.log("Get worked")
    }

    console.log(response)
  }

  // Axios POST (unused)
  const handleSubmit = (e) => {
    e.preventDefault();

    const imageData = {
      url: fileUrl
    }
    axios.post("http://localhost:5000/upload", imageData).then((response) => {
      console.log(response.status, response.data.token);
    });

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
      <Button onClick={
        handleSave
      }>Save</Button>
      <img class="image-preview" src={fileUrl}/>

      <Button variant="outlined" onClick={
        getImage
      }>Outfit Option 1</Button>
      <Button variant="outlined" onClick={
        getImage
      }>Outfit Option 2</Button>
    </div>
      
    </div>
  );
}

export default App;
