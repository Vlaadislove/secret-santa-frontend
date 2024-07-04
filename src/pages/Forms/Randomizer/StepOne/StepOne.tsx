import React, { useState } from 'react'
import style from '../StepOne/StepOne.module.scss'
import clock from '../../../../assets/clock.svg'
import { Link } from 'react-router-dom'
import { useForm,} from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { ICreator } from '../../../Randomize/Randomize'

export type FormInputs = {
    name: string;
    email: string;
    checkbox: boolean
};

interface IStepOne {
    addStepForOne: (data: ICreator) => void;
    creator: FormInputs
}

export const StepOne: React.FC<IStepOne> = ({ addStepForOne, creator:{name,checkbox,email} }) => {
    const [showError, setShowError] = useState<boolean>(false)
    const [showElement, setShowElement] = useState<boolean[]>(Array(2).fill(true));
    const { register, handleSubmit, formState: { errors }} = useForm<FormInputs>({
        defaultValues: name == ''
        ? {name:'', email:'', checkbox: true}
        : {name:`${name}`, email:`${email}`, checkbox: checkbox} ,
         shouldFocusError: false,
          mode: 'onChange' })

    const styleErrorsFocus = (index: number) => {
        const setIndex = [...showElement]
        setIndex[index] = false
        setShowElement(setIndex)
    }
    const styleErrorsBlur = (index: number) => {
        const setIndex = [...showElement]
        setIndex[index] = true
        setShowElement(setIndex)
    }


    const onSubmit = (data: ICreator) => {
        addStepForOne(data)
    }
    


    return (
        <div className={style.test}>
            <div className={style.form_main}>


                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={style.form}>
                        <div className={style.form_title}>
                            <div className={style.icon_item}>
                                <img src={clock} alt="clock" />
                            </div>
                            <div className={style.text_item}>
                                <span className={style.rules_one}>Здесь вы можете провести случайную жеребьевку между участниками,
                                    не приглашая их на сайт. После проведения каждый участник получит письмо с именем подопечного, а вы — письмо
                                    со ссылкой на результаты жеребьевки. <p>Ограничение — 100 участников.</p></span>
                                <span className={style.rules_two}>Участники не смогут написать свои пожелания. Если вы хотите писать
                                    пожелания, оповещать об отправлении подарков и влиять на жеребьевку -
                                    <Link to={'/box/new'}> создайте коробку.</Link></span>
                            </div>
                        </div>
                        <div className={style.form_input}>
                            <div className={style.form_one}>
                                <div className={style.text_input}>
                                    <span className={style.text_name}>Ваше имя</span>
                                    {errors.name && showElement[0] && (<span className={style.text_email}>{errors.name.message?.toString()}</span>)}
                                </div>
                                <input
                                    {...register('name', {
                                        required: 'Обязательное поле',
                                        onChange: () => {
                                            setShowError(false)
                                        },
                                    })}
                                    className={`${style.name} ${errors.name && style.input_error}`}
                                    type="text"
                                    onFocus={() => styleErrorsFocus(0)}
                                    onBlur={() => styleErrorsBlur(0)}
                                />
                            </div>
                            <div className={style.form_two}>
                                <div className={style.text_input}>
                                    <span className={style.text_name}>Ваш email</span>
                                    {errors.email && showElement[1] && (<span className={style.text_email}>{errors.email.message?.toString()} </span>)}
                                </div>
                                <input
                                    {...register('email', {
                                        required: 'Обязательное поле',
                                        pattern: {
                                            value: /.+@.+\..+/i,
                                            message: "Некорректный email"
                                        },
                                        onChange: () => {
                                            setShowError(false)
                                        }

                                    })}
                                    className={`${style.email} ${errors.email && style.input_error}`}
                                    type="text"
                                    onFocus={() => styleErrorsFocus(1)}
                                    onBlur={() => styleErrorsBlur(1)}
                                />
                            </div>
                        </div>
                        <div className={style.checkbox}>
                            <div className={style.checkbox_rules}>
                                <div className={style.checkbox_title}>Я тоже участвую</div>
                                <div className={style.checkbox_text}>Включите опцию, если вы тоже планируете участвовать в жеребьевке —
                                    вам автоматически будет создана запись участника</div>
                            </div>
                            <div className={style.checkbox_btn}>
                                <label className={style.form_switch}>
                                    <input
                                        {...register('checkbox')}
                                        type="checkbox"
                                    />
                                    <i></i>
                                </label>
                            </div>
                        </div>
                        <div className={style.data}>Продолжая, вы даете согласие на <Link to={'#'}>обработку персональных данных.</Link></div>
                        <div className={`${style.error} ${showError ? style.error_back : null}`}>
                            {showError ? (<div className={style.error_text}>В форме допущены ошибки</div>) : null}
                        </div>
                    </div>
                    <div className={style.form_footer}>
                        <div className={style.form_footer_container}>
                            <Link to={'/'} className={style.arrow_left}>
                                <img src={arrowLeft} alt="" />
                            </Link>
                            <div className={style.number_step}>Шаг 1 из 3</div>
                            <div onClick={() => Object.keys(errors).length == 0 ? setShowError(false) : setShowError(true)}>
                                <button className={style.arrow_right} type='submit'>
                                    <img src={arrowRight} alt="" />
                                </button>
                            </div>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}
