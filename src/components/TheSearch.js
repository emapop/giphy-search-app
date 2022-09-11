import React, {useState, useEffect, useCallback} from 'react';
import Paginate from './Paginate';
const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=VYmsxlWOIM2Vqxw7gIXcaw4NE1DS0Gxc&q=";

let TheSearch = () => {
  const [ darkMode, setDarkMode ] = useState(false);
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gifs.slice(indexOfFirstItem, indexOfLastItem);
  const [items, setItems] = useState([]);
  const [currentSearch, setCurrent] = useState(GIPHY_API+search);
  console.log(currentSearch);

useEffect(() => {
  localStorage.setItem(currentSearch, JSON.stringify(search));
  const items = JSON.parse(localStorage.getItem('search'));
  if (items) {
    setItems(items);
   }
}, [search, items]);
 
  let searchGif = useCallback( () => {
    if(search.length > 0){
      setLoadingState(true);
      fetch(currentSearch)
      .then((res)=>{
        setCurrent(currentSearch)
        setLoadingState(false);
        return res.json();
      })
      .then((result)=>{
        setGifs(result.data.map((gif)=>{
          return gif.images.fixed_height.url;
        }))
      })
      .catch(()=>{
        alert("Something went wrong");
        setLoadingState(false);
      })
    }
  }, [currentSearch, loadingState])
  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  useEffect(() => {
    const toggle = document.querySelector('.toggle-inner');
    const main = document.querySelector('.main');
    const body = document.querySelector('body');
    if( darkMode === true ) {
      main.classList.add('dark-mode');
      body.classList.add('dark-mode');
      toggle.classList.add('toggle-active');
    } else {
      body.classList.remove('dark-mode')
      main.classList.remove('dark-mode');
      toggle.classList.remove('toggle-active');
    }
  }, [darkMode]);
  return (
    <div className="main">
      <div
        id="toggle"
        onClick={() => darkMode === false ? setDarkMode(true) : setDarkMode(false)}
      >
        <div className="toggle-inner"/>
      </div>
      <div className="header">
        <div>
          <input 
            type="text" 
            placeholder="Search GIF"
            value={search}
            onChange={(e)=>setSearch(e.target.value)} 
          />
          <button onClick={searchGif}>
            Search
          </button>
        </div>
      </div>
      <Paginate pageSelected = {pageSelected} currentPage = {currentPage} itemsPerPage={itemsPerPage} totalItems={gifs.length}/>
      <div className="result">
        {(!search) ? (<div className="message message-for-searching">
            <p>Click the search bar and type some gifs names you want to see...🌟</p>
        </div>) : (<></>)}
        {
          (loadingState) ? (
            <div className="loading">
              <div className="loader">
              </div>
            </div>
          ) : (
            <div className="list">
              {
                currentItems.map((gif)=>{
                  return (
                    <div key={gif.id} className="item">
                      <img src={gif} alt="gif"/>  
                    </div>
                  )
                })
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default TheSearch;