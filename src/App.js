import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import "./App.css";

function App() {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "c1b661944b322e9bff1c1acc8b8e9033";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";

  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion por get a la api

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });

    setMovies(results);
    setMovie(results[0]);
  };

  // función para la petición de un solo objeto y mostrar en reproductor de video
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "movies",
      },
    });
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  // función para buscar peliculas
  const searchMovie = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h2 className="text-center mt-5 mb-5">Trailer Movies</h2>
      {/* buscador */}
      <form className="container mb-4" onSubmit={searchMovie}>
        <input
          type="text"
          placeholder="buscador"
          onChange={(e) => setSearchKey(e.target.value)}
        />
      </form>
      {/* contenedor que mostrara posters de peliculas */}
      <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.id} className="col-md-4 mb-3">
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt="poster movie"
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
