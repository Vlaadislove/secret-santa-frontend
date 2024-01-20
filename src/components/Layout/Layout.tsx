import React from 'react'
import { Navbar } from '../Navbar/Navbar'
import style from './Layout.module.scss'

// @ts-ignore
export const Layout = ({children}) => {

  return (
    <>
    <Navbar/>
    <div className={style.container}>
    {children}
    </div>
    </>
  )
}
