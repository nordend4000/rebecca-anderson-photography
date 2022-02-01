/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import "../styles/grid.css"
import { Link } from "react-router-dom"
import DATA_GRID from "../ressources/data_grid"

function Grid() {
	return (
		<div className='grid-container'>
			{DATA_GRID.map(item => (
				<Link
					key={item.id}
					to={item.link}
					className={`item${item.id} grid-item `}
					css={css`
						background-image: ${item.img};
						background-size: cover;
						background-repeat: no-repeat;
						background-position: center;
						display: flex;
						flex-direction: column;
						justify-content: center;
					`}>
					<div className='grid-title'>{item.name}</div>
					<div className='grid-overlay'>
						<span className='grid-view-more'>View More</span>
					</div>
				</Link>
			))}
		</div>
	)
}

export default Grid
