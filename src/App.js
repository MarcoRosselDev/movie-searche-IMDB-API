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

  return (
    <div>
      <h1>hola</h1>
    </div>
  );
}

export default App;
