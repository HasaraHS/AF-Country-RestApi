import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldGlobe from "./Components/WorldGlobe";
import Home from "./Pages/Home";
import Test2 from "./Pages/Test2";
import Login from "./Pages/Login";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/globe" element={<WorldGlobe />} />
        <Route path="/" element={<Home/>} />
        <Route path="/test" element={<Test2/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
