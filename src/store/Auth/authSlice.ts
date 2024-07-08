import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { instance } from '../../utils/axios'
import { FormRegister } from '../../pages/AuthPage/RegisterPage';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface RegisterUserResponse {
    deviceId: string;
}

interface RegisterUserPayload {
    username: string;
    email: string;
    password: string;
}
interface ValidationErrors {
    errorMessage: string;
}

interface authState {
    user: null,
    email: null,
    isLoading: boolean,
    error: string | null
}


export const registerUser = createAsyncThunk<RegisterUserResponse, RegisterUserPayload, { rejectValue: ValidationErrors }>('auth/registerUser',
    async (dateClient: RegisterUserPayload, { rejectWithValue }) => {
        try {
            const { username, email, password } = dateClient
            const {data} = await instance.post<RegisterUserResponse>('/auth/register',{
                username,
                email,
                password
            },{
                withCredentials:true
            })
            console.log(data)
            return data
        }
        catch (err) {
            if (!axios.isAxiosError(err)) {
                throw err;
            }
            let error: AxiosError<ValidationErrors> = err
            console.log(error.response)
            if (error.response && error.response.status === 409) return rejectWithValue(error.response.data)
            else throw error
        }
    }
)
export const registUser = createAsyncThunk<RegisterUserResponse, RegisterUserPayload, { rejectValue: ValidationErrors }>('auth/registerUser',
    async (dateClient: RegisterUserPayload, { rejectWithValue }) => {
        try {
            const { username, email, password } = dateClient
            const {data} = await instance.post<RegisterUserResponse>('/auth/register',{
                username,
                email,
                password
            },{
                withCredentials:true
            })
            // TODO: сохранить девайс в local storage
            console.log(data)
            return data
        }
        catch (err) {
            if (!axios.isAxiosError(err)) {
                throw err;
            }
            let error: AxiosError<ValidationErrors> = err
            console.log(error.response)
            if (error.response && error.response.status === 409) return rejectWithValue(error.response.data)
            else throw error
        }
    }
)


const initialState: authState = {
    user: null,
    email: null,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.rejected, (state, action) => {
                if(action.payload?.errorMessage){
                    state.error = action.payload.errorMessage
                }
                state.isLoading = false
            })
    }
})