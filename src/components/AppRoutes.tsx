import React from "react";
import { Route, Routes } from "react-router-dom";
import FavList from "../pages/FavList";
import NavBar from "./NavBar";
import PlayerList from "../pages/PlayerList";
import Profile from "../pages/Profile";

export interface IAppRoutesProps {}

export default function AppRoutes(props: IAppRoutesProps) {
  return (
    <div className="container bg">
      <NavBar />
      <Routes>
        <Route index element={<PlayerList />} />
        <Route path="/favorite" element={<FavList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<div> 404 No page found :(</div>} />
      </Routes>
    </div>
  );
}
