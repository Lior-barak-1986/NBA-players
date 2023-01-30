import React from "react";
import { Route, Routes } from "react-router-dom";
import FavList from "./FavList";
import NavBar from "./NavBar";
import PlayerList from "./PlayerList";

export interface IAppRoutesProps {}

export default function AppRoutes(props: IAppRoutesProps) {
  return (
    <div className="container bg">
      <NavBar />
      <Routes>
        <Route index element={<PlayerList />} />
        <Route path="/favorite" element={<FavList />} />
        <Route path="/*" element={<div> 404 No page found :(</div>} />
      </Routes>
    </div>
  );
}
