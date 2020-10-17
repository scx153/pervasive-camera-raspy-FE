import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';


function App() {
 
  const [device_id, setdevice_id] = useState(``)
  const [device_name, setdevice_name] = useState(``)
  const [maxcapacity, setmaxcapacity] = useState(``)
  const [peoplecount, setpeoplecount] = useState(``)
  const [listdevices, setdevices] = useState([])
  const [newdevice_name, setnewdevice_name] = useState(``)
  const [newmaxcapacity, setnewmaxcapacity] = useState(``)
  const [newpeoplecount, setnewpeoplecount] = useState(``)
  /*  const[room_id, setroom_id] = useState('')
  const[room_name, setroom_name] = useState('')
  const[length, setlength] = useState('')
  const[width, setwidth] = useState('') */

  useEffect(() => {
    Axios.get(`http://localhost:3001/devices/get`).then((response) => {
      console.log(response.data)  
      setdevices(response.data.values)
      
    });
  }, [])

  const deleteDevice = (device_id) => {
    Axios.delete(`http://localhost:3001/devices/delete/${device_id}/`).then((response) => {
      console.log(response.data)
    });
  };

  const updateDevice = (device_id) => {
    Axios.put(`http://localhost:3001/devices/put/`,{
        device_id: device_id,
        device_name: newdevice_name,
        maxcapacity: newmaxcapacity,
        peoplecount: newpeoplecount
    });
    setnewdevice_name(""); setnewpeoplecount(""); setnewmaxcapacity("");
  };

  const submitdevice = () => {
      Axios.post("http://localhost:3001/devices/post", {
        device_id: device_id,
        device_name: device_name,
        maxcapacity: maxcapacity,
        peoplecount: peoplecount
        /*room_id: room_id,
        room_name: room_name,
        length: length,
        width: width,*/
      });

      setdevices([...listdevices, 
        {
        device_id: device_id,
        device_name: device_name,
        maxcapacity: maxcapacity,
        peoplecount: peoplecount
        }
      ]);

  };
  
  
  return (
    <div className="App">
      <h1>CRUD GAN</h1>

      <div className="form">
        
        <label>device_id</label>
        <input type="text" name="device_id" onChange={(e)=> {
          setdevice_id(e.target.value)
        }}/>
        
        <label>device_name</label>
        <input type="text" name="device_name" onChange={(e)=> {
          setdevice_name(e.target.value)
        }}/>
        
        <label>maxcapacity</label>
        <input type="text" name="maxcapacity" onChange={(e)=> {
          setmaxcapacity(e.target.value)
        }}/>
        
        <label>peoplecount</label>
        <input type="text" name="peoplecount" onChange={(e)=> {
          setpeoplecount(e.target.value)
        }}/>
        
        <button onClick={submitdevice}>submit</button>

        {listdevices.map((value) => {
          return (
            <div className="card">
            <h1>{value.device_id}</h1>
            <p>{value.device_name}</p>
            <p>{value.maxcapacity}</p> 
            <p>{value.peoplecount}</p> 

            <button 
              onClick={() =>{
                deleteDevice(value.device_id)}}
                >delete</button>
            
            <input type="text" id="updateInput" onChange={(e)=> {
              setnewdevice_name(e.target.value) }}
                />

            <input type="text" id="updateInput" onChange={(e)=> {
              setnewmaxcapacity(e.target.value) }}
                />

            <input type="text" id="updateInput" onChange={(e)=> {
              setnewpeoplecount(e.target.value) }}
                />

                

            <button onClick={()=>{updateDevice(value.device_id)}}>Update</button>
            </div>
          );
        })} 

       
    </div>
  </div>
  );
}

export default App;

/* {listdatadevice.map((value) => {
          return (
            <h1>
              device_id: {value.device_id} | device_name: {value.device_name} | maxcapacity: {value.maxcapacity} | peoplecount: {value.peoplecount} | 
            </h1>
          );
        })} */


/*
<label>room_id</label>
<input type="text" name="room_id" onChange={(e)=> {
  setroom_id(e.target.value)
}}/>

<label>room_info</label>
<input type="text" name="room_info" onChange={(e)=> {
  setroom_name(e.target.value)
}}/>
<label>length</label>
<input type="text" name="length" onChange={(e)=> {
  setlength(e.target.value)
}}/>

<label>width</label>
<input type="text" name="width" onChange={(e)=> {
  setwidth(e.target.value)
}}/>
*/
