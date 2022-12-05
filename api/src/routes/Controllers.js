const { Pokemon, Type } = require("../db");
const axios = require("axios");
const db = require("../db.js");
const { col } = require("sequelize");

const apiPokemon = async () => {
  try {
    let pokemonArray = [];
    const apiPokemon = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=84"
    );

    const urlPokemon = apiPokemon.data.results.map((e) => axios.get(e.url));

    let totalPokemon = await Promise.all(urlPokemon).then((el) => {
      el.map((p) => {
        pokemonArray.push({
          id: p.data.id,
          name: p.data.name,
          hp: p.data.stats[0].base_stat,
          attack: p.data.stats[1].base_stat,
          defense: p.data.stats[2].base_stat,
          speed: p.data.stats[5].base_stat,
          weight: p.data.weight,
          height: p.data.height,
          types: p.data.types.map((t) => t.type),
          image: p.data.sprites.other.dream_world.front_default,
          createDB: false,
        });
      });
      return pokemonArray;
    });
    return totalPokemon;
  } catch (e) {
    console.log(e);
  }
};

const dbPokemon = async () => {
  try {
    return await Pokemon.findAll({
      attributes: [
        "id",
        "name",
        "hp",
        "attack",
        "defense",
        "speed",
        "weight",
        "height",
        "image",
        "createDB",
      ],
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const allInfo = async () => {
  try {
    const apiInfo = await apiPokemon();
    const dbInfo = await dbPokemon();
    const getAllInfo = [...apiInfo, ...dbInfo];
    return getAllInfo;
  } catch (error) {
    console.log(error);
  }
};

const createPokemons = async (req, res) => {
  const {
    name,
    hp,
    attack,
    defense,
    speed,
    weight,
    height,
    types,
    image,
    createDB,
    color,
  } = req.body;
  if (
    !name ||
    !hp ||
    !attack ||
    !defense ||
    !speed ||
    !weight ||
    !height ||
    !color
  ) {
    res.status(400).send({ msg: "Faltan datos" });
  }
  try {
    const namePokemon = await allInfo();
    if (name) {
      const nameFilter = namePokemon.find(
        (e) => e.name.toLowerCase() === name.toLowerCase()
      );
      if (nameFilter) {
        res.status(400).send({ msg: "El nombre ingresado ya existe" });
      } else {
        let newPokemon = await Pokemon.create({
          name: name,
          hp: hp,
          attack: attack,
          defense: defense,
          speed: speed,
          weight: weight,
          height: height,
          image: image
            ? image
            : "https://cdn.pixabay.com/photo/2019/11/18/15/46/pokemon-4635112_960_720.png",
          createDB: createDB,
          color: color,
        });
        let assignTypes = await Type.findAll({
          where: { name: types },
        });

        newPokemon.addType(assignTypes);
        return res.status(200).send(newPokemon);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getTypes = async (req, res) => {
  const pokemonTypes = await axios.get("https://pokeapi.co/api/v2/type");
  const nameTypes = pokemonTypes.data.results
    .map((el) => el.name)
    .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
    .sort()
    .join();
  let typeArray = nameTypes.split(",").sort();
  typeArray = typeArray.map((el) => ({
    name: el,
  }));
  await Type.bulkCreate(typeArray);
};

const getId = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.includes("-")) {
      const idDB = await Pokemon.findOne({
        where: {
          id: id,
        },
        include: Type,
      });
      if (idDB) {
        const objDB = {
          image: idDB.image,
          name: idDB.name.charAt(0).toUpperCase() + idDB.name.substring(1),
          types: idDB.types
            .map((t) => t.name)
            .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
            .join(" - "),
          hp: idDB.hp,
          attack: idDB.attack,
          defense: idDB.defense,
          speed: idDB.speed,
          height: idDB.height,
          weight: idDB.weight,
          id: idDB.id,
          color: idDB.color,
        };
        return res.status(200).send(objDB);
      } else {
        return res.status(404).json({ msg: "Id not found" });
      }
    }
    let idInfo = await allInfo();
    let filter = idInfo.find((e) => e.id.toString() === id);
    if (filter) {
      const objApi = {
        image: filter.image,
        name: filter.name.charAt(0).toUpperCase() + filter.name.substring(1),
        types: filter.types
          .map((t) => t.name)
          .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
          .join(" - "),
        hp: filter.hp,
        attack: filter.attack,
        defense: filter.defense,
        speed: filter.speed,
        height: filter.height,
        weight: filter.weight,
        id: filter.id,
        color: filter.color,
      };
      return res.status(200).send(objApi);
    } else {
      return res.status(404).json({ msg: "not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
//   const { id } = req.params;
//   try {
//     const totalPokemon = await allInfo();
//     const pokemonId = totalPokemon.find(
//       (pokemon) => pokemon.id.toString() === id.toString()
//     );

//     if (pokemonId) {
//       const obj = {
//         image: pokemonId.image,
//         name:
//           pokemonId.name.charAt(0).toUpperCase() + pokemonId.name.substring(1),
//         types: pokemonId.types
//           .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
//           .join(" - "),
//         hp: pokemonId.hp,
//         attack: pokemonId.attack,
//         defense: pokemonId.defense,
//         speed: pokemonId.speed,
//         height: pokemonId.height,
//         weight: pokemonId.weight,
//         id: pokemonId.id,
//       };
//       res.send(obj);
//     } else {
//       res.status(400).send({ msg: "El id ingresado no existe" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

module.exports = {
  allInfo,
  getTypes,
  createPokemons,
  getId,
};
