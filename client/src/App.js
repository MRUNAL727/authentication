import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* <Route path="/" element={<Header />}></Route> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn && <Route path="/user" element={<Welcome />} />}
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
