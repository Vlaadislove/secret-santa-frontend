import React from 'react'
import style from './MainPage.module.scss'
import animals from '../../assets/full.svg'
import { Link } from 'react-router-dom'


export const MainPage = () => {

  return (
    <div >
      <div className={style.img_animals}>
        <img src={animals} alt="Animals" />
      </div>
      <div className={style.info}>
        <div className={style.tittle}>тайный санта<span className={style.dot}>.</span></div>
        <div className={style.text}>Организуй тайный обмен подарками между<br/> друзьями или коллегами</div>
        <div className={style.button_box}>
          <Link to={'/box/new'} className={style.main_box}>
            <span  className={style.btn_main}>Создать коробку</span>
          </Link>
          <Link to={'/randomize'} className={style.randomizer_box}>
            <span  className={style.btn_randomizer}>Быстрая жеребьевка</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
