import React, { useState } from 'react'
import style from './NewBox.module.scss'
import { StepOneBox } from './StepOne/StepOneBox'
import { StepTwoBox } from './StepTwo/StepTwoBox'
import { StepThreeBox } from './StepThree/StepThreeBox'
import { StepFourBox } from './StepFour/StepFourBox'

export interface ICreateBox {
	useWish: boolean
	cashLimitMax: number | null
	cashLimitCurrency: string
	cashLimitMin: number | null
	nameBox: string,
	picture: string | null,
	useCashLimit: boolean,
	useNames: boolean,
	usePhone: boolean,
	logo: File | null
	step: number
}


export const NewBox = () => {
	const [box, setBox] = useState<ICreateBox>({
		useWish: true,
		cashLimitMax: null,
		cashLimitCurrency: 'Рубль',
		cashLimitMin: null,
		nameBox: '',
		picture: null,
		useCashLimit: false,
		useNames: true,
		usePhone: false,
		logo: null,
		step: 1
	})

	console.log(box)


	return (
		<div >
			<div className={style.container}>
				<div className={style.form_header}>
					{box.step === 1 && <p>Придумайте название коробке</p>}
					{box.step === 2 && <p>Выберите обложку</p>}
					{box.step === 3 && <p>Стоимость подарков</p>}
					{box.step === 4 && <p>Дополнительные настройки</p>}
				</div>
				<div className={style.form_body}>
					{box.step === 1 && <StepOneBox box={box} setBox={setBox} />}
					{box.step === 2 && <StepTwoBox box={box} setBox={setBox} />}
					{box.step === 3 && <StepThreeBox box={box} setBox={setBox} />}
					{box.step === 4 && <StepFourBox box={box} setBox={setBox} />}
				</div>
			</div>
		</div >
	)
}
