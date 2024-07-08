import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./Auth/authSlice"




export const store = configureStore({
    reducer:{
        auth: authSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch