import React, { useState } from 'react'
import style from './Random.module.scss'
import { StepOne } from '../Forms/Randomizer/StepOne/StepOne'
import { StepTwo } from '../Forms/Randomizer/StepTwo/StepTwo'

export const Random = () => {
  const [step, setStep] = useState<number>(1)
  const [creator, setCreator] = useState<object>({})

  const doneStepOne = (data:object) =>{
    setCreator(data)
    setStep(step+1)
  }

  // const removeStepOne =()=>{
  //   setStep(step - 1)
  // }


  return (
    <div className={style.form_container}>
      <div className={style.form_card}>
        <div className={style.form_header}>
          <span className={style.header_title}>Быстрая жеребьевка</span>
        </div>
        {step === 1 && <StepOne doneStepOne={doneStepOne}/>}
        {step === 2 && <StepTwo/>}
      </div>
    </div>
  )
}
