import React, { useState } from 'react'
import style from './Random.module.scss'
import { StepOne } from '../Forms/Randomizer/StepOne'

export const Random = () => {
  const [step, setStep] = useState<number>(1)


  return (
    <div className={style.form_container}>
      <div className={style.form_card}>
        <div className={style.form_header}>
          <span className={style.header_title}>Быстрая жеребьевка</span>
        </div>
        {step === 1 && <StepOne />}
      </div>
    </div>
  )
}
