import React, {useState, useEffect, Component} from 'react';
import './App.css';
import { Button } from '@mui/material';
import axios from "axios";
import Checkmark from './components/checkmark';

function App() {

  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState(null);
  const [file2Url, setFile2Url] = useState(null);
  const [uploadSuccessful, setUploadSuccessful] = useState();
  
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
      setFileUrl(null)
      setUploadSuccessful(true)
    }
  }

  async function getImage() {
    // GET request
    var response = await fetch(
      "http://127.0.0.1:5000/image?img=beige_pants.jpeg" // Can change the img= to whatever image is stored in the photos folder (backend)
    )

    if (response.status == 200) {
      console.log("Get worked")
    }

    var res = await response.blob() // response needs to be a blob
    const imageUrl = URL.createObjectURL(res); //generates a temporary url for the selected file
    console.log(imageUrl)
    setFileUrl(imageUrl)
  }

  async function getImages() {
    // This should get one type of outfit (once linked to AI)
    var shirt = "black_tshirt.jpeg"
    var pant = "beige_pants.jpeg"
  
    var queryString = shirt + "," + pant
    // GET request
    var response = await fetch(
      "http://127.0.0.1:5000/images?imgs="+queryString
    )

    if (response.status == 200) {
      console.log("Get worked")
    }

    var res = await response.blob() // response needs to be a blob

    // unzip file using JSZip
    var JSZip = require("jszip");

    const zip = new JSZip();
    const zipContent = await zip.loadAsync(res); // Load zip file
    
    // Extract files (all files are images so no need to filter)
    const imageFiles = Object.values(zipContent.files);
    // With filtering (untested):
    //const imageFiles = Object.values(zipContent.files).filter((file) =>
    //file.dir ? false : /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    //);

    // Blob each one to be able to createObjectURL and then display it
    var i = 0;
    for (var image of imageFiles) {
      const blob = await image.async('blob');
      const imageUrl = URL.createObjectURL(blob);
      if (i==0) {
        setFileUrl(imageUrl)
      } else {
        setFile2Url(imageUrl)
      }
      
      i = 1
    }

    console.log(imageFiles)
 
  }

  async function getImagesFormal() {
    // This should get a formal outfit (once linked to AI)
    var shirt = "blazer_small.jpeg"
    var pant = "small_dresspants.png"
  
    var queryString = shirt + "," + pant
    // GET request
    var response = await fetch(
      "http://127.0.0.1:5000/images?imgs="+queryString
    )

    if (response.status == 200) {
      console.log("Get worked")
    }

    var res = await response.blob() // response needs to be a blob

    // unzip file using JSZip
    var JSZip = require("jszip");

    const zip = new JSZip();
    const zipContent = await zip.loadAsync(res); // Load zip file
    
    // Extract files (all files are images so no need to filter)
    const imageFiles = Object.values(zipContent.files);
    // With filtering (untested):
    //const imageFiles = Object.values(zipContent.files).filter((file) =>
    //file.dir ? false : /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    //);

    // Blob each one to be able to createObjectURL and then display it
    var i = 0;
    for (var image of imageFiles) {
      const blob = await image.async('blob');
      const imageUrl = URL.createObjectURL(blob);
      if (i==0) {
        setFileUrl(imageUrl)
      } else {
        setFile2Url(imageUrl)
      }
      
      i = 1
    }

    console.log(imageFiles)

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
      <h1 style={{marginBottom: "10px"}}>ClosetAI</h1>
      <p>Your personal AI stylist.</p>
      <br/>
      <Button className="button-style" variant="outlined" onClick={
        getImages
      }>Get a casual outfit</Button>
      <br/>
      <Button className="button-style" variant="outlined" onClick={
        getImagesFormal
      }>Get a formal outfit</Button>
      <br/>
      <Button className="button-style" variant="outlined">
      <label>
        Upload an Image
        <input type="file" accept="image/*" onChange={processImage} />
      </label>
      </Button>
      <Button onClick={
        handleSave
      }>Save Image</Button>
      <div>{uploadSuccessful && <Checkmark/>}</div>
      <img class="image-preview" src={fileUrl}/>
      <img class="image-preview" src={file2Url}/>
      {/* 
      <Button variant="outlined" onClick={
        getImage
      }>Get one item</Button>
      <br/>
      */}
    </div>
      
    </div>
  );

}

export default App;
