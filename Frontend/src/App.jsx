import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldGlobe from "./Components/WorldGlobe";
import Home from "./Pages/Home";
import ThreeDesign2 from './Components/ThreeDesign2'
import Test from "./Pages/Test";
import OneCard from "./Pages/OneCard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/globe" element={<WorldGlobe />} />
        <Route path="/" element={<Home/>} />
        <Route path="/Design-2" element={<ThreeDesign2/>} />
        <Route path="/test" element={< Test />} />
        <Route path="/test/:id" element={< OneCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
