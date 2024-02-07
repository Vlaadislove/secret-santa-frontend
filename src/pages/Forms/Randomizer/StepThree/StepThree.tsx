import React from 'react'
import style from './StepThree.module.scss'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { Info } from 'lucide-react';
import { FormInputs } from '../StepOne/StepOne';
import { IParty } from '../../../Randomize/Randomize'


interface IStepThree {
  creator: FormInputs
  removeStep: () => void
  addStepForThree: () => void
  party: IParty
}

export const StepThree: React.FC<IStepThree> = ({ creator, removeStep, party: { party }, addStepForThree }) => {
  return (
    <div>
      <div className={style.form_step_three}>
        <div className={style.title}>
          <div className={style.icon}>
            <Info size={30} color="#18aa5b" />
          </div>
          <div className={style.text}>
            <span>Проверьте, все ли участники на месте. После нажатия на кнопку<br /> "Продолжить" мы отправим письма участникам.</span>
          </div>
        </div>

        <div className={style.creator}>
          <span className={style.creator_text}>Организатор</span>
          <div className={style.creator_line}></div>
        </div>
        <div className={style.form_input}>
          <div className={style.form_one}>
            <div className={style.text_input}>
              <span className={style.text_name}>Ваше Имя</span>
            </div>
            <input
              className={style.name}
              type="text"
              value={creator.name}
              readOnly={true}
            />
          </div>
          <div className={style.form_two}>
            <div className={style.text_input}>
              <span className={style.text_name}>Ваш Email</span>
            </div>
            <input
              className={style.email}
              value={creator.email}
              type="email"
              readOnly={true}
            />
          </div>
        </div>

        <div className={style.creator}>
          <span className={style.creator_text}>Участники</span>
          <div className={style.creator_line}></div>
        </div>
        {party.map((item, index) => {
          return (
            <div className={style.form_input} key={index}>
              <div className={style.form_one}>
                <div className={style.text_input}>
                  <span className={style.text_name}>Имя участника №{index + 1}</span>
                </div>
                <input
                  className={style.name}
                  type="text"
                  readOnly={true}
                  value={item.name}
                />
              </div>
              <div className={style.form_two}>
                <div className={style.text_input}>
                  <span className={style.text_name}>Email участника №{index + 1}</span>
                </div>
                <input
                  className={style.email}
                  type="email"
                  readOnly={true}
                  value={item.email}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className={style.form_footer}>
        <div className={style.form_footer_container}>
          <div className={style.arrow_left} onClick={removeStep}>
            <img src={arrowLeft} alt="" />
          </div>
          <div className={style.number_step}>Шаг 3 из 3</div>
          <button className={style.arrow_right} onClick={addStepForThree}>
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}
