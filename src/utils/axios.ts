import axios from 'axios'
import * as settings from '../settings'


export const instance = axios.create({
    baseURL: settings.BASE_URL,
})