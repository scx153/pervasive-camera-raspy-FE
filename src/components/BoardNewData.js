import React, { useState, useEffect } from "react";
import Axios from "axios";
import UserService from "../services/user.service";

const Admin_Create = () => {
  const [content, setContent] = useState("");
  const [device_id, setdevice_id] = useState(``)
  const [device_name, setdevice_name] = useState(``)
  const [maxcapacity, setmaxcapacity] = useState(``)
  const [peoplecount, setpeoplecount] = useState(``)
  const [listdevices, setdevices] = useState([])

  const [room_id, setroom_id] = useState('')
  const[room_info, setroom_info] = useState('')
  const[length, setlength] = useState('')
  const[width, setwidth] = useState('')
  const[listroom, setroom] = useState([])

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/devices/`).then((response) => {
      console.log(response.data)  
      setdevices(response.data.values)
      
    });
  }, [])

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/room/`).then((response) => {
      console.log(response.data)  
      setroom(response.data.values)
      
    });
  }, []);


  var pepcount1 = this;
  Axios.get('http://localhost:3001/api/devices/pepcount/1')
   .then(function (response) {
     console.log(response);
     this.state = {events: response.data}
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


  const submitdevice = () => {
      Axios.post("http://localhost:3001/api/devices/", {
        device_id: device_id,
        device_name: device_name,
        peoplecount: peoplecount
        /*room_id: room_id,
        room_info: room_info,
        length: length,
        width: width,*/
      });

      setdevices([...listdevices, 
        {
        device_id: device_id,
        device_name: device_name,
        peoplecount: peoplecount
        }
      ]);

  };

  //Page Room
  const submitRoom = () => {
      Axios.post("http://localhost:3001/api/room/", {
        room_id: room_id,
        device_id: device_id,
        room_info: room_info,
        length: length,
        width: width,
        maxcapacity: maxcapacity
      });

      setroom([...listroom, 
        {
        room_id: room_id,
        device_id: device_id,
        room_info: room_info,
        length: length,
        width: width,
        maxcapacity: maxcapacity
        }
      ]);
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
    
    <div className="card">
    <h1>Create Device</h1>
    <label>Device ID</label>
        <input type="text" name="device_id" onChange={(e)=> {
          setdevice_id(e.target.value)
        }}/>
        
        <label>Device Name</label>
        <input type="text" name="device_name" onChange={(e)=> {
          setdevice_name(e.target.value)
        }}/>
        &ensp;
        <button onClick={submitdevice}>Submit</button>
			</div>

      <div className="card">
      <h1>Create Room</h1>
        
        <label>Room ID</label>
        <input type="text" name="room_id" onChange={(e)=> {
          setroom_id(e.target.value)
        }}/>

        <label>Device ID</label>
        <input type="text" name="device_id" onChange={(e)=> {
          setdevice_id(e.target.value)
        }}/>
        
        <label>Room Name</label>
        <input type="text" name="room_info"  onChange={(e)=> {
          setroom_info(e.target.value)
        }}/>
        
        <label>Panjang Ruangan (maksimal 6 meter)</label>
        <input type="text" name="length" onChange={(e)=> {
          setlength(e.target.value)
        }}/>
        
        <label>Lebar Ruangan (maksimal 6 meter)</label>
        <input type="text" name="width" onChange={(e)=> {
          setwidth(e.target.value)
        }}/>
        
        &ensp;
        <button onClick={submitRoom}>Submit</button>

      </div>
     
	
    </div>
   
  );
};

export default Admin_Create;
