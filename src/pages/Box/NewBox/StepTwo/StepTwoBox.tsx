import style from './StepTwoBox.module.scss'
import arrowLeft from '../../../../assets/arrow left.svg'
import arrowRight from '../../../../assets/arrow right.svg'
import {useState } from 'react'
import { PicturesBox } from '../../../PicturesBox/PicturesBox'

const pictures = ["Gift", "Cocoa", "Mug", "Pudding", "Cupcake", "Tree", "Snowflake", "Lollipop", "Mittens", "Pine", "Ornaments", "Santa", "House", "Photo"]

export const StepTwoBox = () => {
	const [chosen, setChosen] = useState(Array(14).fill(false))
	const [logo, setLogo] = useState<File | null>(null)
	const [picture, setPicture] = useState<string | null>(null)

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
					<button className={style.arrow_left}>
						<img src={arrowLeft} alt="arrowLeft" />
					</button>
					<div className={style.number_step}>{`Шаг ${1} из 5`}</div>
					<button type='submit' className={style.arrow_right}>
						<img src={arrowRight} alt="arrowRight" />
					</button>
				</div>
			</div>
		</div >
	)
}
