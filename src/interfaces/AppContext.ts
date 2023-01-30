import { PlayersState } from "./PlayerReducer";
import Player from "./Players";

export default interface IAppContextProps {
    children?: React.ReactNode;
    url: RequestInfo;
}

export interface ApplicationContextType{  
    error: boolean;
    state: PlayersState;
    nextPage: () => void;
    prevPage: () => void;
    addFavPlayers: (player: Player) => void;
    removeFavPlayers: (player: Player) => void;
    updating: boolean;
    pageNumber: number;
    maxPages: number;
    perPage: number;
    searchAPI: (name: string) => void;
    showPage: (num: number) => void;
    bg: string;
    changeBackground: (color: string) => void;
  }