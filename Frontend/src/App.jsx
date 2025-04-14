import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldGlobe from "./Components/WorldGlobe";
import Home from "./Pages/Home";
import Threee from './Pages/Threee'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/globe" element={<WorldGlobe />} />
        <Route path="/" element={<Home/>} />
        <Route path="/three" element={<Threee/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
