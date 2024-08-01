import style from './StepOneBox.module.scss'
import { useForm } from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { useState } from 'react'
import { ICreateBox } from '../NewBox'

interface IStepOne {
	box: ICreateBox
	setBox: (value: ICreateBox | ((prevBox: ICreateBox) => ICreateBox)) => void;
}


export const StepOneBox: React.FC<IStepOne> = ({ box, setBox }) => {

	const [showError, setShowError] = useState<boolean>(true)
	const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { nameBox: box.nameBox }, shouldFocusError: false, })


	const onSubmit = (data: { nameBox: string }) => {
		setBox((prevBox) => ({
			...prevBox,
			nameBox: data.nameBox,
			step: prevBox.step + 1
		}));
	}

	return (
		<div className={style.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={style.form} noValidate>
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
						<button type='button' className={style.arrow_left}>
							<img src={arrowLeft} alt="arrowLeft" />
						</button>
						<div className={style.number_step}>{`Шаг ${box.step} из 5`}</div>
						<button type='submit' className={style.arrow_right}>
							<img src={arrowRight} alt="arrowRight" />
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
