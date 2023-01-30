import React, { useCallback } from "react";
import { useApplicationState } from "../context/AppContext";
import List from "./List";
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
    perPage,
    error,
  } = Provider;
  const moveButtons = useCallback(() => {
    const res = [];
    if (maxPages) {
      res.push(
        <button
          className="navButtons"
          disabled={pageNumber == 1}
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
              className={pageNumber === index ? "page" : "" + "navButtons"}
              // key={index}
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
    }
    return res;
  }, [pageNumber, maxPages]);

  if (error)
    return (
      <>
        <div className="side "></div>
        <div className="list bg">
          <h1>Error in fetching please retry</h1>
          <button className="navButtons" onClick={() => searchAPI("")}>
            <FontAwesomeIcon icon={faArrowsRotate} />
          </button>
        </div>
      </>
    );
      console.log( state.players.slice(
        (pageNumber - 1) * perPage,
        pageNumber * perPage
      ))
  return (
    <>
      <div className="side">
        <h1 className="">Players List</h1>
        <div>
          <label htmlFor="searchPlayer">Search player:</label>
          <input
            type="text"
            placeholder="For example: Kobe Bryant"
            onChange={(e) => searchAPI(e.target.value)}
            id="searchPlayer"
          />
        </div>
      </div>
        <div className="list">
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
