import React, { ChangeEvent, useState } from 'react'
import style from './StepTwo.module.scss'
import { FieldValues, useFieldArray, useForm } from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { XCircle } from 'lucide-react'
import { FormInputs } from '../StepOne/StepOne'
import { IParty } from '../../../Randomize/Randomize'

interface FormValue {
    party: {
        name: string,
        email: string
    }[]
}
export interface IStepTwo {
    creator: FormInputs
    removeStep: ()=> void
    addStepForTwo:(data: IParty)=> void
    party: IParty
}


export const StepTwo: React.FC<IStepTwo> = ({ creator, removeStep, addStepForTwo, party:{party} }) => {

    const { register, handleSubmit, formState: { errors }, control, clearErrors, watch, trigger } = useForm<FormValue>({
        defaultValues: creator.checkbox
            ? party.length > 1 
                    ? { party:  party.map((item,index)=>({ name: `${index == 0 ? creator.name : item.name}`, email: `${index == 0 ? creator.email : item.email}` }))} 
                    : { party: [{ name: `${creator.name}`, email: `${creator.email}` }, { name: '', email: '' }, { name: '', email: '' }]}
            : party.length > 1 
                    ? { party:  party.map((item)=>({ name: `${item.name}`, email: `${item.email}` }))}
                    : { party: [{ name: ``, email: `` }, { name: ``, email: `` }, { name: ``, email: `` }] },
        shouldFocusError: false,
        mode: 'onBlur'
    })

    const { fields, append, remove, } = useFieldArray({
        name: 'party',
        control
    })

    const onSubmit = (data: IParty) => {
        addStepForTwo(data)
    }

    const handleInputChange = () => {
        if (fields.length < 10) {
            append({ name: '', email: '' }, { shouldFocus: false });
        }

    }

    const validationEmail = (value: string) => {
        const newArray = watch().party.map((p) => p.email).filter((e) => e != '')
        const countItem: { [key: string]: number } = {}
        for (const item of newArray) {
            countItem[item] = countItem[item] ? countItem[item] + 1 : 1
        }
        const result = countItem[value] > 1
        return !result
    }


    const checkErrors = (): `party.${number}.email`[] => {
        const newArray = watch().party.reduce((acc:`party.${number}.email`[], item, index) => {
            if (item.email !== '') {
                acc.push(`party.${index}.email`);
            }
            return acc;
        }, []);
        return newArray
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={style.form_step_two}>
                    {fields.map((field, index) => {
                        return (

                            <div className={style.form_input} key={field.id}>
                                <div className={style.form_one}>
                                    <div className={style.text_input}>
                                        <span className={style.text_name}>Имя участника №{index + 1}</span>
                                        {errors.party?.[index]?.name && (<span className={style.text_email}>{errors.party?.[index]?.name?.message}</span>)}
                                    </div>
                                    <input
                                        {...register(`party.${index}.name`, {
                                            required: 'Обязательное поле'
                                        })}
                                        className={`${style.name} ${errors.party?.[index]?.name && style.input_error} ${creator.checkbox && index == 0 ? style.not_allowed : null}`}
                                        type="text"
                                        onFocus={() => clearErrors(`party.${index}.name`)}
                                        readOnly={creator.checkbox && index == 0 ? true : false}
                                    />
                                </div>
                                <div className={style.form_two}>
                                    <div className={style.text_input}>
                                        <span className={style.text_name}>Email участника №{index + 1}</span>
                                        {errors.party?.[index]?.email && (<span className={style.text_email}>{errors.party?.[index]?.email?.message}</span>)}
                                    </div>
                                    <input
                                        {...register(`party.${index}.email`, 
                                        {
                                            required: 'Обязательное поле',
                                            pattern: {
                                                value: /.+@.+\..+/i,
                                                message: "Некорректный email"
                                            },
                                            onBlur: () => trigger(checkErrors()),
                                            validate: (value) => validationEmail(value) || 'Не уникальный Email'
                                        })} 
                                        className={`${style.email} ${errors.party?.[index]?.email && style.input_error} ${creator.checkbox && index == 0 ? style.not_allowed : null}`}
                                        type="text"
                                        onFocus={() => clearErrors(`party.${index}.email`)}
                                        readOnly={creator.checkbox && index == 0 ? true : false}
                                    />

                                    {creator.checkbox && fields.length > 3 && index >= 1 && <XCircle size={24} color="#757070" strokeWidth={1.5} className={style.close} onClick={() => remove(index)} />}
                                    {!creator.checkbox && fields.length > 3 && <XCircle size={24} color="#757070" strokeWidth={1.5} className={style.close} onClick={() => remove(index)} />}
                                </div>
                            </div>
                        )
                    })}
                    {fields.length < 10 && <button type='button' className={style.append} onClick={handleInputChange}>Добавить участника</button>}
                    <div className={`${style.error} ${Object.keys(errors).length && style.error_back}`}>
                       {Object.keys(errors).length ? <div className={style.error_text}>В форме допущены ошибки</div> : null} 
                    </div>
                </div>
                <div className={style.form_footer}>
                    <div className={style.form_footer_container}>
                        <div className={style.arrow_left} onClick={removeStep}>
                            <img src={arrowLeft} alt="" />
                        </div>
                        <div className={style.number_step}>Шаг 2 из 3</div>
                        <button type='submit' className={style.arrow_right}>
                            <img src={arrowRight} alt="" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}


<div>
</div>