import { useState } from 'react'
import style from './StepThreeBox.module.scss'
import { useForm } from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { ICreateBox } from '../NewBox'


const foo = true

interface IStepOne {
	box: ICreateBox
	setBox: (value: ICreateBox | ((prevBox: ICreateBox) => ICreateBox)) => void;
}
export const StepThreeBox: React.FC<IStepOne> = ({ box, setBox }) => {
	const [showError, setShowError] = useState<boolean[]>([false, false])
	const [selectedOption, setSelectedOption] = useState<string>(box.cashLimitCurrency);
	const [showCheckbox, setShowCheckbox] = useState<boolean>(box.useCashLimit)

	const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm(
		{
			defaultValues: { checkbox: showCheckbox, cashLimitMin: box.cashLimitMin, cashLimitMax: box.cashLimitMax },
			shouldFocusError: false,
			mode: 'onChange'
		})


	const styleErrors = (index: number) => {
		const setIndex = [...showError]
		setIndex[index] = !setIndex[index]
		setShowError(setIndex)
	}

	const onSubmit = (data: any) => {
		if (data.checkbox) {
			setBox((prevBox) => ({
				...prevBox,
				cashLimitCurrency: selectedOption,
				useCashLimit: data.checkbox,
				cashLimitMin: Number(data.cashLimitMin),
				cashLimitMax: Number(data.cashLimitMax),
				step: prevBox.step + 1
			}))
		} else {
			setBox((prevBox) => ({
				...prevBox,
				cashLimitCurrency: 'Рубль',
				useCashLimit: false,
				cashLimitMin: null,
				cashLimitMax: null,
				step: prevBox.step + 1
			}))
		}
	}


	return (
		<div className={style.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={style.form} noValidate>
				<div className={style.checkbox}>
					<div className={style.checkbox_rules}>
						<div className={style.checkbox_title}>Ограничить стоимость подарков</div>
						<div className={style.checkbox_text}>При включенной опции участникам будет показано ограничение, которому они должны будут следовать.
							Ограничение будет показано на странице подопечного</div>
					</div>
					<div className={style.checkbox_btn}>
						<label className={style.form_switch}>
							<input
								{...register('checkbox')}
								type="checkbox"
								onClick={() => setShowCheckbox(!showCheckbox)}
							/>
							<i></i>
						</label>
					</div>
				</div>
				{showCheckbox && <div className={style.body}>
					<div className={style.input_one}>
						<div className={style.text_input}>
							<span className={style.text_name}>От</span>
							{errors.cashLimitMin && errors.cashLimitMin?.type !== 'validate' && !showError[0] && (<span className={style.text_input_error}>{errors.cashLimitMin.message?.toString()}</span>)}
						</div>
						<input
							{...register('cashLimitMin', {
								required: 'Обяз. поле',
								pattern: {
									value: /^[0-9]*$/,
									message: "Только числа"
								},
								onChange() {
									trigger('cashLimitMax')
								},
								validate: value => (Number(watch("cashLimitMax")) === undefined || Number(value) < Number(watch("cashLimitMax"))) || 'Минимальная сумма больше чем максимальная!'
							})}
							onFocus={() => styleErrors(0)}
							onBlur={() => {
								styleErrors(0)
							}}
							className={`${style.input} ${errors.cashLimitMin && errors.cashLimitMin?.type !== 'validate' && style.input_error}`}
							type="text"
						/>
					</div>
					<div className={style.two}>
						<div className={style.text_input}>
							<span className={style.text_name}>До</span>
							{errors.cashLimitMax && errors.cashLimitMax?.type !== 'validate' && !showError[1] && (<span className={style.text_input_error}>{errors.cashLimitMax.message?.toString()}</span>)}
						</div>
						<input
							{...register('cashLimitMax', {
								required: 'Обяз. поле',
								pattern: {
									value: /^[0-9]*$/,
									message: "Только числа"
								},
								onChange() {
									trigger('cashLimitMin')
								},
								validate: value => (Number(watch("cashLimitMin")) === undefined || Number(value) > Number(watch("cashLimitMin"))) || 'Минимальная сумма больше чем максимальная!'
							})}
							onFocus={() => styleErrors(1)}
							onBlur={() => {
								styleErrors(1)
							}}
							className={`${style.input} ${errors.cashLimitMax && errors.cashLimitMax?.type !== 'validate' && style.input_error}`}
							type="text"
						/>
					</div>
					<div className={style.select} >
						<span className={style.text_name}>Валюта</span>
						<select className={style.select_input} value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
							<option className={style.value} value="Рубль">Рубль</option>
							<option className={style.value} value="Евро">Евро</option>
							<option className={style.value} value="Доллар">Доллар</option>
							<option className={style.value} value="Тенге">Тенге</option>
						</select>
					</div>
				</div>}
				<div className={`${style.error} ${errors.cashLimitMin?.type === 'validate' && showCheckbox ? style.error_back : null}`}>
					{errors.cashLimitMin?.type === 'validate' && showCheckbox
						? (<div className={style.error_text}>{errors.cashLimitMax?.message?.toString() || errors.cashLimitMin?.message?.toString()}</div>)
						: null}
				</div>
				<div className={style.form_footer}>
					<div className={style.form_footer_container}>
						<button type='button' onClick={() => setBox((prevBox) => ({ ...prevBox, step: prevBox.step - 1 }))} className={style.arrow_left} >
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
