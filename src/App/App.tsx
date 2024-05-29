import React from "react";
import MainPage from "./MainPage";
import ProfilePage from "./ProfilePage";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";

function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile/:profileId" element={<ProfilePage />} />
        {/* <Route path="/" element={<ProfilePage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
