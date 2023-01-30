import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useApplicationState } from "../context/AppContext";
import Player from "../interfaces/Players";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface IPlayerCardProps {
  player: Player;
}

export default function PlayerCard(props: IPlayerCardProps) {
  const { player } = props;
  const Provider = useApplicationState();
  const { addFavPlayers, removeFavPlayers } = Provider;
  const handleClick = (player: Player) => {
    player.fav ? removeFavPlayers(player) : addFavPlayers(player);
  };
  if(!player.id || !player.first_name )
    return <></>
  return (
    <div className="card">
      <h2>
        Name:
        <br />
        {player.first_name + " " + player.last_name}
      </h2>
      <span>{player.position ? `Position:${player.position}` : ""}</span>
      <div>
        {
         (player.height_feet ||
         player.height_inches ||
         player.weight_pounds) &&
          <>
          <b>General information:</b>
          <br/>
          </>
        }
        
        {player.height_feet ? <>Height feet: {player.height_feet} <br/></> : ""}
        {player.height_inches ? <>Height inches: {player.height_inches}<br/></> : "" }
        {player.weight_pounds ? <>Weight pounds: {player.weight_pounds}<br/></>: ""}
      </div>
      <button onClick={() => handleClick(player)}  style={{color: "red"}}>
        {player.fav ? (
          <FontAwesomeIcon icon={faHeart} style={{color: "red"}} />
        ) : (
          <FontAwesomeIcon icon={faHeart} style={{color: "white"}} />
        )}
      </button>
    </div>
  );
}
