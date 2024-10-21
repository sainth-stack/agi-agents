import React from "react";
import "./Navbar.css";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-heading">AI Agents Hub </h2>
        <div className="navbar-menu">
          {/* <Link to="#"  onClick={() =>navigate('/main2')}smooth={true} duration={500}>Hakerthon</Link>  */}
          <Link
            to="#"
            onClick={() => navigate("/agnets-hub/submit")}
            smooth={true}
            duration={500}
          >
            Submit AI Agent
          </Link>
        </div>
      </div>
    </div>
  );
}
