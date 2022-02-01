/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Component } from "react"
import Slider from "react-slick"
import "../styles/slider.css"
import DATA_SLIDER from "../ressources/data_slider"
import { AiOutlinePlayCircle } from "react-icons/ai"
import { AiOutlinePauseCircle } from "react-icons/ai"
import { FaChevronCircleRight } from "react-icons/fa"
import { FaChevronCircleLeft } from "react-icons/fa"

function SampleNextArrow({ onClick }) {
	return (
		<span className='chevron-slider-right' onClick={onClick}>
			<FaChevronCircleRight />
		</span>
	)
}
function SamplePrevArrow({ onClick }) {
	return (
		<span className='chevron-slider-left' onClick={onClick}>
			<FaChevronCircleLeft />
		</span>
	)
}
export default class AutoPlayMethods extends Component {
	constructor(props) {
		super(props)
		this.play = this.play.bind(this)
		this.pause = this.pause.bind(this)
		this.state = { show: true }
	}
	play() {
		this.slider.slickPlay()
		this.setState({ show: true })
	}
	pause() {
		this.slider.slickPause()
		this.setState({ show: false })
	}
	render() {
		let width = document.documentElement.clientWidth
		const settings = {
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2500,
			pauseOnHover: false,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
		}
		return (
			<div>
				<Slider ref={slider => (this.slider = slider)} {...settings}>
					{DATA_SLIDER.map(el => (
						<div
							key={el}
							css={css`
								height: 80vh;
								width: ${width}px;
								background-image: ${el};
								background-size: cover;
								background-repeat: no-repeat;
								background-position: center;
							`}
						/>
					))}
				</Slider>
				<div className='play-container'>
					{this.state.show ? (
						<AiOutlinePauseCircle
							className='play-container-icon'
							onClick={this.pause}
						/>
					) : (
						<AiOutlinePlayCircle
							className='play-container-icon'
							onClick={this.play}
						/>
					)}
				</div>
			</div>
		)
	}
}
