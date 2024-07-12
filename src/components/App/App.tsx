import { MainPage } from '../../pages/MainPage/MainPage'
import { LoginPage } from '../../pages/AuthPage/LoginPage'
import { Layout } from '../Layout/Layout'
import style from './App.module.scss'

import { Routes, Route } from 'react-router-dom'
import { Randomize } from '../../pages/Randomize/Randomize'
import { ResultRandomize } from '../../pages/Randomize/ResultRandomize/ResultRandomize'
import { RegisterPage } from '../../pages/AuthPage/RegisterPage'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from '../../store/Auth/authSlice'
import { AppDispatch } from '../../store/store'




export const App = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getMe())
  }, [])


  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/randomize" element={<Randomize />} />
        <Route path="/randomize/:id" element={<ResultRandomize />} />
      </Routes>
    </Layout>
  )
}


