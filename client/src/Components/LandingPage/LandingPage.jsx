import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <section className="sectionLanding">
        <div className="text">
          {" "}
          <h1 className="title">Welcome</h1>
          <h1 className="title">to</h1>
          <h1 className="title">pokemon</h1>
          <h1 className="title">app</h1>
          <div className="divButton">
            <Link to="/home" className="buttonLink">
              <button className="editButton">HOME</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
