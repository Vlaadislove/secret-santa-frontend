import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { instance } from '../../utils/axios'
import axios, { AxiosError } from 'axios';

interface BoxUserPayload {
	useWish: boolean
	cashLimitMax: number | null
	cashLimitCurrency: string
	cashLimitMin: number | null
	nameBox: string,
	picture: string | null,
	useCashLimit: boolean,
	useNames: boolean,
	usePhone: boolean,
	logo: File | null
}

interface BoxUserResponse {
	_id: string;
	box: {
		useWish: boolean;
		cardsId: string | null;
		cashLimitMax: number | null;
		cashLimitCurrency: string;
		cashLimitMin: number | null;
		inviteLink: string;
		logo: string | null;
		nameBox: string;
		participantsNumber: number;
		picture: string | null;
		useCashLimit: boolean;
		useNames: boolean;
	};
	admin: {
		email: string;
		username: string;
	};
	isAdmin: boolean;
	canCreateCards: boolean;
}



interface authState {
	// username: string | null,
	// email: string | null,
	// userId: string | null,
	// isLoading: boolean,
	// error: string | null
	// isAuth: boolean
}


export const getBoxes = createAsyncThunk('boxes/getBoxes',
	async () => {
		try {
		}
		catch (err) {
		}
	}
)
export const getBox = createAsyncThunk('boxes/getBox',
	async () => {
		try {
		}
		catch (err) {
		}
	}
)
export const createBox = createAsyncThunk('boxes/createBox',
	async (box: BoxUserPayload) => {
		try {
			const formData = new FormData();

			for (const key in box) {
				const value = box[key as keyof BoxUserPayload];
				if (key == 'logo' && value == null) {
					continue
				} else {
					formData.append(key, value as keyof BoxUserPayload);
				}
			}
			const { data } = await instance.post<string>(`/box/create-box`, formData, {
				withCredentials: true,
			})
			return data

			// localStorage.setItem('deviceId', data.deviceId);
			// return data
		}
		catch (err) {
		}
	}
)


const initialState: authState = {

}

export const boxesSlice = createSlice({
	name: 'boxes',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// builder
		// 	.addCase(registerUser.pending, (state) => {
		// 		state.isLoading = true
		// 	})
		// 	.addCase(registerUser.fulfilled, (state, action) => {

		// 	})
		// 	.addCase(registerUser.rejected, (state, action) => {

		// 	})
	}
})