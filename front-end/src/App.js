import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Welcome from "./components/Welcome";
import ChatWindow from "./components/ChatWindow.jsx";
import { appContext } from "./app-context";

import "./App.scss";

function App() {
  
  const { context } = useContext(appContext);
  
  console.log("context", context)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/chat" component={ChatWindow} />
        <Redirect exact path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
