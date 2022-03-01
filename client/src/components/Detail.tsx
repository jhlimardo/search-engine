import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import "../css/Detail.css";

export default function MovieDetail() {
  const { id } = useParams();
  const [movieid, setMovieid] = useState({
    id: 0,
    title: "",
    photo: "",
    description: "",
    shortDescription: "",
  });

  useEffect(() => {
    if (!movieid.title) {
      getMovieId();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMovieId = async () => {
    const response = await axios.get(`http://localhost:3001/${id}`);
    setMovieid(response.data[0]);
    if (response.data.length === 0) {
      alert("Movie not found");
      window.location.reload();
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Movie Detail</h1>
      <h2>{movieid.title.charAt(0).toUpperCase() + movieid.title.slice(1)}</h2>
      <div className="detalle">
        <img src={movieid.photo} alt={movieid.title} />
        <p>{movieid.description}</p>
      </div>
    </div>
  );
}
