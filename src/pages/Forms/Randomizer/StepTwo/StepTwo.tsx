import React, { ChangeEvent, useRef } from 'react'
import style from './StepTwo.module.scss'
import { FieldValues, useFieldArray, useForm } from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { XCircle } from 'lucide-react'

type FormValue = {
    party: {
        name: string,
        email: string
    }[]

}




export const StepTwo = () => {
    const lastInputRef = useRef<HTMLInputElement | null>(null);
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormValue>({
        defaultValues: {
            party: [{ name: 'vlad', email: '1903934@dfsf.sdfs' }]
        },
    })
    const { fields, append, remove } = useFieldArray({
        name: 'party',
        control
    })

    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value && index === fields.length - 1 && fields.length < 10) {
            append({ name: '', email: '' }, { shouldFocus: false });
        }
    }
    const foo = false
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.form_step_two}>

                    {fields.map((field, index) => {
                        return (
                            <div className={style.form_input} key={field.id}>
                                <div className={style.form_one}>
                                    <div className={style.text_input}>
                                        <span className={style.text_name}>Имя участника №1</span>
                                        {errors.name && (<span className={style.text_email}>{errors.name.message?.toString()}</span>)}
                                    </div>
                                    <input
                                        {...register(`party.${index}.name`, {
                                            required: 'Обязательное поле',
                                        })}
                                        className={`${style.name} ${errors.name && style.input_error}`}
                                        type="text"
                                        onChange={(event) => handleInputChange(index, event)}
                                    // ref={index === fields.length - 1 ? lastInputRef : null}
                                    />
                                </div>
                                <div className={style.form_two}>
                                    <div className={style.text_input}>
                                        <span className={style.text_name}>Email участника №1</span>
                                        <span className={style.text_email}>Обязательное поле</span>
                                    </div>
                                    <input
                                        {...register(`party.${index}.email`, {
                                            required: 'Обязательное поле',
                                            pattern: {
                                                value: /.+@.+\..+/i,
                                                message: "Некорректный email"
                                            }

                                        })}
                                        className={`${style.email}`}
                                        type="email"
                                    />
                                    <XCircle size={24} color="#757070" strokeWidth={1.5} className={style.close} onClick={()=>remove(index)}/>
                                </div>
                            </div>
                        )
                    })}
                    <button type='button' onClick={() => append({
                        name: '',
                        email: ''
                    })}>append</button>




                    <div className={`${style.error}`}>
                        <div className={style.error_text}>В форме допущены ошибки</div>
                    </div>
                </div>
                <div className={style.form_footer}>
                    <div className={style.form_footer_container}>
                        <div className={style.arrow_left}>
                            <img src={arrowLeft} alt="" />
                        </div>
                        <div className={style.number_step}>Шаг 2 из 3</div>
                        <button className={style.arrow_right}>
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