let initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_NAME_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    //FILTRADOS

    case "FILTER_BY_TYPE":
      const filterTypes = state.allPokemons;
      const type =
        action.payload === "All"
          ? filterTypes.filter((poke) => poke.types.length > 0)
          : filterTypes.filter(
              (poke) =>
                poke.types &&
                poke.types
                  .map((t) => t.name)
                  .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
                  .includes(action.payload)
            );
      return {
        ...state,
        pokemons: type,
      };

    case "FILTER_BY_CREATE":
      const orderCreate =
        action.payload === "Created"
          ? state.allPokemons.filter((e) => e.createDB)
          : state.allPokemons.filter((e) => !e.createDB);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : orderCreate,
      };

    //ORDEN

    case "ASC_ORDER":
      let ascOrder = state.pokemons.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });
      return {
        ...state,
        pokemons: ascOrder,
      };

    case "DESC_ORDER":
      let descOrder = state.pokemons.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        return 0;
      });
      return {
        ...state,
        pokemons: descOrder,
      };

    case "ORDER_BY_ATTACK":
      let orderAttack =
        action.payload === "maxAttack"
          ? state.pokemons.sort(function (a, b) {
              return b.attack - a.attack;
            })
          : state.pokemons.sort(function (a, b) {
              return a.attack - b.attack;
            });
      return {
        ...state,
        pokemons: orderAttack,
      };

    case "CLEAR_STATE":
      return {
        ...state,
        detail: [],
      };

    default:
      return state;
  }
}
