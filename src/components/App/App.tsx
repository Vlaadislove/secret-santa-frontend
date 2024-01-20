import { MainPage } from '../../pages/MainPage/MainPage'
import { LoginPage } from '../../pages/LoginPage/LoginPage'
import { Layout } from '../Layout/Layout'
import style from './App.module.scss'

import { Routes, Route } from 'react-router-dom'
import { Random } from '../../pages/Randomizer/Random'



export const App = () => {
  return (
    <Layout>
     <Routes>
     <Route path="/" element={<MainPage />}  />
     <Route path="/login" element={<LoginPage/>}/>
     <Route path="/randomizer" element={<Random/>}/>
     </Routes>
    </Layout>
  )
}


