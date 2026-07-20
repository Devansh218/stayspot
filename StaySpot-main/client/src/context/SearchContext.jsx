import { createContext, useReducer } from "react"

const initialState = {
    dates: [],
    city: undefined,
    rooms: undefined,
}

export const SearchContext = createContext(initialState)


const searchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return initialState;
        default:
            return state;
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(searchReducer, initialState)
    return (
        <SearchContext.Provider value={{ dates: state.dates, city: state.city, rooms: state.rooms, dispatch }}>
            {children}
        </SearchContext.Provider>
    )
}