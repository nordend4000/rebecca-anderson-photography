import React from "react"
import { Helmet } from "react-helmet"
import NavLinks from "../components/NavLinks"
import Layout from "../components/Layout"
import { motion } from "framer-motion"
import { Page } from "../ressources/variants"
import "../styles/pages.css"

function About() {
	return (
		<motion.div initial='initial' animate='animate' exit='exit' variants={Page}>
			<Layout>
				<div className='page-container'>
					<Helmet>
						<title>Rebecca Anderson Photography - About</title>
						<meta
							name='title'
							content='Rebecca Anderson Photography - About'
							data-react-helmet='true'
						/>
						<meta
							name='description'
							content='A short introduction about Rebecca Anderson De La Llana the author and photographer of this high quality photographs e-commerce website - Rebecca Anderson Photography'
						/>
					</Helmet>
					<div className='page-line'></div>
					<h2 className='categorie-title'>About</h2>
					<div className='about-container '>
						<div className='about-img-container '>
							<img
								alt='Photographer Rebecca Anderson de la llana'
								className='about-image'
								src='https://res.cloudinary.com/rebecca-anderson-photography/image/upload/v1632231249/low/about_ua1aig.jpg'
							/>
						</div>
						<div className='about-txt-container '>
							<div>
								As child, my dad introduced me to the art of photography using
								an old Pentax camera. Capturing my adventures in astounding
								images has since become a passion for me as the pictures in this
								website demonstrate.
							</div>
							<div>
								I'm from Spain but based in Zurich, Switzerland at the moment. I
								also lived in France, Germany and Australia for 3 years where I
								travelled a lot with <i>my photo assistant</i>.
							</div>
							<div>
								Photography is one of my hobbies, I'm a medical doctors,
								specialized in paediatric intensive care. I really enjoy to
								discover new horizons, encountering different cultures, diverse
								landscapes and getting to know the world “Beyond”. I also spent
								time in Malawi, Tanzania, Ethiopia, Haiti and Lebanon, working
								for NGO's.{" "}
							</div>
							<div>
								During my various visits volunteering as doctors in Africa I
								became enchanted with Ethiopia. After a hiking trek in the
								Simien Mountains National Park, I published a travel book with
								my dad and my sister to support a local community with their
								water supply needs. Please visit our project website :{" "}
								<a
									className='link-about'
									href='https://beyond-simienmountains.herokuapp.com'>
									The Book - Beyond - Simien Mountains
								</a>
							</div>
							<div>
								I would like to acknowledge my grateful thanks to{" "}
								<a className='link-about' href='https://romaingioux.dev'>
									Romain Gioux
								</a>{" "}
								for creating this beatutiful handcrafted website.
							</div>
						</div>
					</div>
					<NavLinks />
				</div>
			</Layout>
		</motion.div>
	)
}

export default About
