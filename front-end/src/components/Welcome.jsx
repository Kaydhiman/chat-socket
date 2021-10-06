import React, { useState, useContext } from "react";

import { io } from "socket.io-client";

import { appContext } from "../app-context";

function Welcome() {
  const [userName, setUserName] = useState("");
  const { setContext } = useContext(appContext);

  const startChatingHandler = (e) => {
    e.preventDefault();

    const socket = io(process.env.REACT_APP_SOCKET_URL, {
      auth: {
        name: userName,
      },
    });

    setContext(socket);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4 offset-md-4 text-center">
          <h1>Welcome! {":)"}</h1>
          <p>Please enter your name</p>
          <form className="d-flex input-group" onSubmit={startChatingHandler}>
            <input
              className="form-control"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary input-group-append"
              disabled={userName === ""}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
