import { createContext, useContext, useReducer, useCallback } from "react";

const ZeldaContext = createContext();

const ActionTypes = {
  SET_LOADING: "SET_LOADING",
  ADD_CHARACTERS: "ADD_CHARACTERS",
  SET_CURRENT_CHARACTER: "SET_CURRENT_CHARACTER",
  SET_PAGE: "SET_PAGE",
  SET_HAS_MORE_CHARACTERS: "SET_HAS_MORE_CHARACTERS",
  SET_GAME: "SET_GAME",
  SET_ERROR: "SET_ERROR",
};

const initialState = {
  loading: false,
  characters: [],
  currentCharacter: null,
  page: 1,
  hasMoreCharacters: true,
  games: {},
  error: null,
};

const zeldaReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.SET_HAS_MORE_CHARACTERS:
      return {
        ...state,
        hasMoreCharacters: action.payload,
      };

    case ActionTypes.ADD_CHARACTERS:
      return {
        ...state,
        characters: Array.isArray(action.payload) ? action.payload : [],
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

    case ActionTypes.SET_GAME:
      return {
        ...state,
        games: {
          ...state.games,
          [action.payload.id]: action.payload,
        },
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const ZeldaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(zeldaReducer, initialState);

  const listCharacters = useCallback(async (name = "") => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.SET_ERROR, payload: null });
    dispatch({ type: ActionTypes.ADD_CHARACTERS, payload: [] });

    const capitalizeWords = (str) =>
      String(str).replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

    const searchName = name ? capitalizeWords(name) : "";
    const currentPage = state.page;
    let allCharacters = [];

    try {
      while (true) {
        const queryParams = new URLSearchParams();
        queryParams.append("page", currentPage);
        if (searchName.trim()) {
          queryParams.append("name", name.trim());
        }

        const response = await fetch(`https://zelda.fanapis.com/api/characters?${queryParams.toString()}`);

        const data = await response.json();

        const characters = Array.isArray(data.data) ? data.data : [];
        if (characters.length === 0) break;

        allCharacters = [...allCharacters, ...characters];
        dispatch({ type: ActionTypes.ADD_CHARACTERS, payload: allCharacters });
      }

      dispatch({ type: ActionTypes.SET_HAS_MORE_CHARACTERS, payload: false });
      dispatch({ type: ActionTypes.SET_PAGE, payload: currentPage + 1 });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message || "Erro ao buscar personagens" });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  }, [state.page]);

  const getCharacterDetails = useCallback((id) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    dispatch({ type: ActionTypes.SET_ERROR, payload: null });

    fetch(`https://zelda.fanapis.com/api/characters/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const character = data && data.data ? data.data : null;
        dispatch({ type: ActionTypes.SET_CURRENT_CHARACTER, payload: character });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message || "Erro ao buscar personagem" });
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      });
  }, []);

  const getGameById = useCallback(async (id) => {
    if (state.games[id]) return;

    try {
      const res = await fetch(`https://zelda.fanapis.com/api/games/${id}`);
      const data = await res.json();
      if (data.data) {
        dispatch({ type: ActionTypes.SET_GAME, payload: data.data });
      }
    } catch (err) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: err.message || "Erro ao buscar jogo" });
    }
  }, [state.games]);

  return (
    <ZeldaContext.Provider
      value={{
        loading: state.loading,
        characters: state.characters,
        currentCharacter: state.currentCharacter,
        hasMoreCharacters: state.hasMoreCharacters,
        listCharacters,
        getCharacterDetails,
        getGameById,
        games: state.games,
        error: state.error,
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
