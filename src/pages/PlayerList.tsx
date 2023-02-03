import React, { useCallback } from "react";
import { useApplicationState } from "../context/AppContext";
import List from "../components/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

export interface IPlayerListProps {}

export default function PlayerList(props: IPlayerListProps) {
  const Provider = useApplicationState();
  const {
    state,
    pageNumber,
    nextPage,
    maxPages,
    prevPage,
    searchAPI,
    showPage,
    updating,
    searchPhrase,
    perPage,
    error,
  } = Provider;
  const moveButtons = useCallback(() => {
    let res: Array<JSX.Element|null> = [];
    if (maxPages) {
      res.push(
        <button
          className="navButtons"
          disabled={pageNumber === 1}
          onClick={prevPage}
        >
          Prev
        </button>
      );
      for (
        let index = pageNumber - 3;
        index <= maxPages && res.length < 7;
        index += 1
      ) {
        if (index > 0)
          res.push(
            <button
              className={pageNumber === index ? "page " : "navButtons"}
              onClick={() => showPage(index)}
            >
              {index}
            </button>
          );
      }
      res.push(
        <button
          className="navButtons"
          disabled={maxPages <= pageNumber}
          onClick={nextPage}
        >
          Next
        </button>
      );
      if(res.length === 2){
        res = [
        <button
          className="navButtons"
          onClick={()=> showPage(1)}
        >
          1
        </button>];
      }
    }
    return res;
  }, [pageNumber, maxPages]);

  if (error)
    return (
      <>
        <div className="full_main_screen bg">
          <h1>Error in fetching please retry</h1>
          <button className="navButtons" onClick={() => searchAPI("")}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
      </>
    );
  return (
    <>
      <div className="side">
        <h1 className="">Players List</h1>
        <div>
          <label htmlFor="searchPlayer">Search player:</label>
          <input
            type="text"
            placeholder="For example: Kobe Bryant"
            value={searchPhrase}
            onChange={(e) => searchAPI(e.target.value)}
            id="searchPlayer"
          />
        </div>
      </div>
        <div className="list main">
          {moveButtons()}
          <List
            updating={updating}
            players={state.players.slice(
              (pageNumber - 1) * perPage,
              pageNumber * perPage
            )}
          />
          {moveButtons()}
        </div>
    </>
  );
}
