import React, {useState, useEffect} from 'react';
import Paginate from './Paginate';
const GIPHY_API = "https://api.giphy.com/v1/gifs/search?api_key=VYmsxlWOIM2Vqxw7gIXcaw4NE1DS0Gxc&q=";

let TheSearch = () => {
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
  }, [search]);
  return (
    <div>
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