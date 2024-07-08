import React, { useState } from 'react'
import style from './Auth.module.scss'
import { FieldValues, useFieldArray, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Info, Eye, EyeOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store';
import { registerUser } from '../../store/Auth/authSlice';

export interface FormRegister {
  username: string
  email: string
  password: string
  serverError: string
}



export const RegisterPage = () => {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormRegister>({
    shouldFocusError: false,
    mode: 'onChange'
  })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showElement, setShowElement] = useState<boolean[]>(Array(3).fill(true));
  // const {status} = useSelector(state => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const styleErrors = (index: number) => {
    const setIndex = [...showElement]
    setIndex[index] = !setIndex[index]
    setShowElement(setIndex)
  }

  const onSubmit = async (data: FormRegister) => {
    const resultAction = await dispatch(registerUser(data))
    if (registerUser.rejected.match(resultAction)) {
      console.log(resultAction.payload?.errorMessage)
      setError('serverError', { type: 'server', message: resultAction.payload?.errorMessage })
    }
  }
  return (
    <>
      <div className={style.auth_container}>
        <span className={style.name_page}>Регистрация</span>
        <span className={style.link_register}>Еще нет аккаунта? <Link to={'/login'}>Войти на сайт</Link></span>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form_auth}>
          <div className={style.username_item}>
            <div className={style.form_input_name}>
              <span className={style.text_name}>Ваше имя</span>
              {errors.username && showElement[0] && (<span className={style.text_errors_name}>{errors.username.message} </span>)}
            </div>
            <input
              {...register('username', {
                required: 'Обязательное поле'
              })}
              className={`${style.username} ${errors.username && style.input_error}`}
              type="text"
              onFocus={() => styleErrors(0)}
              onBlur={() => styleErrors(0)}
            />
          </div>
          <div className={style.email_item}>
            <div className={style.form_input_name}>
              <span className={style.text_name}>Ваш email</span>
              {errors.email && showElement[1] && (<span className={style.text_errors_name}>{errors.email.message} </span>)}
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
              onFocus={() => styleErrors(1)}
              onBlur={() => styleErrors(1)}
            />
          </div>
          <div className={style.password_item}>
            <div className={style.form_input_name}>
              <span className={style.text_name}>Пароль</span>
              {errors.password && showElement[2] && (<span className={style.text_errors_name}>{errors.password.message} </span>)}
            </div>
            <input
              {...register('password', {
                required: 'Обязательное поле',
                minLength: { value: 5, message: 'Минимальная длина - 5 символов' },
                maxLength: { value: 25, message: 'Минимальная длина - 25 символов' },
              })}
              className={`${style.password} ${errors.password && style.input_error}`}
              type={showPassword ? "text" : "password"}
              onFocus={() => styleErrors(2)}
              onBlur={() => styleErrors(2)}
            />
            <div className={style.view} onClick={() => setShowPassword(!showPassword)}>
              {showPassword
                ? <Eye size={34} color="#887c7f" strokeWidth={1.75} />
                : <EyeOff size={34} color="#887c7f" strokeWidth={1.75} />}
            </div>
          </div>
          {/* TODO:сделать плавное пояление serverError и добавить туда ссылку 'войти' */}
          <div className={`${style.error_server} ${errors.serverError && style.error_true}`}>{errors.serverError?.message}</div>
          <button type='submit' className={style.btn_auth}>
            Зарегистрироваться
          </button>
        </form>
      </div>
    </>
  )
}
