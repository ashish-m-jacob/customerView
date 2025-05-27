import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import ConfirmOrder from "./pages/confirmOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/confirm-order" element={<ConfirmOrder />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
