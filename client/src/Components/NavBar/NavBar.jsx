import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByType,
  getPokemons,
  getTypes,
  ascOrder,
  descOrder,
  orderByAttack,
  filterByCreate,
} from "../../Redux/Actions";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

export default function NavBar({ setFilterSelected, setPage }) {
  const dispatch = useDispatch();
  let allTypes = useSelector((state) => state.types);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
  }, [dispatch]);

  function handleFilterByType(e) {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setPage(1);
  }

  function handleFilterByName(e) {
    if (e.target.value === "Asc") {
      e.preventDefault();
      dispatch(ascOrder(e.target.value));
      setPage(1);
      setFilterSelected(e.target.value);
    } else if (e.target.value === "Desc") {
      e.preventDefault();
      dispatch(descOrder(e.target.value));
      setFilterSelected(e.target.value);
    }
  }

  function handleFilterByAttack(e) {
    e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setFilterSelected(e.target.value);
    setPage(1);
  }

  function handleFilterByCreate(e) {
    e.preventDefault();
    dispatch(filterByCreate(e.target.value));
    setFilterSelected(e.target.value);
    setPage(1);
  }

  return (
    <div className="containerNav">
      <div className="separarcomponents">
        <div className="containerFilter">
          <select
            className="filter"
            onChange={(e) => handleFilterByName(e)}
            defaultValue="Order Alphabetically"
          >
            <option disabled>Order Alphabetically</option>
            <option value="Asc">A-Z</option>
            <option value="Desc">Z-A</option>
          </select>

          <select
            className="filter"
            onChange={(e) => handleFilterByAttack(e)}
            defaultValue="Order by Attack"
          >
            <option disabled>Order by Attack</option>
            <option value="maxAttack">Max attack</option>
            <option value="minAttack">Min attack</option>
          </select>

          <select
            className="filter"
            onChange={(e) => handleFilterByType(e)}
            defaultValue="Filter by type"
          >
            <option disabled>Filter by type</option>
            <option value="All">All types</option>
            {allTypes.map((t) => (
              <option value={t.name} key={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select className="filter" onChange={(e) => handleFilterByCreate(e)}>
            <option value="All">All pokemons</option>
            <option value="Created">Pokemons from database</option>
            <option value="api">Pokemons from API</option>
          </select>
        </div>
        <div className="searchcomponent">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

// className="searchcomponent">
