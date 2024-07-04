import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import style from './ResultRandomize.module.scss'
import arrow from "../../../assets/arrow-right-randomize.svg"
import { Info, Eye, EyeOff } from 'lucide-react';

interface IParties {
    gifter: { name: string, email: string },
    recipient: { name: string, email: string },
    _id: string
}

export const ResultRandomize = () => {
    const [data, setData] = useState<IParties[] | null>(null)
    const [view, setView] = useState<boolean[]>([])
    const params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<IParties[]>(`http://localhost:5000/api/randomize/${params.id}`);
                setData(response.data);
                setView(Array(response.data.length).fill(false))
            } catch (error) {
                console.error('Ошибка получения данных:', error);
            }
        };
        fetchData();
    }, []);

    const handleClick = (index: number) => {
        const newView = [...view];
        newView[index] = !newView[index];
        setView(newView);
    }

    return (
        <div>
            <div className={style.randomize}>
                <div className={style.header_title}>Результаты быстрой жеребьевки</div>
                <div className={style.info}>
                    <div className={style.info_icon}>
                        <Info size={20} color="#67568c" />
                    </div>
                    <div className={style.info_text}>
                        <div className={style.text}>
                            На этой странице показан актуальный список подопечных и их Тайных Сант.
                            Чтобы узнать/скрыть Тайного Санту, кликните на соответсвующую иконку в виде глаза.
                        </div>
                    </div>
                </div>
                {data?.map((item, index) => (
                    <div className={style.party} key={index}>
                        <div className={style.gifter}>
                            <div className={style.gifter_name}>{item.gifter.name}</div>
                            <br />
                            <div className={style.gifter_name}>{item.gifter.email}</div>
                        </div>
                        <div className={style.arrow}><img src={arrow} alt="Cтрелка" /></div>
                        {view[index]
                            ? <div className={style.recipient}>
                                <span className={style.recipient_name}>{item.recipient.name}</span>
                                <br />
                                <span className={style.recipient_name}>{item.recipient.email}</span>
                                <div className={style.view}>

                                    <EyeOff onClick={() => { handleClick(index) }} size={40} color="#67568c" strokeWidth={1.75} />
                                </div>

                            </div>
                            : <div className={style.recipient}>
                                <span className={style.steals}>Скрытый участник</span>
                                <div className={style.view}>
                                    <Eye onClick={() => { handleClick(index) }} size={40} color="#67568c" strokeWidth={1.75} />
                                </div>
                            </div>}
                    </div>
                )
                )}

            </div>
        </div>
    )
}
