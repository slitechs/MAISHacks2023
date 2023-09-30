import React, {useState, useEffect} from 'react';

function App() {

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
      <div className="App-header">
                <h1>Data</h1>
                {/* Calling a data from setdata for showing */}
                <p>{data.name}</p>
                <p>{data.age}</p>
                <p>{data.date}</p>
                <p>{data.programming}</p>
 
      </div>
    </div>
  );
}

export default App;
