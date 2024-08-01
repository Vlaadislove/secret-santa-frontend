import style from './StepTwoBox.module.scss'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import { useEffect, useState } from 'react'
import { PicturesBox } from '../../../PicturesBox/PicturesBox'
import { ICreateBox } from '../NewBox'

const pictures = ["Gift", "Cocoa", "Mug", "Pudding", "Cupcake", "Tree", "Snowflake", "Lollipop", "Mittens", "Pine", "Ornaments", "Santa", "House", "Photo"]


interface IStepOne {
	box: ICreateBox
	setBox: (value: ICreateBox | ((prevBox: ICreateBox) => ICreateBox)) => void;
}
export const StepTwoBox: React.FC<IStepOne> = ({ box, setBox }) => {
	const [chosen, setChosen] = useState(Array(14).fill(false))
	const [logo, setLogo] = useState<File | null>(box.logo)
	const [picture, setPicture] = useState<string | null>(box.picture)

	useEffect(() => {
		if (picture) {
			const index = pictures.findIndex((p) => p == box.picture)
			handleItemClick(index)
		} else if (logo) {
			handleItemClick(13)
		} else {
			const index = Math.floor(Math.random() * pictures.length)
			setPicture(pictures[index])
			handleItemClick(index)
		}
	}, [])


	const handleItemClick = (index: number) => {
		const newChosen = Array(14).fill(false)
		newChosen[index] = !newChosen[index]
		setChosen(newChosen)
	}

	const setPictureOrLogo = (image: File | string) => {
		if (typeof image == 'object') {
			setLogo(image)
			setPicture(null)
		} else if (typeof image == 'string') {
			setPicture(image)
			setLogo(null)
		}
	}

	const onSubmit = () => {
		setBox((prevBox) => ({
			...prevBox,
			logo,
			picture,
			step: prevBox.step + 1
		}));
	}

	return (
		<div className={style.container}>
			<div className={style.image}>
				{pictures.map((picture, i) => (
					i !== pictures.length - 1 ?
						<div key={i}
							className={style.item}
							onClick={() => {
								setPictureOrLogo(picture)
								handleItemClick(i)
							}

							}>
							<PicturesBox picture={picture} />
							{chosen[i] && (
								<div className={style.choice}>
									<PicturesBox picture='Choice' />
								</div>
							)}
						</div>
						:
						logo == null
							? <label key={i} className={style.item} htmlFor="input__file" onClick={() => handleItemClick(i)}>
								<PicturesBox picture={picture} />
								{chosen[i] && <div className={style.choice}>
									<PicturesBox picture='Choice' />
									<input type="file"
										name="file"
										id="input__file"
										onChange={(e) => {
											if (e.target.files) {
												setPictureOrLogo(e.target.files[0])
											}
										}}
									/>
								</div>}
							</label>
							: <label key={i} className={style.item} htmlFor="input__file" onClick={() => handleItemClick(i)}>
								<img src={URL.createObjectURL(logo)} alt={logo.name} />
								{chosen[i] && <div className={style.choice}>
									<PicturesBox picture='Choice' />
									<input type="file"
										name="file"
										id="input__file"
										onChange={(e) => {
											if (e.target.files) {
												setPictureOrLogo(e.target.files[0])
											}
										}}
									/>
								</div>}
							</label>
				))}
			</div>
			<div className={style.form_footer}>
				<div className={style.form_footer_container}>
					<button type='button' onClick={() => setBox((prevBox) => ({ ...prevBox, step: prevBox.step - 1 }))} className={style.arrow_left}>
						<img src={arrowLeft} alt="arrowLeft" />
					</button>
					<div className={style.number_step}>{`Шаг ${box.step} из 5`}</div>
					<button type='submit' onClick={onSubmit} className={style.arrow_right}>
						<img src={arrowRight} alt="arrowRight" />
					</button>
				</div>
			</div>
		</div >
	)
}
