import React from "react";
import "./Card.css";

export default function Card({ image, name, types }) {
  return (
    <div className="container">
      <div>
        <img className="image" src={image} alt="flag"></img>
      </div>
      <div className="name">
        <h4>{name.charAt(0).toUpperCase() + name.substring(1)}</h4>
      </div>
      <div className="types">
        {types
          .map((t) => t.name)
          .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
          .join(" - ")}
      </div>
    </div>
  );
}
