import * as React from "react";
import { Link, NavLink } from "react-router-dom";

export interface INavBarProps {}

export default function NavBar(props: INavBarProps) {
  return (
    <div className="navBar">
      <h1>Favorite NBA players Application</h1>
      <div className="flexRow nav">
        <div>
          <NavLink to="/" className="navLink" 
          style={({ isActive }) =>
              isActive ? {backgroundColor: "#f6d183", color: "#3c046f"} : undefined
            }>
            NBA players
          </NavLink>
        </div>
        <div>
          <NavLink to="/favorite" className="navLink"
           style={({ isActive }) =>
           isActive ? {backgroundColor: "#f6d183",  color: "#3c046f"} : undefined
         }>
            Your favorite players!
          </NavLink>
        </div>
      </div>
    </div>
  );
}
