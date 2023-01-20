import React, { useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import "./App.css";

function App() {
  console.log(process.env);
  // variables de estado
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  // funcion para realizar la peticion por get a la api

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const { data: { results }
  } = await axios.get(`${process.env.API_URL}/${type}/movie`, {
      params: {
        api_key: process.env.API_KEY,
        query: searchKey.
      },
    })

    setMovies(results)
    setMovie(results[0])
  };

  return (
    <div>
      <h1>hola</h1>
    </div>
  );
}

export default App;
