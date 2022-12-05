const { Router } = require("express");
const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const { getTypes, allInfo, createPokemons, getId } = require("./Controllers");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
  try {
    const { name } = req.query;

    const totalPokemon = await allInfo();

    if (name) {
      let namePokemon = totalPokemon.filter(
        (e) => e.name.toLowerCase().trim() === name.toLocaleLowerCase().trim()
      );
      if (namePokemon.length > 0) {
        res.status(200).send(namePokemon);
      } else {
        res.status(400).send({ msg: "El pokemon ingresado no existe" });
      }
    } else {
      res.status(200).send(totalPokemon);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/pokemons/create", createPokemons);

router.get("/types", async (req, res) => {
  const dbPokemon = await Type.findAll();
  if (dbPokemon.length > 0) {
    res.send(dbPokemon);
  } else {
    let filterType = await getTypes();
    filterType
      ? res.status(200).send(filterType)
      : res.status(400).send("No llegan los tipos de pokemon");
  }
});

router.get("/pokemons/:id", getId);

module.exports = router;
