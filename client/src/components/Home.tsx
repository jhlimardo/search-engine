import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import "../css/App.css";

export default function MoviesList() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [val, setVal] = useState("");

  const getMovies = async (val: string) => {
    const response = await axios.get(`http://localhost:3001?title=${val}`);
    setMovies(response.data);
    if (response.data.length === 0) {
      alert("No se encontraron resultados");
      navigate("/home");
      window.location.reload();
    }
  };

  useEffect(() => {
    getMovies(val);
  }, []);

  // Search components
  function handleInputChange(e: any) {
    e.preventDefault();
    setVal(e.target.value.toLowerCase());
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    getMovies(val);
    setVal("");
  }

  return (
    <div className="container">
      <Navbar />
      <div>
        <div className="home-buscar">
          <input
            className="home-input"
            value={val}
            type="text"
            placeholder="Search Movie..."
            onChange={(e) => {
              handleInputChange(e);
            }}
          />

          <button
            className="home-buscar-button"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Buscar
          </button>
        </div>
      </div>

      <div>
        
          {movies?.map(
            (movie: {
              id: number;
              title: string;
              photo: string;
              overview: string;
              shortDescription: string;
            }) => (
              <div key={movie.id} className="pelicula">
                <div>
                  <img
                    src={movie.photo}
                    alt={movie.title}
                    width="200px"
                    height="150px"
                  />
                </div>
                <div>
                  
                    <p>
                      <Link
                        to={`/home/${movie.id}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        {" "}
                        {movie.title.charAt(0).toUpperCase() +
                          movie.title.slice(1)}{" "}
                      </Link>{" "}
                    </p>
                    <p>{movie.shortDescription}</p>
                  
                </div>
              </div>
            )
          )}
        
      </div>
    </div>
  );
}
