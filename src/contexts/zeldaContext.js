import React, { createContext, useContext, useReducer, useCallback } from "react";

const ZeldaContext = createContext();

const ActionTypes = {
  SET_LOADING: "SET_LOADING",
  ADD_CHARACTERS: "ADD_CHARACTERS",
  SET_CURRENT_CHARACTER: "SET_CURRENT_CHARACTER",
  SET_PAGE: "SET_PAGE",
  SET_HAS_MORE_CHARACTERS: "SET_HAS_MORE_CHARACTERS",
};

const initialState = {
  loading: false,
  characters: [],
  currentCharacter: null,
  page: 1,
  hasMoreCharacters: true,
};

const zeldaReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.ADD_CHARACTERS:
      const newCharacters = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        characters: state.page === 1
          ? newCharacters
          : [...state.characters, ...newCharacters],
      };

    case ActionTypes.SET_CURRENT_CHARACTER:
      return {
        ...state,
        currentCharacter: action.payload,
      };

    case ActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case ActionTypes.SET_HAS_MORE_CHARACTERS:
      return {
        ...state,
        hasMoreCharacters: action.payload,
      };

    default:
      return state;
  }
};

export const ZeldaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(zeldaReducer, initialState);

  const listCharacters = useCallback((limit = 12) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });

    fetch(`https://zelda.fanapis.com/api/characters`)
      .then((response) => response.json())
      .then((data) => {
        const characters = Array.isArray(data.data) ? data.data : [];
        const hasMore = characters.length === limit;

        dispatch({ type: ActionTypes.ADD_CHARACTERS, payload: characters });
        dispatch({ type: ActionTypes.SET_HAS_MORE_CHARACTERS, payload: hasMore });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      })
      .catch((error) => {
        console.error("Erro ao buscar personagens", error);
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      });
  }, []);

  const getCharacterDetails = useCallback((id) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });

    fetch(`https://zelda.fanapis.com/api/characters/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const character = data && data.data ? data.data : null;
        dispatch({ type: ActionTypes.SET_CURRENT_CHARACTER, payload: character });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      })
      .catch((error) => {
        console.error("Erro ao buscar personagem", error);
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      });
  }, [])

  return (
    <ZeldaContext.Provider
      value={{
        loading: state.loading,
        characters: state.characters,
        currentCharacter: state.currentCharacter,
        hasMoreCharacters: state.hasMoreCharacters,
        listCharacters,
        getCharacterDetails,
        setPage: (page) => dispatch({ type: ActionTypes.SET_PAGE, payload: page }),
      }}
    >
      {children}
    </ZeldaContext.Provider>
  );
};

export const useZelda = () => {
  return useContext(ZeldaContext);
};