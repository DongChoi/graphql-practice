import React from "react";
import "./App.css";
import { AddUser, GetMessages, GetUsers } from "./index.js";

function App() {
  return (
    <div className="App">
      <GetUsers />
      <hr />
      <AddUser />
      <hr />
      <GetMessages username={"Andrew"} />
    </div>
  );
}

export default App;
