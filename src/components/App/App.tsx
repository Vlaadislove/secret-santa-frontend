import { MainPage } from '../../pages/MainPage/MainPage'
import { LoginPage } from '../../pages/AuthPage/LoginPage'
import { Layout } from '../Layout/Layout'
import style from './App.module.scss'

import { Routes, Route, Navigate } from 'react-router-dom'
import { Randomize } from '../../pages/Randomize/Randomize'
import { ResultRandomize } from '../../pages/Randomize/ResultRandomize/ResultRandomize'
import { RegisterPage } from '../../pages/AuthPage/RegisterPage'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe } from '../../store/Auth/authSlice'
import { AppDispatch, RootState } from '../../store/store'
import { Account } from '../../pages/Account/Account'
import { NewBox } from '../../pages/Box/NewBox/NewBox'
import { Box } from '../../pages/Box/OpenBox/Box'
import { IsAuthPage } from '../IsAuthPAge/IsAuthPage'

const isAuth = true


export const App = () => {
	const dispatch = useDispatch<AppDispatch>()


	useEffect(() => {
		dispatch(getMe())
	}, [dispatch])


	return (
		<Layout>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/account" element={<Account />} />
				<Route path="/randomize" element={<Randomize />} />
				<Route path="/randomize/:id" element={<ResultRandomize />} />
				<Route path="/box/new" element={<IsAuthPage><NewBox /></IsAuthPage>} />
				<Route path="/box/:id" element={<Box />} />
			</Routes>
		</Layout>
	)
}


