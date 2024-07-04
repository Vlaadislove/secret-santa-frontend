import { MainPage } from '../../pages/MainPage/MainPage'
import { LoginPage } from '../../pages/AuthPage/LoginPage'
import { Layout } from '../Layout/Layout'
import style from './App.module.scss'

import { Routes, Route } from 'react-router-dom'
import { Randomize } from '../../pages/Randomize/Randomize'
import { ResultRandomize } from '../../pages/Randomize/ResultRandomize/ResultRandomize'




export const App = () => {
  return (
    <Layout>
     <Routes>
     <Route path="/" element={<MainPage />}  />
     <Route path="/login" element={<LoginPage/>}/>
     <Route path="/randomize" element={<Randomize/>}/>
     <Route path="/randomize/:id" element={<ResultRandomize/>}/>
     </Routes>
    </Layout>
  )
}


