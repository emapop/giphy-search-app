import React, {useState, useEffect} from 'react';
import Paginate from './Paginate';
const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=VYmsxlWOIM2Vqxw7gIXcaw4NE1DS0Gxc&q=";

let TheSearch = () => {
  const [ darkMode, setDarkMode ] = useState(false);
  const [search, setSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = gifs.slice(indexOfFirstItem, indexOfLastItem)
  
  let searchGif = () => {
    if(search.length > 0){
      setLoadingState(true);
      fetch(GIPHY_API+search)
      .then((res)=>{
        setLoadingState(false);
        return res.json();
      })
      .then((result)=>{
        console.log(result);
        setGifs(result.data.map((gif)=>{
          return gif.images.fixed_height.url;
        }))
      })
      .catch(()=>{
        alert("Something went wrong");
        setLoadingState(false);
      })
    }
  }
  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  useEffect(() => {
    // storing input name
    localStorage.setItem("search", JSON.stringify(search));
    const toggle = document.querySelector('.toggle-inner');
    const main = document.querySelector('.main');
    if( darkMode === true ) {
      main.classList.add('dark-mode')
      toggle.classList.add('toggle-active')
    } else {
      main.classList.remove('dark-mode')
      toggle.classList.remove('toggle-active')
    }
  }, [search, darkMode]);
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
            <p>Click the search bar and type some gifs names you want to see...</p>
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
                      <img src={gif}/>  
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