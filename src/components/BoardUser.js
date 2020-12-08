import React, { useState, useEffect } from "react";
import Axios from "axios";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  
  const [listdevices, setdevices] = useState([])
  
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
  }, [])

  useEffect(() => {
    UserService.getUserBoard().then(
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


      <div class="container-main">
        <h1>Data Device</h1>
        {listdevices.map((value) => {
  return (
    <div className="card">
    <h1>Device: {value.device_id}</h1>
    <h2>Device Name : {value.device_name}  </h2>
    <h2>PeopleCount : {value.peoplecount}</h2>
    </div>
  );
})}
</div>
        
<div class="container-main">
<h1>Data Room</h1>
{listroom.map((value) => {
          return (
            <div className="card">
            <h1>Room        : {value.room_id}</h1>
            <h2>Room Name   : {value.room_info}</h2>
            <h2>Device ID   : {value.device_id} </h2>
            <h2>Panjang     : {value.length} Meter</h2>
            <h2>Lebar       : {value.width} Meter</h2>
            <h2>Maxcapacity : {value.maxcapacity}</h2>

			</div>		
     );
		})}  
</div>

		

    </div>
  );
};

export default BoardUser;
