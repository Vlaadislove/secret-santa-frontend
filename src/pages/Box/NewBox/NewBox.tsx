import React from 'react'
import style from './NewBox.module.scss'
import { StepOneBox } from './StepOne/StepOneBox'


export const NewBox = () => {
	return (
		<div >
			<div className={style.container}>
				<StepOneBox />
			</div>
		</div>
	)
}
