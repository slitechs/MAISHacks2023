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

  const [galleryUrl1, setGalleryUrl1] = useState(null);
  const [galleryUrl2, setGalleryUrl2] = useState(null);
  const [galleryUrl3, setGalleryUrl3] = useState(null);
  const [galleryUrl4, setGalleryUrl4] = useState(null);
  
  function processImage(e) {
    const imageFile = e.target.files[0];
    setFile(imageFile)
    const imageUrl = URL.createObjectURL(imageFile); //generates a temporary url for the selected file
    setFileUrl(imageUrl)
    setUploadSuccessful(false) // Get rid of the "saved!" message
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

  // Get an image when you know its path
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

  // Get multiple images when you know their paths
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

  // The actual function to be used to generate the outfit (casual)
  async function generateOutfitCasual() {

    var queryString = "casual"

    // GET request
    var response = await fetch(
      "http://127.0.0.1:5000/model?outfit="+queryString
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

    // Make sure there are no other photos showing
    setGalleryUrl1(null)
    setGalleryUrl2(null)
    setGalleryUrl3(null)
    setGalleryUrl4(null)

    setUploadSuccessful(false)

  }

  // The actual function to be used to generate the outfit (formal)
  async function generateOutfitFormal() {

    var queryString = "formal"

    // GET request
    var response = await fetch(
      "http://127.0.0.1:5000/model?outfit="+queryString
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

    // Make sure there are no other photos showing
    setGalleryUrl1(null)
    setGalleryUrl2(null)
    setGalleryUrl3(null)
    setGalleryUrl4(null)

    setUploadSuccessful(false)

  }

  // Get all photos
  async function getAllPhotos() {
    // GET request
    var response = await fetch(
      "http://127.0.0.1:5000/gallery"
    )

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
        setGalleryUrl1(imageUrl)
      } else if (i == 1) {
        setGalleryUrl2(imageUrl)
      } else if (i == 2) {
        setGalleryUrl3(imageUrl)
      } else if (i == 3) {
        setGalleryUrl4(imageUrl)
      }
      
      i = i+1
    }

    console.log(imageFiles)

    // Make sure there are no other photos showing
    setFileUrl(null)
    setFile2Url(null)
    setUploadSuccessful(false)

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
        generateOutfitCasual
      }>Get a casual outfit</Button>
      <br/>
      <Button className="button-style" variant="outlined" onClick={
        generateOutfitFormal
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
      <br/>
      <Button onClick={
        getAllPhotos
      } variant="outlined">Photo Gallery</Button>
      <img class="image-preview" src={fileUrl}/>
      <img class="image-preview" src={file2Url}/>

      <img class="image-gallery" src={galleryUrl1}/>
      <img class="image-gallery" src={galleryUrl2}/>
      <img class="image-gallery" src={galleryUrl3}/>
      <img class="image-gallery" src={galleryUrl4}/>
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
