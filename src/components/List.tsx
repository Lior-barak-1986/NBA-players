import React from "react";
import Player from "../interfaces/Players";
import PlayerCard from "./PlayerCard";


export interface IListProps {
  players: Array<Player | null>;
  updating: boolean;
  // onClick: (player:Player)=> void,
  // save: save
}

export default function List(props: IListProps) {
  const { players, updating } = props;

  if(updating)
    return <h1 className="header">Loading</h1>
  if(!players.length)
    return <h1 className="header">No players</h1>
  return (
    <div className="flexRow">
      {players.map((player) =>
        player ? (
         <PlayerCard player={player} key={player.id}/>
        ) : (
          <></>
        )
      )}
    </div>
  );
}
