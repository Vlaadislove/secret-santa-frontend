import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./Auth/authSlice"
import { boxesSlice } from "./Boxes/boxesSlise";




export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		boxes: boxesSlice.reducer
	}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch