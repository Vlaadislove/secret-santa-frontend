import React from 'react'
import style from './Navbar.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Archive, CircleUser } from 'lucide-react';

export const Navbar = () => {
	const location = useLocation()
	const { isAuth, isLoading } = useSelector((state: RootState) => state.auth)

	if (isAuth) {
		return (
			<div>
				<div className={style.navbar_container}>
					<div className={style.navbar_item}>
						<div className={style.number_santa}>
							{location.pathname == '/'
								? <span className={style.santa}>1,2323 Сант в этом году</span>
								: <Link to={'/'} className={style.logo_santa}>ТАЙНЫЙ САНТА<span className={style.dot}>.</span></Link>}
						</div>
						<div className={style.main_itim}>
							<div className={style.test}>
								<Link to={'/boxes'} className={style.boxes_item}>
									<Archive />
									<span className={style.boxes}>Коробки</span>
								</Link>
								<Link to={'/account'} className={style.account_item}>
									<span className={style.account}>Влад Михайлов</span>
									<CircleUser />
								</Link>
							</div>
							<div>
								<span className={style.stick}>|</span>
								<span className={style.lang}>RU</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div>
			<div className={style.navbar_container}>
				{!isLoading && <div className={style.navbar_item}>
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
				</div>}
			</div>
		</div>
	)
}
