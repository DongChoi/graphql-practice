import React from "react";
import "./App.css";
import { GetMessages, GetUsers } from "./index.js";

function App() {
  return (
    <div className="App">
      <GetUsers />
      <hr />
      <GetMessages />
    </div>
  );
}

export default App;
