import React, { useState } from 'react'
import axios from 'axios'
import style from './Random.module.scss'
import { StepOne } from '../Forms/Randomizer/StepOne/StepOne'
import { StepTwo } from '../Forms/Randomizer/StepTwo/StepTwo'
import { StepThree } from '../Forms/Randomizer/StepThree/StepThree'
import { StepFour } from '../Forms/Randomizer/StepFour/StepFour'

export interface ICreator {
  name: string,
  email: string,
  checkbox: boolean
}

export interface IParty {
  party:{
    name:string,
    email:string
  }[]
}


export const Randomize = () => {
  const [step, setStep] = useState<number>(1)
  const [creator, setCreator] = useState<ICreator>({name:'', email:'', checkbox:true})
  const [party, setParty] = useState<IParty>({party:[]})

  const addStepForOne = (data: ICreator) =>{
    setCreator(data)
    setStep(step+1)
  }
  const addStepForTwo = (data: IParty) =>{
    setParty(data)
    setStep(step+1)
  }

  const addStepForThree = () =>{
    const {checkbox, ...newCreator} = creator
    const combinedObject = {
      create: newCreator,
      party: party.party
    };
    setStep(step+1)
    axios.post('http://localhost:5500/api/randomize', combinedObject);
  }


  const removeStep =()=>{
    setStep(step - 1)
  }

  return (
    <div className={style.form_container}>
      <div className={style.form_card}>
        <div className={style.form_header}>
          <span className={style.header_title}>Быстрая жеребьевка</span>
        </div>
        {step === 1 && <StepOne addStepForOne={addStepForOne} creator={creator}/>}
        {step === 2 && <StepTwo creator={creator} removeStep={removeStep} addStepForTwo={addStepForTwo} party={party}/>}
        {step === 3 && <StepThree creator={creator} removeStep={removeStep} party={party} addStepForThree={addStepForThree}/>}
        {step === 4 && <StepFour/>}
      </div>
    </div>
  )
}
