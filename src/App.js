import React from "react";
import "./App.css";
import { AddUser, GetMessages, GetUsers, AddMessage } from "./index.js";

function App() {
  return (
    <div className="App">
      <GetUsers />
      <hr />
      <AddUser />
      <hr />
      <AddMessage />
      <hr />
      <GetMessages username={"DongChoi"} />
    </div>
  );
}

export default App;
