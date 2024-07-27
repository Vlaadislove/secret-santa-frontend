import React, { useState } from 'react'
import style from './NewBox.module.scss'
import { StepOneBox } from './StepOne/StepOneBox'
import { StepTwoBox } from './StepTwo/StepTwoBox'

export const NewBox = () => {
	const [step, setStep] = useState<number>(2)


	return (
		<div >
			<div className={style.container}>
				<div className={style.form_header}>
					{step === 1 && <p>Придумайте название коробке</p>}
					{step === 2 && <p>Выберите обложку</p>}
					{step === 3 && <p>Стоимость подарков</p>}
					{step === 4 && <p>Дополнительные настройки</p>}
				</div>
				<div className={style.form_body}>
					{step === 1 && <StepOneBox />}
					{step === 2 && <StepTwoBox />}
				</div>
			</div>
		</div >
	)
}
