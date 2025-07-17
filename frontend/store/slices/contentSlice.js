import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  searchQuery: "",
  currentPage: 1,
  loading: false,
  error: null,
}

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setSearchQuery, setCurrentPage, setLoading, setError } = contentSlice.actions
export default contentSlice.reducer
