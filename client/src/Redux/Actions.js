import axios from "axios";

export const getPokemons = () => {
  return async (dispatch) => {
    let pedidoApi = await axios.get("http://localHost:3001/pokemons");
    dispatch({ type: "GET_POKEMON", payload: pedidoApi.data });
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    let pedidoApi = await axios.get("http://localHost:3001/types");
    dispatch({ type: "GET_TYPES", payload: pedidoApi.data });
  };
};

export const getPokemonNames = (name) => {
  return async (dispatch) => {
    try {
      let pedidoApi = await axios.get(
        `http://localHost:3001/pokemons?name=${name}`
      );
      dispatch({ type: "GET_NAME_POKEMON", payload: pedidoApi.data });
    } catch (error) {
      alert("No existe ningun pokemon con ese nombre", error);
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      let pedidoApi = await axios.get(`http://localHost:3001/pokemons/${id}`);
      dispatch({ type: "GET_DETAILS", payload: pedidoApi.data });
    } catch (error) {
      alert("No hay ningun pokemon con ese ID", error);
    }
  };
};

export const createPokemon = (payload) => {
  return async (dispatch) => {
    try {
      let pedidoApi = await axios.post(
        "http://localHost:3001/pokemons/create",
        payload
      );
      dispatch({
        type: "CREATE_POKEMON",
        payload: pedidoApi.data,
      });
    } catch (error) {
      alert("Error al crear un nuevo pokemon", error);
    }
  };
};

//------------Filtrados--------------//

export const filterByType = (payload) => {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
};

export const filterByCreate = (payload) => {
  return {
    type: "FILTER_BY_CREATE",
    payload,
  };
};

//------------Orden------------------//
export const ascOrder = (payload) => {
  return {
    type: "ASC_ORDER",
    payload,
  };
};

export const descOrder = (payload) => {
  return {
    type: "DESC_ORDER",
    payload,
  };
};

export const orderByAttack = (payload) => {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
};

export const clearState = (type) => {
  return { type: "CLEAR_STATE" };
};
