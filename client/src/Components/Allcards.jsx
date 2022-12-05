import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card/Card.jsx";
import { Link } from "react-router-dom";
import { getPokemons } from "../Redux/Actions";
import "./Allcards.css";

export default function Allcards() {
  let pokemonState = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  return (
    <div>
      <div>
        {pokemonState?.length > 0 ? (
          pokemonState.map((pokemon) => (
            <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`}>
              <Card
                image={pokemon.image}
                name={pokemon.name}
                types={pokemon.types}
              />
            </Link>
          ))
        ) : (
          <h2>No hay nada</h2>
        )}
      </div>
    </div>
  );
}
