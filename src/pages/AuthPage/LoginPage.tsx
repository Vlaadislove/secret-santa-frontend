import React, { useState } from 'react'
import style from './Auth.module.scss'
import { FieldValues, useFieldArray, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Info, Eye, EyeOff } from 'lucide-react';

interface FormLogin {
  email: string
  password: string
}

const foo = true


export const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormLogin>({
    shouldFocusError: false,
    mode: 'onChange'
  })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showElement, setShowElement] = useState<boolean[]>(Array(2).fill(true));

  const styleErrors = (index: number) => {
    const setIndex = [...showElement]
    setIndex[index] = !setIndex[index]
    setShowElement(setIndex)
  }

  const onSubmit = (data: FormLogin) => {
    // addStepForOne(data)
  }
 

  return (
    <>
      <div className={style.auth_container}>
        <span className={style.name_page}>Вход на сайт</span>
        <span className={style.link_register}>Еще нет аккаунта? <Link to={'/*#'}>Зарегистрироваться</Link></span>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form_auth}>
          <div className={style.email_item}>
            <div className={style.form_input_name}>
              <span className={style.text_name}>Ваш email</span>
              {errors.email && showElement[0] && (<span className={style.text_errors_name}>{errors.email.message} </span>)}
            </div>
            <input
              {...register('email', {
                required: 'Обязательное поле',
                pattern: {
                  value: /.+@.+\..+/i,
                  message: "Некорректный email"
                },
              })}
              className={`${style.email} ${errors.email && style.input_error}`}
              type="text"
              onFocus={() => styleErrors(0)}
              onBlur={() => styleErrors(0)}
            />
          </div>
          <div className={style.password_item}>
            <div className={style.form_input_name}>
              <span className={style.text_name}>Пароль</span>
              {errors.password && showElement[1] && (<span className={style.text_errors_name}>{errors.password.message} </span>)}
            </div>
            <input
              {...register('password', {
                required: 'Обязательное поле',
                // minLength: { value: 5, message: 'Минимальная длина - 5 символов' },
                // maxLength: { value: 25, message: 'Минимальная длина - 25 символов' },
              })}
              className={`${style.password} ${errors.password && style.input_error}`}
              type={showPassword ? "text" : "password"}
              onFocus={() => styleErrors(1)}
              onBlur={() => styleErrors(1)}
            />
            <div className={style.view} onClick={() => setShowPassword(!showPassword)}>
              {showPassword
                ? <Eye size={34} color="#887c7f" strokeWidth={1.75} />
                : <EyeOff size={34} color="#887c7f" strokeWidth={1.75} />}
            </div>
            <Link to={'/*'} className={style.forgot_password}>Забыли пароль?</Link>
          </div>
          <div className={`${style.error_server} ${foo && style.error_true}`}>{foo && 'Неверное имя пользователя или пароль'}</div>
          <button type='submit' className={style.btn_auth}>
            Войти
          </button>
        </form>
      </div>
    </>
  )
}
