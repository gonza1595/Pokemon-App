import React from "react";
import { getPokemonNames } from "../../Redux/Actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./SearchBar.css";

export default function SearchBar({ setPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonNames(name));
    setName("");
  }

  return (
    <div>
      <input
        className="searchbar"
        type="text"
        placeholder={"Search pokemon..."}
        onChange={(e) => handleChange(e)}
      />
      <button className="button" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
