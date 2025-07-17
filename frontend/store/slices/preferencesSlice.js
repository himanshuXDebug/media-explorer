import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  favoriteCategories: ["technology", "sports"],
  darkMode: false,
  language: "en",
}

const loadFromStorage = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("userPreferences")
    return saved ? JSON.parse(saved) : initialState
  }
  return initialState
}

const preferencesSlice = createSlice({
  name: "preferences",
  initialState: loadFromStorage(),
  reducers: {
    setFavoriteCategories: (state, action) => {
      state.favoriteCategories = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
        document.documentElement.classList.toggle("dark", state.darkMode)
      }
    },
    setLanguage: (state, action) => {
      state.language = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("userPreferences", JSON.stringify(state))
      }
    },
    resetPreferences: (state) => {
      Object.assign(state, initialState)
      if (typeof window !== "undefined") {
        localStorage.removeItem("userPreferences")
        document.documentElement.classList.remove("dark")
      }
    },
  },
})

export const { setFavoriteCategories, toggleDarkMode, setLanguage, resetPreferences } = preferencesSlice.actions
export default preferencesSlice.reducer
