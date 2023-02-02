// notesReducer.ts
import { PlayerActionTypes, PlayersState } from "../interfaces/PlayerReducer";
import Player from "../interfaces/Players";



export const initialPlayersState: PlayersState = {
  players: [],
  favPlayers: [],
};

export function playerReducer(state: PlayersState, action: PlayerActionTypes) {
  const res: PlayersState = {  
    players: [],
    favPlayers: [...state.favPlayers],
  };
  switch (action.type) {
    case "Add_Players":
      action.payload.players.forEach((player: Player, ind: number) => {
        if (state.favPlayers.filter((favPlayer) => favPlayer.id === player.id).length )
          player.fav = true;
        state.players[(action.payload.pageNumber - 1) * action.payload.perPage + ind] = player;
      });
      res.players = [...state.players];
      break;
    case "Add_Fav":
      if (!(state.favPlayers.filter((favPlayer) => favPlayer.id === action.payload.player.id).length)) {
        action.payload.player.fav = true;
        res.favPlayers = [...state.favPlayers,action.payload.player];
        res.players = updatePlayersFav(state.players, action.payload.player);
      }
      break;
    case "Remove_Fav":
      if (state.favPlayers.filter((favPlayer) => favPlayer.id === action.payload.player.id).length) { 
        action.payload.player.fav = false;
        const tempFav = state.favPlayers.filter((favPlayer) => favPlayer.id !== action.payload.player.id);
        res.favPlayers = tempFav;
        res.players = updatePlayersFav(state.players,action.payload.player);
      }
      break;
    case "New_search":
      res.players = [];
      break;
  }
  return res;
}

const updatePlayersFav = (players: Array<Player>, player: Player) => {
  const newPlayers = players.map((originalPlayer) =>
  originalPlayer &&
  originalPlayer.id === player.id  ?
  player : originalPlayer 
  );
  return newPlayers;
};
