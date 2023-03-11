import { Spin } from "antd";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./screens/Profile";
import SignUp from "./screens/SignUp";
import Transaction from "./screens/Transaction";

function App() {
  return (
    <div className="" role={"application"}>
      <Suspense
        fallback={
          <div className="absoluteCenterY">
            <div className="">
              <Spin size="large" tip={"Loading..."} />
            </div>
          </div>
        }
      >
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transaction" element={<Transaction />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
