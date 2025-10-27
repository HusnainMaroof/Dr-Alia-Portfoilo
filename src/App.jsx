import React from "react";
import "./globals.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
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
