import React, { useState, useEffect } from "react";
import Axios from "axios";
import UserService from "../services/user.service";

const BoardDataDevice = () => {
  const [content, setContent] = useState("");
  const [device_id, setdevice_id] = useState(``)
  const [device_name, setdevice_name] = useState(``)
  const [peoplecount, setpeoplecount] = useState(``)
  const [listdevices, setdevices] = useState([])
  const [newdevice_name, setnewdevice_name] = useState(``)
  const [newpeoplecount, setnewpeoplecount] = useState(``)

 

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/devices/`).then((response) => {
      console.log(response.data)  
      setdevices(response.data.values)
      
    });
  }, [])



  var pepcount1 = this;
  Axios.get('http://localhost:3001/api/devices/pepcount/1')
   .then(function (response) {
     console.log(response);
     pepcount1.setState({events: response.data})
   })
  .catch(function (error) {
     console.log(error);
  });

  var maxcapacity1 = this;
  Axios.get('http://localhost:3001/api/room/maxcapacity/1')
   .then(function (response) {
     console.log(response);
     this.state = {events: response.data}
   })
  .catch(function (error) {
     console.log(error);
  });


  if (pepcount1 > maxcapacity1){
    alert("full")
    };
  
  
  //Page Device

  const deleteDevice = (device_id) => {
    Axios.delete(`http://localhost:3001/api/devices/${device_id}/`).then((response) => {
      console.log(response.data)
    });
  };

  const updateDevice = (device_id) => {
    Axios.put(`http://localhost:3001/api/devices/`,{
        device_id: device_id,
        device_name: newdevice_name,
        peoplecount: newpeoplecount
    });
    setnewdevice_name(""); setnewpeoplecount(""); 
  };


  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
        {listdevices.map((value) => {
          return (
            <div className="card">
            <h1>Device : {value.device_id}</h1>
            <h2>Device Name: {value.device_name}  </h2>

            <input type="text" id="updateInput" onChange={(e)=> {
              setnewdevice_name(e.target.value) }}
                />

            <h2>PeopleCount: {value.peoplecount}</h2>

            <button 
              onClick={() =>{
                deleteDevice(value.device_id)}}
                >Delete This Device</button>  

            &ensp;

            <button onClick={()=>{updateDevice(value.device_id)}}>Update</button>
            </div>
			
          );
		})}  
    </div>
   
  );
};

export default BoardDataDevice;
