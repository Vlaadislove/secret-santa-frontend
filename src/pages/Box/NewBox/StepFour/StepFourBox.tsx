import React from 'react'
import style from './StepFourBox.module.scss'
import { useForm } from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { ICreateBox } from '../NewBox'

interface IStepOne {
	box: ICreateBox
	setBox: (value: ICreateBox | ((prevBox: ICreateBox) => ICreateBox)) => void;
}

export const StepFourBox: React.FC<IStepOne> = ({ box, setBox }) => {
	const { register, handleSubmit, } = useForm({
		defaultValues: {
			checkboxWish: box.useWish,
			checkboxNames: box.useNames,
			checkboxPhone: box.usePhone,
		}
	})

	const onSubmit = (data: { checkboxWish: boolean, checkboxNames: boolean, checkboxPhone: boolean }) => {
		setBox((prevBox) => ({
			...prevBox,
			useWish: data.checkboxWish,
			useNames: data.checkboxNames,
			usePhone: data.checkboxPhone,
		}));
	}

	return (
		<div className={style.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={style.form} noValidate>
				<div className={style.checkbox}>
					<div className={style.checkbox_rules}>
						<div className={style.checkbox_title}>Пожелания по подаркам</div>
						<div className={style.checkbox_text}>При включенной опции участники смогут написать пожелания к подарку.</div>
					</div>
					<div className={style.checkbox_btn}>
						<label className={style.form_switch}>
							<input
								{...register('checkboxWish')}
								type="checkbox"
							/>
							<i></i>
						</label>
					</div>
				</div>
				<div className={style.checkbox}>
					<div className={style.checkbox_rules}>
						<div className={style.checkbox_title}>Номер телефона</div>
						<div className={style.checkbox_text}>При включенной опции участники будут обязаны оставить свой
							номер телефона. Если опция выключена, номер телефона не обязателен.</div>
					</div>
					<div className={style.checkbox_btn}>
						<label className={style.form_switch}>
							<input
								{...register('checkboxPhone')}
								type="checkbox"
							/>
							<i></i>
						</label>
					</div>
				</div>
				<div className={style.checkbox}>
					<div className={style.checkbox_rules}>
						<div className={style.checkbox_title}>Показывать имена участников</div>
						<div className={style.checkbox_text}>При включенной опции участники будут видеть имена других игроков.
							Когда опция выключена, участники будут видеть только аватарки игроков, но будут видеть имя своего подопечного
							(и только его). Организатор будет видеть имена игроков вне зависимости от состояния опции.</div>
					</div>
					<div className={style.checkbox_btn}>
						<label className={style.form_switch}>
							<input
								{...register('checkboxNames')}
								type="checkbox"
							/>
							<i></i>
						</label>
					</div>
				</div>
				<div className={style.form_footer}>
					<div className={style.form_footer_container}>
						<button type='button' className={style.arrow_left} onClick={() => setBox((prevBox) => ({ ...prevBox, step: prevBox.step - 1 }))} >
							<img src={arrowLeft} alt="arrowLeft" />
						</button>
						<div className={style.number_step}>{`Шаг ${box.step} из 5`}</div>
						<button type='submit' className={style.arrow_right}>
							<img src={arrowRight} alt="arrowRight" />
						</button>
					</div>
				</div>
			</form >
		</div >
	)
}
