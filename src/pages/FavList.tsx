import React from "react";
import { useApplicationState } from "../context/AppContext";
import List from "../components/List";

interface IListProps {}

export default function FavList(props: IListProps) {
  const Provider = useApplicationState();
  const { state,bg,changeBackground } = Provider;
  return (
    <>
    <div className="side">
        <h1> Favorite playes list</h1>
        <div>
          <label htmlFor="changeColor">Change background color:</label>
          <input
            type="color"
            id="changeColor"
            value={bg}
            onChange={(e) => changeBackground(e.target.value)}
            />
        </div>
      </div>
    <div className="list" style={{ backgroundColor: bg }}>
      <List updating={false} players={state.favPlayers} />
    </div>
    </>
  );
}
