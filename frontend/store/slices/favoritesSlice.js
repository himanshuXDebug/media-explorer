import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
}

const loadFavoritesFromStorage = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("userFavorites")
    return saved ? JSON.parse(saved) : initialState
  }
  return initialState
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFavoritesFromStorage(),
  reducers: {
    addToFavorites: (state, action) => {
      const item = action.payload
      const exists = state.items.find((fav) => fav.id === item.id && fav.type === item.type)
      if (!exists) {
        state.items.push(item)
        if (typeof window !== "undefined") {
          localStorage.setItem("userFavorites", JSON.stringify(state))
        }
      }
    },
    removeFromFavorites: (state, action) => {
      const { id, type } = action.payload
      state.items = state.items.filter((item) => !(item.id === id && item.type === type))
      if (typeof window !== "undefined") {
        localStorage.setItem("userFavorites", JSON.stringify(state))
      }
    },
    reorderFavorites: (state, action) => {
      state.items = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("userFavorites", JSON.stringify(state))
      }
    },
    clearFavorites: (state) => {
      state.items = []
      if (typeof window !== "undefined") {
        localStorage.removeItem("userFavorites")
      }
    },
  },
})

export const { addToFavorites, removeFromFavorites, reorderFavorites, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
