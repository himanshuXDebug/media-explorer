import { configureStore } from "@reduxjs/toolkit"
import preferencesReducer from "./slices/preferencesSlice"
import contentReducer from "./slices/contentSlice"
import favoritesReducer from "./slices/favoritesSlice"
import { newsApi } from "./services/newsApi"
import { recommendationsApi } from "./services/recommendationsApi"
import { socialApi } from "./services/socialApi"
import {songsApi} from "./services/songApi"

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    content: contentReducer,
    favorites: favoritesReducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [recommendationsApi.reducerPath]: recommendationsApi.reducer,
    [socialApi.reducerPath]: socialApi.reducer,
     [songsApi.reducerPath]: songsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware, recommendationsApi.middleware, socialApi.middleware,songsApi.middleware),
})
