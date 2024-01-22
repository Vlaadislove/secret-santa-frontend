import React, { useState } from 'react'
import style from '../StepOne/StepOne.module.scss'
import clock from '../../../../assets/clock.svg'
import { Link } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'

interface doneStepOne {
    doneStepOne: (data:object) => void;
}

export const StepOne: React.FC<doneStepOne> = ({doneStepOne}) => {
    const [showElement, setShowElement] = useState<boolean[]>(Array(2).fill(true));
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({ shouldFocusError: false })

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

    const onSubmit = (data: FieldValues) => {
        doneStepOne(data)
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
                                        required: 'Обязательное поле'
                                    })}
                                    className={`${style.name} ${errors.name && style.input_error}`}
                                    type="text"
                                    onFocus={() => styleErrorsFocus(0)}
                                    onBlur={() => { styleErrorsBlur(0); trigger("name") }}
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
                                        }

                                    })}
                                    className={`${style.email} ${errors.email && style.input_error}`}
                                    type="email"
                                    onFocus={() => styleErrorsFocus(1)}
                                    onBlur={() => { styleErrorsBlur(1); trigger("email")  }}
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
                        <div className={`${style.error} ${errors.name || errors.email ? style.error_back : null}`}>
                                {errors.name || errors.email ? (<div className={style.error_text}>В форме допущены ошибки</div>) : null}
                            </div>
                    </div>
                    <div className={style.form_footer}>
                        <div className={style.form_footer_container}>
                            <Link to={'/'} className={style.arrow_left}>
                                <img src={arrowLeft} alt="" />
                            </Link>
                            <div className={style.number_step}>Шаг 1 из 3</div>
                            <button className={style.arrow_right} type='submit'>
                                <img src={arrowRight} alt="" />
                            </button>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}
