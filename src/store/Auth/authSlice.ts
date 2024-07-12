import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { instance } from '../../utils/axios'
import axios, { AxiosError } from 'axios';

interface AuthUserResponse {
    username: string,
    email: string,
    id: string,
    deviceId: string;
}

interface AuthUserPayload {
    username?: string;
    email: string;
    password: string;
}
interface ValidationErrors {
    error: string

}

interface authState {
    username: string | null,
    email: string | null,
    userId: string | null,
    isLoading: boolean,
    error: string | null
    isAuth: boolean
}


export const registerUser = createAsyncThunk<AuthUserResponse, AuthUserPayload, { rejectValue: ValidationErrors }>('auth/registerUser',
    async (dateClient: AuthUserPayload, { rejectWithValue }) => {
        try {
            const { username, email, password } = dateClient
            const { data } = await instance.post<AuthUserResponse>('/auth/register', {
                username,
                email,
                password
            }, {
                withCredentials: true
            })
            localStorage.setItem('deviceId', data.deviceId);
            return data
        }
        catch (err) {
            if (!axios.isAxiosError(err)) {
                throw err;
            }
            let error: AxiosError<ValidationErrors> = err
            if (error.response && error.response.status === 409) return rejectWithValue(error.response.data)
            else throw error
        }
    }
)
export const loginUser = createAsyncThunk<AuthUserResponse, AuthUserPayload, { rejectValue: ValidationErrors }>('auth/loginUser',
    async (dateClient: AuthUserPayload, { rejectWithValue }) => {
        try {
            const { email, password } = dateClient
            const deviceIdFromStorage = localStorage.getItem('deviceId');

            const { data } = await instance.post<AuthUserResponse>(`/auth/login`, {
                email,
                password
            }, {
                withCredentials: true,
                params: {
                    deviceId: deviceIdFromStorage
                }
            })

            localStorage.setItem('deviceId', data.deviceId);
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

export const getMe = createAsyncThunk<AuthUserResponse, void, { rejectValue: ValidationErrors }>('auth/getMe',
    async (_, { rejectWithValue }) => {
        try {

            const deviceIdFromStorage = localStorage.getItem('deviceId');
            const { data } = await instance.get<AuthUserResponse>(`/auth/me`,
                {
                    withCredentials: true,
                    params: {
                        deviceId: deviceIdFromStorage
                    }
                })
            localStorage.setItem('deviceId', data.deviceId);
            return data
        }
        catch (err) {
            if (!axios.isAxiosError(err)) {
                throw err;
            }
            let error: AxiosError<ValidationErrors> = err
            if (error.response && error.response.status === 401) return rejectWithValue(error.response.data)
            else throw error
        }
    }
)



const initialState: authState = {
    username: null,
    userId: null,
    email: null,
    isLoading: false,
    error: null,
    isAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Регистрация
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.email = action.payload.email
                state.userId = action.payload.id
                state.username = action.payload.username
                state.isLoading = false
                state.isAuth = true
            })
            .addCase(registerUser.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload.error
                }
                state.isLoading = false
            })

        builder
            // Логин
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.email = action.payload.email
                state.userId = action.payload.id
                state.username = action.payload.username
                state.isLoading = false
                state.isAuth = true
            })
            .addCase(loginUser.rejected, (state, action) => {
                if (action.payload) {
                    console.log(action.payload)
                    state.error = action.payload.error
                }
                state.isLoading = false
            })

        builder
            // Проверка авторизации
            .addCase(getMe.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.email = action.payload.email
                state.userId = action.payload.id
                state.username = action.payload.username
                state.isLoading = false
                state.isAuth = true
            })
            .addCase(getMe.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload.error
                }
                state.isLoading = false

            })
    }
})