import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/Landing.css";

export default function Landing() {
  const [, setMoviesapi] = useState([]);

  const getMoviesapi = async () => {
    const response = await axios.get("http://localhost:3001/api");
    setMoviesapi(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    getMoviesapi();
  }, []);

  return (
    <div className="landing-container">
      <div>
        <div>
          <h1>Welcome to Movie Search Engine App</h1>
          <p>Developer: Jose Limardo</p>
          {/* <h3>Start</h3> */}
          <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
            <h3>Start</h3>
            {/* <button>Start</button> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
