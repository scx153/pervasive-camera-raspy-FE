import React, { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardDataDevice from "./components/BoardDataDevice";
import BoardDataRoom from "./components/BoardDataRoom";
import BoardNewData from "./components/BoardNewData";

// socket.io
import socketIOClient from "socket.io-client";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showBoardDataDevice, setShowBoardDataDevice] = useState(false);
  const [showBoardDataRoom, setShowBoardDataRoom] = useState(false);
  const [ShowBoardNewData, setShowBoardNewData] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  // socket io referece
  const socketRef = useRef();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    // socket io subscribe to pepCountWarning Event
    socketRef.current = socketIOClient("http://localhost:3001",
                                      { transports: ['websocket']});
    socketRef.current.on("pepCountWarning", ({message}) => {
      console.info(message);
    });

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowBoardDataDevice(user.roles.includes("ROLE_ADMIN"));
      setShowBoardDataRoom(user.roles.includes("ROLE_ADMIN"));
      setShowBoardNewData(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Camera People
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {ShowBoardNewData && (
            <li className="nav-item">
              <Link to={"/newdata"} className="nav-link">
              Create New Room & Device
              </Link>
            </li>
          )}

          {showBoardDataDevice && (
            <li className="nav-item">
              <Link to={"/data-device"} className="nav-link">
                Data Device
              </Link>
            </li>
          )}

          {showBoardDataRoom && (
            <li className="nav-item">
              <Link to={"/data-room"} className="nav-link">
                Data Room
              </Link>
            </li>
          )}

      

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User Board
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/data-device" component={BoardDataDevice} />
          <Route path="/data-room" component={BoardDataRoom} />
          <Route path="/newdata" component={BoardNewData} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
