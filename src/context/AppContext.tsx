import React, { useEffect, useReducer, useState } from "react";
import IAppContextProps, {
  ApplicationContextType,
} from "../interfaces/AppContext";
import { ActionTypes } from "../interfaces/PlayerReducer";
import Player from "../interfaces/Players";
import { initialPlayersState, playerReducer } from "../reducer/PlayersReducer";

const ApplicationContext = React.createContext<ApplicationContextType>({
  state: {
    players: [],
    favPlayers: [],
  },
  changeBackground: (color) => {},
  bg: "",
  updateUserName: () => {},
  nextPage: () => {},
  prevPage: () => {},
  addFavPlayers: (player) => {},
  removeFavPlayers: (player) => {},
  updating: false,
  pageNumber: -1,
  maxPages: -1,
  perPage: -1,
  searchPhrase: "",
  searchAPI: (name: string) => {},
  showPage: (name: number) => {},
  error: false,
});

export { ApplicationContext };

export const useApplicationState = (): ApplicationContextType => {
  const context = React.useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplicationState must be used within a AppContextProvider");
  }
  return context;
};

export default function AppContextProvider(props: IAppContextProps) {
  const { children, url } = props;
  const [state, dispatch] = useReducer(playerReducer, initialPlayersState);
  const [perPage, setPerPage] = useState<number>(25);
  const [bg, setBg] = useState("");
  const [userName, setUserName] = useState("NBA-Fan");
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const fetchNextPage = async () => {
    setError(false);
    try {
      const res = await fetch(
        url + `?page=${pageNumber}&search=${searchPhrase}`
      );
      const resJson = await res.json();
      dispatch({
        type: ActionTypes.Add_Players,
        payload: {
          players: resJson.data ? resJson.data : [],
          pageNumber,
          perPage,
        },
      });
      setMaxPages(resJson.meta.total_pages);
    } catch (e) {
      setError(true);
    } finally {
      setUpdating(false);
    }
  };

  const searchAPI = (name: string) => {
    setSearchPhrase(name);
    setPageNumber(1);
    dispatch({ type: ActionTypes.New_search });
    if (error) fetchNextPage();
  };

  const changeBackground = (color: string) => {
    setBg(color);
  };
  const addFavPlayers = (player: Player) => {
    dispatch({ type: ActionTypes.Add_Fav, payload: { player } });
  };
  const removeFavPlayers = (player: Player) => {
    dispatch({ type: ActionTypes.Remove_Fav, payload: { player } });
  };

  const nextPage = () => {
    setPageNumber((page) => page + 1);
  };

  const prevPage = () => {
    if (pageNumber > 0) setPageNumber((page) => page - 1);
  };

  const showPage = (num: number) => {
    setPageNumber(num);
  };

  useEffect(() => {
    clearTimeout(timer);
    if (
      (state.players.length &&
        !state.players[(pageNumber - 1) * perPage] &&
        !state.players[pageNumber * perPage - 1]) ||
      !state.players.length
    )  {
      setUpdating(true);
      setTimer(
        setTimeout(() => {
          fetchNextPage();
        }, 500)
      );
    }
    return () => clearTimeout(timer);
  }, [searchPhrase, pageNumber, perPage, state.players.length]);

  const updateUserName = (name: string) =>{
    setUserName(name);
  }

  return (
    <ApplicationContext.Provider
      value={{
        error,
        nextPage,
        addFavPlayers,
        removeFavPlayers,
        prevPage,
        changeBackground,
        updateUserName,
        bg,
        state,
        searchPhrase,
        updating,
        pageNumber,
        maxPages,
        perPage,
        searchAPI,
        showPage,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
