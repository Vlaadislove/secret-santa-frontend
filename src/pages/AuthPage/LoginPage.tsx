import React, { useState } from 'react'
import style from './Auth.module.scss'
import { FieldValues, useFieldArray, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Info, Eye, EyeOff } from 'lucide-react';
import { useLoadingDelay } from '../../hooks/useLoadingDelay';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { loginUser } from '../../store/Auth/authSlice';
import { Preloader } from '../Preloader/Preloader';

interface FormLogin {
  email: string
  password: string
  serverError: string
}

const foo = false


export const LoginPage = () => {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm<FormLogin>({
    shouldFocusError: false,
    mode: 'onChange'
  })
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showElement, setShowElement] = useState<boolean[]>(Array(2).fill(true));

  const isLoading = useSelector((state: RootState) => state.auth.isLoading)
  const showPreloader = useLoadingDelay(isLoading, 1000);

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()


  const styleErrors = (index: number) => {
    const setIndex = [...showElement]
    setIndex[index] = !setIndex[index]
    setShowElement(setIndex)
    clearErrors('serverError')
  }

  const onSubmit = async (data: FormLogin) => {
    const resultAction = await dispatch(loginUser(data))
    if (loginUser.rejected.match(resultAction)) {
      console.log(resultAction.payload?.error)
        setError('serverError', { type: 'server', message: resultAction.payload?.error })

    } else {
      navigate('/')
    }
  }


  return (
    <>
      <div className={style.auth_container}>
        <span className={style.name_page}>Вход на сайт</span>
        <span className={style.link_register}>Еще нет аккаунта? <Link to={'/register'}>Зарегистрироваться</Link></span>
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
          </div>
          <div className={style.wrapper_forgot_password}>
            <Link to={'/*'} className={style.forgot_password}>Забыли пароль?</Link>
          </div>
          <div className={`${style.error_server} ${errors.serverError && style.error_true}`}>{errors.serverError?.message}</div>
          <button type='submit' className={style.btn_auth}>
            Войти
          </button>
          {showPreloader && <Preloader />}
        </form>
      </div>
    </>
  )
}
