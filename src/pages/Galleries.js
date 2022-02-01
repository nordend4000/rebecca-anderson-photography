/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"
import { IoIosArrowDropleft } from "react-icons/io"
import { GoHome } from "react-icons/go"
import DATA_GALLERIES from "../ressources/data_galleries"
import "../styles/grid.css"
import { motion } from "framer-motion"
import Layout from "../components/Layout"
import { Page } from "../ressources/variants"

function Galleries() {
	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<Helmet>
					<title>Rebecca Anderson Photography - Galleries</title>
					<meta
						name='title'
						content='Rebecca Anderson Photography - Galleries'
						data-react-helmet='true'
					/>
					<meta
						name='description'
						content='Galleries of High Quality Photographs for sale printed on paper, canvas, metal & digital download : Australia, New-Zealand, Europe, Africa & Panoramic - Rebecca Anderson Photography'
					/>
				</Helmet>
				<div className='page-container'>
					<div className='page-line'></div>
					<div className='categorie-title'>Galleries</div>
					<div class='grid-container-categorie '>
						{DATA_GALLERIES.map(item => (
							<Link
								key={item.id}
								to={item.link}
								className={`item-galleries${item.id} grid-item-categorie`}
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
						<Link className='nav-link' to='/themes'>
							<IoIosArrowDropleft className='nav-link-icon' />
							Visit Themes
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

export default Galleries
