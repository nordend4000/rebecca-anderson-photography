/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Helmet } from "react-helmet"
import "../styles/grid.css"
import { Link } from "react-router-dom"
import { IoIosArrowDropleft } from "react-icons/io"
import { GoHome } from "react-icons/go"
import DATA_THEMES from "../ressources/data_themes"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function Themes() {
	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<Helmet>
					<title>Rebecca Anderson Photography - Themes</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - Themes'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Themes of High Quality Photographs for sale printed on paper, canvas, metal & digital download : Mountain, Urban, Lake, Oceanic, Sunset, Wildlife, Waterfall, Black & White'
					/>
				</Helmet>
				<div className='page-container'>
					<div className='page-line'></div>
					<div className='categorie-title'>Themes</div>
					<div class='grid-container-categorie '>
						{DATA_THEMES.map(item => (
							<Link
								key={item.id}
								to={item.link}
								className={`item-themes${item.id} grid-item-categorie`}
								css={css`
									background-image: ${item.img};
									background-size: cover;
									background-repeat: no-repeat;
									background-position: center;
								`}>
								<div className='grid-title'>{item.name}</div>
								<div className='grid-overlay'>
									<div className='grid-view-more'>VIEW MORE</div>
								</div>
							</Link>
						))}
					</div>
					<div className='nav-link-container'>
						<Link className='nav-link' to='/galleries'>
							<IoIosArrowDropleft className='nav-link-icon' />
							Visit Galleries
						</Link>
						<Link className='nav-link' to='/'>
							<GoHome className='nav-link-icon' />
							Back Home
						</Link>
					</div>
				</div>
			</Layout>
		</motion.div>
	)
}

export default Themes
