import React, { useState, useEffect } from "react";
import Axios from "axios";
import UserService from "../services/user.service";

const BoardDataRoom = () => {
  const [content, setContent] = useState("");


  const [maxcapacity, setmaxcapacity] = useState(``)
  const [peoplecount, setpeoplecount] = useState(``)
  
  const [newmaxcapacity, setnewmaxcapacity] = useState(``)

  const [room_id, setroom_id] = useState('')
  const [newdevice_id, setnewdevice_id] = useState(``)
  const[room_info, setroom_info] = useState('')
  const[length, setlength] = useState('')
  const[width, setwidth] = useState('')
  const[listroom, setroom] = useState([])
  const [newroom_info, setnewroom_info] = useState(``)
  const [newlength, setnewlength] = useState(``)
  const [newwidth, setnewwidth] = useState(``)

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/room/`).then((response) => {
      console.log(response.data)  
      setroom(response.data.values)
      
    });
  }, [])


  //Page Room
  
  const deleteRoom = (room_id) => {
    Axios.delete(`http://localhost:3001/api/room/${room_id}/`).then((response) => {
      console.log(response)
    });
  };

  const updateRoom = (room_id) => {
    Axios.put(`http://localhost:3001/api/room/`,{
        room_id: room_id,
        device_id: newdevice_id,
        room_info: newroom_info,
        length: newlength,
        width: newwidth,
        maxcapacity: newmaxcapacity
    });
      setnewdevice_id(""); setnewroom_info(""); setnewlength(""); setnewwidth(""); setnewmaxcapacity("");
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
		{listroom.map((value) => {
          return (
            <div className="card">
            <h1>Room : {value.room_id}</h1>
            <h2>Room Name: {value.room_info}  </h2>

            <input type="text" id="updateInput" onChange={(e)=> {
              setnewroom_info(e.target.value) }}
                />

            <h2>Device ID: {value.device_id}  </h2>

            <input type="text" id="updateInput" onChange={(e)=> {
              setnewdevice_id(e.target.value) }}
                />

            <h2>Panjang: {value.length} Meter </h2>

            <input type="text" id="updateInputSmall" onChange={(e)=> {
              setnewlength(e.target.value) }}
                />

            <h2>Lebar: {value.width} Meter </h2>

            <input type="text" id="updateInputSmall" onChange={(e)=> {
              setnewwidth(e.target.value) }}
                />

            <h2>Maxcapacity: {value.maxcapacity} </h2>

            <button 
              onClick={() =>{
                deleteRoom(value.room_id)}}
                >Delete This Room</button>  

            &ensp;
            <button onClick={()=>{updateRoom(value.room_id)}}>Update</button>
			</div>
			
          );
		})}  
    </div>
   
  );
};

export default BoardDataRoom;
