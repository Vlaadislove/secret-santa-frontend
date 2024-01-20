import React from 'react'
import style from './StepOne.module.scss'
import clock from '../../../assets/clock.svg'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import arrowLeft from '../../../assets/arrow left.svg'
import arrowRight from '../../../assets/arrow right.svg'



export const StepOne = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = () => {
    }


    return (
        <div>
            <div className={style.form_main}>


                <form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
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
                                    <span className={style.text_email}>Обязательное поле</span>
                                </div>
                                <input
                                    {...register('name', {
                                        required: 'Обязательное поле'
                                    })}
                                    className={style.name}
                                    type="text"
                                />
                            </div>
                            <div className={style.form_two}>
                                <div className={style.text_input}>
                                    <span className={style.text_name}>Ваш email</span>
                                    <span className={style.text_email}>Обязательное поле</span>
                                </div>
                                <input
                                    {...register('email', {
                                        required: 'Обязательное поле',
                                        pattern: {
                                            value: /.+@.+\..+/i,
                                            message: "Некорректный email"
                                        }

                                    })}
                                    className={style.email}
                                    type="email"
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
                                        // className={style.ios_toggle}
                                        type="checkbox"
                                    />
                                    <i></i>
                                </label>
                            </div>
                        </div>
                        <div className={style.data}>Продолжая, вы даете согласие на <Link to={'#'}>обработку персональных данных.</Link></div>
                        <div className={style.error}>
                            <div className={style.error_text}>В форме допущены ошибки</div>
                        </div>
                    </div>
                    <div className={style.form_footer}>
                        <div className={style.form_footer_container}>
                            <Link to={'*'} className={style.arrow_left}>
                                <img src={arrowLeft} alt="" />
                            </Link>
                            <div className={style.number_step}>Шаг 1 из 3</div>
                            <button className={style.arrow_right}>
                                <img src={arrowRight} alt="" />
                            </button>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    )
}
