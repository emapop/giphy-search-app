import React, { useState, useEffect, useCallback } from "react";
import Paginate from "./Paginate";
const GIPHY_API =
  "https://api.giphy.com/v1/gifs/search?api_key=VYmsxlWOIM2Vqxw7gIXcaw4NE1DS0Gxc&q=";

let TheSearch = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("", () => {
    // getting stored value
    const saved = localStorage.getItem(currentSearch);
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  const [gifs, setGifs] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //indexOfLastItem sets the last index item
  const indexOfLastItem = currentPage * itemsPerPage;
  //indexOfFirst item sets the index which must almost be 0 to the first item
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //currentItems return an array copy with gifs that have the first index returned as the indexOfFirstItem and the last index as idexOfLastItem
  const currentItems = gifs.slice(indexOfFirstItem, indexOfLastItem);
  const [items, setItems] = useState([]);
  // currentSearch is the actual search value bind with the api url and used for setting the local storage key
  const [currentSearch, setCurrent] = useState(GIPHY_API + search);
  console.debug(currentSearch);
  // this useEffect callback sets the local storage by extracting the search value and the giphy api which
  //works as a key for storing searches in local storage
  useEffect(() => {
    setCurrent(GIPHY_API + search);
    localStorage.setItem(currentSearch, JSON.stringify(search));
    const items = JSON.parse(localStorage.getItem("search"));
    if (items) {
      setItems(items);
    }
  }, [search, items, currentSearch]);
  // the useCallback retrieves the api search and returns the result as gif.images
  let searchGif = useCallback(() => {
    if (search.length > 0) {
      setLoadingState(true);
      fetch(currentSearch)
        .then((res) => {
          setCurrent(currentSearch);
          setLoadingState(false);
          return res.json();
        })
        .then((result) => {
          console.debug(result);
          setGifs(
            result.data.map((gif) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch(() => {
          alert("Something went wrong");
          setLoadingState(false);
        });
    }
  }, [currentSearch, loadingState, search.length]);
  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // this useEffect callback activates the dark mode
  useEffect(() => {
    const toggle = document.querySelector(".toggle-inner");
    const main = document.querySelector(".main");
    const body = document.querySelector("body");
    if (darkMode === true) {
      main.classList.add("dark-mode");
      body.classList.add("dark-mode");
      toggle.classList.add("toggle-active");
    } else {
      body.classList.remove("dark-mode");
      main.classList.remove("dark-mode");
      toggle.classList.remove("toggle-active");
    }
  }, [darkMode]);
  return (
    <div className="main">
      <div
        id="toggle"
        //when the toggle button is pressed the dark mode is activated
        onClick={() =>
         darkMode === false ? setDarkMode(true) : setDarkMode(false)
        }
      >
        <div className="toggle-inner" />
      </div>
      <div className="header">
        <div>
          <input
            type="text"
            placeholder="Search GIF"
            //the value for the search input is extracted and stored in te search variable
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            //when the button is clicked searchGif is called, this function extracts the value from the search variable
            onClick={searchGif}
          >
            Search
          </button>
        </div>
      </div>
      <Paginate
        //this is the pagination section which deals with the amount of gifs per page and divides the pages according to the value set in itemsPerPage
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={gifs.length}
      />
      <div className="result">
        {!search ? (
          <div className="message">
            <p>
              Click the search bar and type some gifs names you want to see...🌟
            </p>
          </div>
        ) : (
          <></>
        )}
        {loadingState ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="list">
            {/*this is the function that retrives the search result */}
            {currentItems.map((gif) => {
              return (
                <div key={gif.id} className="item">
                  <img src={gif} alt="gif" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TheSearch;
