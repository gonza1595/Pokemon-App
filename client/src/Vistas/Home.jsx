import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../Redux/Actions";
import NavBar from "../Components/NavBar/NavBar";
import Pagination from "../Components/Pagination/Pagination";
import Card from "../Components/Card/Card.jsx";
import "../Components/Allcards.css";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const [filterSelected, setFilterSelected] = useState([]);
  let allPokemons = useSelector((state) => state.pokemons);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  // paginacion

  const [page, setPage] = useState(1);
  const showPerPage = 12;
  const lastOnPage = page * showPerPage;
  const firstOnPage = lastOnPage - showPerPage;
  const showPokemons = allPokemons.slice(firstOnPage, lastOnPage);

  function pagination(pageNumber) {
    setPage(pageNumber);
  }

  return (
    <div className="fondoHome">
      <div className="topNav">
        <div>
          <button className="buttonHome" onClick={(e) => handleClick(e)}>
            HOME
          </button>
        </div>
        <div>
          <Link to="/create">
            <button className="buttonCreate">CREATE YOUR POKEMON</button>
          </Link>
        </div>
      </div>
      <div>
        {!showPokemons > 0 ? null : (
          <NavBar
            setFilterSelected={setFilterSelected}
            setPage={setPage}
            showPokemons={showPokemons}
          />
        )}
      </div>

      <div className="allcard">
        {showPokemons.length > 0 ? (
          showPokemons.map((p) => (
            <Link className="card" key={p.id} to={`/pokemons/${p.id}`}>
              <Card
                key={p.id}
                id={p.id}
                name={p.name}
                types={p.types}
                image={p.image}
              />
            </Link>
          ))
        ) : (
          <div>
            <h1>Cargando...</h1>
          </div>
        )}
      </div>
      {!showPokemons.length > 0 ? null : (
        <div>
          <Pagination
            showPerPage={showPerPage}
            allPokemons={allPokemons.length}
            pagination={pagination}
            page={page}
          ></Pagination>
        </div>
      )}
    </div>
  );
}
