import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/Auth/authSlice'
import { AppDispatch } from '../../store/store'
import { useNavigate } from 'react-router-dom'

export const Account = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()



    return (
        <div>
            <div>Account</div>
            <div>Account</div>
            <div>Account</div>
            <br></br>
            <button onClick={() => {
                dispatch(logoutUser())
                navigate('/')
            }}>Выйти из профиля</button>
        </div>
    )
}
