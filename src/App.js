import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const handleChange = (e) => {
    setMovieName(e.target.value);
  };
  const getMovies = (Name) => {
    axios
      .get(`https://www.omdbapi.com/?s=${Name}&page=2&apikey=41f71805`)
      .then((res) => setMovies(res.data.Search))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getMovies("Batman");
  }, []);
  const handleSearch = () => {
    if(movieName===""){
      window.alert("Pleas Add Name Of the Movie");
    }else{
      getMovies(movieName);
    }
  };
  const handleHover = () => {};
  const addFavrate = (each) => {
    let has = false;
    for (let i = 0; i < favMovies.length; i++) {
      if (favMovies[i].imdbID === each.imdbID) {
        has = true;
      }
    }
    if (!has) {
      setFavMovies((pre) => [...pre, each]);
    }
  };
  const removeFavrate = (each) => {
const array=[];
for (let i = 0; i < favMovies.length; i++) {
  if (favMovies[i].imdbID !== each.imdbID) {
    array.push(favMovies[i]);
  }
}
setFavMovies(array);
  };
  return (
    <div className="App">
      <div className="heading">
        <h1>Movies</h1>
        <div className="search">
        <input
          type="text"
          value={movieName}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="body">
        {movies.length > 0 ? (
          movies.map((each, i) => {
            return (
              <div key={i} className="card">
                <img
                  className="image"
                  src={each.Poster}
                  alt={each.Title}
                  onMouseOver={() => handleHover(each)}
                />
                <div className="fav" onClick={() => addFavrate(each)}>
                  Add To Favorite
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </div>
      <div className="favorite">
      <h1>Favorite Movies</h1>
      <div className="body">

        {favMovies.length > 0 ? (
          favMovies.map((each, i) => {
            console.log(each);
            return (
              <div key={i} className="card">
                <img
                  className="image"
                  src={each.Poster}
                  alt={each.Title}
                  onMouseOver={() => handleHover(each)}
                />
                <div className="fav" onClick={() => removeFavrate(each)}>
                  Remove From Favriot
                </div>
              </div>
            );
          })
        ) : (
          <div>Add Favorites</div>
        )}
      </div>
      </div>
    </div>
  );
}

export default App;
