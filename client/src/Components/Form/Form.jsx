import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getTypes } from "../../Redux/Actions";
import "./Form.css";

export default function Form() {
  const dispatch = useDispatch();
  const allTypes = useSelector((state) => state.types);
  const nameExist = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [errores, setErrores] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrores(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });

    setErrores(
      validate({
        ...input,
        types: [...input.types, e.target.value],
      })
    );
  }

  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== e),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.name) {
      return alert("¡Ingresa un nombre!");
    } else if (typeof input.name !== "string" || input.name.length === 1) {
      return alert("Nombre incorrecto");
    } else if (
      nameExist.find(
        (e) => e.name.toLowerCase() === input.name.toLocaleLowerCase()
      )
    ) {
      return alert("El nombre ingresado ya existe");
    } else if (!input.hp) {
      return alert("Debe completar el campo para puntos de vida");
    } else if (input.hp < 0 || input.hp > 150) {
      return alert("El valor de hp ingresado es invalido");
    } else if (!input.attack) {
      return alert("Debe completar el campo para puntos de ataque");
    } else if (input.attack <= 0 || input.attack > 150) {
      return alert("El valor de ataque es invalido");
    } else if (!input.defense) {
      return alert("Debe completar el campo para puntos de defensa");
    } else if (input.defense <= 0 || input.defense > 150) {
      return alert("El valor de defensa es invalido");
    } else if (!input.speed) {
      return alert("Debe completar el campo para puntos de velocidad");
    } else if (input.speed <= 0 || input.speed > 150) {
      return alert("El valor de velocidad es invalido");
    } else if (!input.height) {
      return alert("Debe completar el campo para la altura del pokemon");
    } else if (input.height <= 0 || input.height > 50) {
      return alert("El valor de altura es invalido");
    } else if (!input.weight) {
      return alert("Debe completar el campo para el peso del pokemon");
    } else if (input.weight <= 0 || input.weight > 2000) {
      return alert("El valor de peso es invalido");
    } else if (input.types.length === 0) {
      return alert("Seleccione el tipo para su pokemon");
    } else if (input.types.length > 2) {
      return alert("Solo se pueden elegir dos tipos por pokemon");
    }
    await axios.post("http://localHost:3001/pokemons/create", input);

    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
    });

    alert("¡Pokemon creado!");
    Redirect("/home");
  }

  function validate(input) {
    let errores = {};
    if (!input.name) {
      errores.name = "¡Ingresa un nombre!";
    } else if (!input.name.match(/^[A-Za-z]+$/)) {
      errores.name = "El tipo de dato del nombre es incorrecto";
    } else if (input.name.length <= 2) {
      errores.name = "El nombre no puede ser menor o igual a 2 caracteres ";
    } else if (input.name.length > 15) {
      errores.name = "El nombre no puede tener mas de 15 caracteres ";
    } else if (
      nameExist.find(
        (e) => e.name.toLowerCase() === input.name.toLocaleLowerCase()
      )
    ) {
      errores.name = alert("El nombre ingresado ya existe");
    } else if (!input.hp) {
      errores.hp = "Ingrese un valor para puntos de vida";
    } else if (input.hp <= 0 || input.hp > 150) {
      errores.hp = "El valor debe ser mayor a 0 y menor a 150";
    } else if (!input.attack) {
      errores.attack = "Ingrese un valor para puntos de ataque";
    } else if (input.attack <= 0 || input.attack > 150) {
      errores.attack = "El valor debe ser mayor a 0 y menor a 150";
    } else if (!input.defense) {
      errores.defense = "Ingrese un valor para puntos de defensa";
    } else if (input.defense <= 0 || input.defense > 150) {
      errores.defense = "El valor debe ser mayor a 0 y menor a 150";
    } else if (!input.speed) {
      errores.speed = "Ingrese un valor para puntos de velocidad";
    } else if (input.speed <= 0 || input.speed > 150) {
      errores.speed = "El valor debe ser mayor a 0 y menor a 150";
    } else if (!input.height) {
      errores.height = "Ingrese un valor para la altura del pokemon";
    } else if (input.height <= 0 || input.height > 50) {
      errores.height = "El valor debe ser mayor a 0 y menor a 50";
    } else if (!input.weight) {
      errores.weight = "Ingrese un valor para el peso del pokemon";
    } else if (input.weight <= 0 || input.weight > 2000) {
      errores.weight = "El valor debe ser mayor a 0 y menor a 2000";
    } else if (!input.image) {
      errores.image = "Ingrese una imagen o se colocara una imagen por defecto";
    }
    return errores;
  }

  return (
    <div className="containerForm">
      <Link to="/home">
        <button className="buttonOne">HOME</button>
      </Link>
      <div className="main">
        <section className="section">
          <form onSubmit={(e) => handleSubmit(e)} className="form">
            <div>
              <h1>CREATE YOUR POKEMON</h1>
              <div className="subtitle">
                <label>Pokemon name: </label>
                <input
                  className="input"
                  type="text"
                  value={input.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />{" "}
                {errores.name && <p>{errores.name}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon hp: </label>
                <input
                  className="input"
                  type="number"
                  value={input.hp}
                  name="hp"
                  onChange={(e) => handleChange(e)}
                />
                {errores.hp && <p>{errores.hp}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon attack: </label>
                <input
                  className="input"
                  type="number"
                  value={input.attack}
                  name="attack"
                  onChange={(e) => handleChange(e)}
                />
                {errores.attack && <p>{errores.attack}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon defense: </label>
                <input
                  className="input"
                  type="number"
                  value={input.defense}
                  name="defense"
                  onChange={(e) => handleChange(e)}
                />
                {errores.defense && <p>{errores.defense}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon speed: </label>
                <input
                  className="input"
                  type="number"
                  value={input.speed}
                  name="speed"
                  onChange={(e) => handleChange(e)}
                />
                {errores.speed && <p>{errores.speed}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon height: </label>
                <input
                  className="input"
                  type="number"
                  value={input.height}
                  name="height"
                  onChange={(e) => handleChange(e)}
                />
                {errores.height && <p>{errores.height}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon weight: </label>
                <input
                  className="input"
                  type="number"
                  value={input.weight}
                  name="weight"
                  onChange={(e) => handleChange(e)}
                />
                {errores.weight && <p>{errores.weight}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon color: </label>
                <input
                  className="input"
                  type="text"
                  value={input.color}
                  name="color"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="subtitle">
                <label>Pokemon image: </label>
                <input
                  className="input"
                  type="url"
                  value={input.image}
                  name="image"
                  onChange={(e) => handleChange(e)}
                />
                {errores.image && <p>{errores.image}</p>}
              </div>

              <div className="subtitle">
                <label>Pokemon types: </label>
                <select
                  className="input"
                  name="types"
                  onChange={(e) => handleSelect(e)}
                >
                  {allTypes.map((t) => (
                    <option value={t.name} key={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <div className="typesPosition">
                  {" "}
                  {input.types.map((t) => (
                    <div className="buttonTypes" key={t}>
                      <p>{t}</p>
                      <button
                        className="buttonDelete"
                        value={t}
                        onClick={() => handleDelete(t)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="buttonForm">
                <button className="styleButton" type="submit">
                  CREATE
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
