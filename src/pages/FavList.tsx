import React from "react";
import { useApplicationState } from "../context/AppContext";
import List from "../components/List";

interface IListProps {}

export default function FavList(props: IListProps) {
  const Provider = useApplicationState();
  const { state,bg,changeBackground } = Provider;
  return (
    <div className="full_main_screen" style={{ backgroundColor: bg }}>
      <List updating={false} players={state.favPlayers} />
    </div>
  );
}
