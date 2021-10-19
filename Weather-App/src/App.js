import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [city, setCity]=useState("");
  const [result, setResult]=useState("");
  const [cityValue,setCityValue]=useState("");
  const [humidity,setHumidity]=useState("");
  const [pressure,setPressure]=useState("");
  const changeHandler=e=>{
    setCity(e.target.value);
  }
  
  const submitHandler=e=>{
    e.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=634af2a1558bead7e836b0768da1880a`).then(
      response => response.json()).then(
        data=>{
          const kelvin=data.main.temp;
          const celsius=kelvin - 273.15;
          const humidity=data.main.humidity;
          const place=data.name;
          const country=data.sys.country;
          const pressure=data.main.pressure;
         
          setResult("Temperature: "+Math.round(celsius)+"°C\n");
        setCityValue(place+","+country);
        setHumidity("Humidity: "+humidity);
        setPressure("Pressure: "+pressure);
        }
      ).catch(error => console.log(error))
      setCity("");
    
  }
  
  return (
    <div className="main-app">
   <center className="center-app">
     <div className="weather-app-display">
       <div className="input">
         <h3>Weather app</h3>
        
           <input className="input-field" type="text" name="city" onChange={changeHandler} value={city}></input><br></br>
         <button className="button" onClick={submitHandler}>Search</button> 
        
           
       
<div className="result">
<h3>{cityValue}</h3>
<h4>{result}</h4>

<h4>{humidity}</h4>
<h4>{pressure}</h4>
  
  </div>       
       </div>
     </div>
   </center>
   
    </div>
  );
}


export default App;
