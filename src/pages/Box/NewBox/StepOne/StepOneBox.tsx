import style from './StepOneBox.module.scss'
import { useForm } from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { useState } from 'react'

export const StepOneBox = () => {
	const [showError, setShowError] = useState<boolean>(true)
	const { register, handleSubmit, clearErrors, formState: { errors } } = useForm({ shouldFocusError: false, })

	const onSubmit = (data: any) => {
		console.log(data)
	}


	console.log(errors)
	return (
		<div className={style.container}>
			<form onSubmit={handleSubmit((data: any) => console.log(data))} className={style.form} noValidate>
				<div className={style.body}>
					<div className={style.text_input}>
						<span className={style.text_name}>Название коробки</span>
						{errors.nameBox && showError && (<span className={style.text_input_error}>{errors.nameBox.message?.toString()}</span>)}
					</div>
					<input
						{...register('nameBox', {
							required: 'Обязательное поле',
						})}
						onFocus={() => setShowError(!showError)}
						onBlur={() => setShowError(!showError)}
						className={`${style.input} ${errors.nameBox && style.input_error}`}
						type="text"
					/>
					<div className={style.rules}>
						<span>Вы сможете поменять название позже в настройках</span>
					</div>

				</div>
				<div className={style.form_footer}>
					<div className={style.form_footer_container}>
						<button className={style.arrow_left}>
							<img src={arrowLeft} alt="arrowLeft" />
						</button>
						<div className={style.number_step}>{`Шаг ${1} из 5`}</div>
						<button type='submit' className={style.arrow_right}>
							<img src={arrowRight} alt="arrowRight" />
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
