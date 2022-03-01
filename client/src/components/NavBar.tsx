import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <div>
      <header className="navbar-header">
        <Link to="/home" className="navbar-links">
          <div className="navbar-title" style={{ textDecoration: "none" }}>
            Movies Search App
          </div>
        </Link>
        <div className="navbar-boton-content">
          {/* <Link to="/home" className="navbar-links"> */}
            <button onClick = {(e) => {
                navigate('/home'); window.location.reload();
              }}>Home</button>
          {/* </Link> */}
        </div>
      </header>
    </div>
  );
}
