import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail, clearState } from "../../Redux/Actions";
import "./Detail.css";

export default function Detail({ setPage }) {
  const dispatch = useDispatch();
  const pokeDetail = useSelector((state) => state.detail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [id, dispatch]);

  const desmontar = () => {
    window.history.back();
    dispatch(clearState());
  };

  return (
    <div className="fondoDetail">
      {pokeDetail?.name ? (
        <div>
          <div className="containerDetail">
            <Link to="/home" onClick={() => desmontar()}>
              <button className="buttonDetail">Return to home</button>
            </Link>
          </div>
          <div className="separarComponents">
            <div className="imageName">
              <img className="imageDetail" src={pokeDetail.image}></img>
              <h1>{pokeDetail.name}</h1>
            </div>
            <div className="dataDetail">
              <h3>Types: {pokeDetail.types} </h3>
              <h3>Hp: {pokeDetail.hp}</h3>
              <h3>Attack: {pokeDetail.attack}</h3>
              <h3>Defense: {pokeDetail.defense}</h3>
              <h3>Speed: {pokeDetail.speed}</h3>
              <h3>Height: {pokeDetail.height}</h3>
              <h3>Weight: {pokeDetail.weight}</h3>
              <h3>ID: {pokeDetail.id}</h3>
              <h3>Color: {pokeDetail.color}</h3>
            </div>
          </div>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
}
