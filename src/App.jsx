import React from "react";
import "./globals.css";

import Home from "./Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Toaster/>
      <Home />
    </div>
  );
};

export default App;
