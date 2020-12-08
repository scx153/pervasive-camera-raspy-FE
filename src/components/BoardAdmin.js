import React, { useState, useEffect } from "react";
import Axios from "axios";
import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [device_id, setdevice_id] = useState(``)
  const [device_name, setdevice_name] = useState(``)
  const [maxcapacity, setmaxcapacity] = useState(``)
  const [peoplecount, setpeoplecount] = useState(``)
  const [listdevices, setdevices] = useState([])
  const [newdevice_name, setnewdevice_name] = useState(``)
  const [newmaxcapacity, setnewmaxcapacity] = useState(``)
  const [newpeoplecount, setnewpeoplecount] = useState(``)
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

 /* pepcountdevice1(() => {
    axios.get(`https://localhost:3001/api/devices/1`)
      .then(res => {
        const pepcount1 = res.data.data1;
        this.setState({ pepcount1 })
        console.log(res.data1)
      });
    },[]); */

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
       maxcapacity1.setState({events: response.data})
     })
    .catch(function (error) {
       console.log(error);
    });


   var alarm1 = boolean(pepcount1 > maxcapacity1);

  function alarmfull1(){
    if (alarm1 === 1)
   alert("Message");
  }
   



 


  
  //Page Device

  function deleteDevice(device_id) {
    Axios.delete(`http://localhost:3001/api/devices/${device_id}/`).then((response) => {
      console.log(response.data);
    });
  }

  const updateDevice = (device_id) => {
    Axios.put(`http://localhost:3001/api/devices/`,{
        device_id: device_id,
        device_name: newdevice_name,
        peoplecount: newpeoplecount
    });
    setnewdevice_name(""); setnewpeoplecount(""); 
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
      <div className="form">
        
        <label>Device ID</label>
        <input type="text" name="device_id" onChange={(e)=> {
          setdevice_id(e.target.value)
        }}/>
        
        <label>Device Name</label>
        <input type="text" name="device_name" onChange={(e)=> {
          setdevice_name(e.target.value)
        }}/>
        
        <button onClick={submitdevice}>Submit</button>
		
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
        
        

        <button onClick={submitRoom}>Submit</button>
        <button onClick={alarmfull1}>alarmssss</button>

         <p></p>

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
    </div>
  );
};


export default BoardAdmin;
