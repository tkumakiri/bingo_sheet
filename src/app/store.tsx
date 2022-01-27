import { configureStore } from '@reduxjs/toolkit'
import massReducer from '../features/mass/massSlice'

export const store = configureStore({
  reducer: {
    mass: massReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
