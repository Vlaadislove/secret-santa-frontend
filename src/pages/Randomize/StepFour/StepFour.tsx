import StepFourAnimals from '../../../assets/StepFourAnimals.png'
import style from './StepFour.module.scss'
import { Link } from 'react-router-dom'

export const StepFour = () => {
    return (
        <div>
            <div className={style.main}>
                <div className={style.penguins}>
                    <img src={StepFourAnimals} alt="there are penguins here" />
                </div>
                <div className={style.tittle}>
                    <div className={style.tittle_item}>Жеребьевка проведена!</div>
                </div>
                <div className={style.text}>
                    <div className={style.text_item}>Письма с подопечными отправляются участникам, а вам<br/> отправлено письмо со ссылкой на результаты жеребьевки.</div>
                </div>
            </div>



            <div className={style.form_footer}>
                <Link className={style.go_to_home} to={'/'}>Вернуться на главную</Link>
            </div>
        </div>
    )
}
