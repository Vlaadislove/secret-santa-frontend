import React from 'react'
import style from './Navbar.module.scss'
import { Link, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const location = useLocation()


  return (
    <div>
      <div className={style.navbar_container}>
        <div className={style.navbar_item}>
          <div className={style.number_santa}>
            {location.pathname == '/'
              ? <span className={style.santa}>1,2323 Сант в этом году</span>
              : <Link to={'/'} className={style.logo_santa}>ТАЙНЫЙ САНТА<span className={style.dot}>.</span></Link>}
          </div>
          <div className={style.login_lang}>
            <Link to={'/login'} className={style.login}>Вход и регистрация</Link>
            <span className={style.stick}>|</span>
            <span className={style.lang}>RU</span>
          </div>
        </div>
      </div>
    </div>
  )
}
