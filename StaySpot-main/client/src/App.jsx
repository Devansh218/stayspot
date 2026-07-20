import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from "react-router-dom";
import Search from './pages/Search';
import Hotel from './pages/Hotel';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/search" element = {<Search/>}/>
      <Route path = "/hotel/:id" element = {<Hotel/>}/>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/register" element = {<Signup/>}/>
    </Routes>
  )
}

export default App