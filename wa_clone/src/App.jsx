import React ,{useState} from 'react';
import Login from "./Components/Login"
import PageNotFound from "./Components/PageNotFound"
import {Navigate, Routes,Route } from "react-router-dom"
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from './Components/Home';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute >
          <Home></Home>
        </ProtectedRoute>}></Route>
        <Route path="/login" element={<Login ></Login>}></Route>
        <Route path="/:chatid" element={<ProtectedRoute >
          <Home></Home>
        </ProtectedRoute>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
      </Routes>
    </>
  )
}

export default App
