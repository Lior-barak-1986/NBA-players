import Player from "../interfaces/Players";

export enum ActionTypes {
  "Add_Players" = "Add_Players",
  "Add_Fav" = "Add_Fav",
  "Remove_Fav" = "Remove_Fav",
  "New_search" = "New_search",
}

interface AddPlayerToFaverAction {
  type: ActionTypes.Add_Fav;
  payload: { player: Player };
}

interface SearchPlayerAction {
  type: ActionTypes.New_search;
}

interface RemovePlayerToFaverAction {
  type: ActionTypes.Remove_Fav;
  payload: { player: Player };
}

interface AddPlayersAction {
  type: ActionTypes.Add_Players;
  payload: { 
    players: Array<Player>,
    pageNumber: number,
    perPage: number
   };
}

export interface PlayersState {
  players: Array<Player>;
  favPlayers: Array<Player>;
}

export type PlayerActionTypes =
  | AddPlayerToFaverAction
  | RemovePlayerToFaverAction
  | AddPlayersAction
  | SearchPlayerAction;

export function addPlayerToFav(player: Player): AddPlayerToFaverAction {
  return {
    type: ActionTypes.Add_Fav,
    payload: {
      player,
    },
  };
}

export function removePlayerToFav(player: Player): RemovePlayerToFaverAction {
  return {
    type: ActionTypes.Remove_Fav,
    payload: {
      player,
    },
  };
}

export function AddPlayers(
  players: Array<Player>,
  pageNumber: number,
  perPage: number
): AddPlayersAction {
  return {
    type: ActionTypes.Add_Players,
    payload: {
      players,
      pageNumber,
      perPage
    },
  };
}

export function newSearch() : SearchPlayerAction{
  return {
    type: ActionTypes.New_search
  }
}