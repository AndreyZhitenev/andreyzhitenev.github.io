import React, { useState, useEffect, useRef } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./Work.scss";

const Work = () => {
	const { t } = useTranslation();
	const [activeFilter, setActiveFilter] = useState("All");
	const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
	const [works, setWorks] = useState([]);
	const [filterWork, setFilterWork] = useState([]);
	const [width, setWidth] = useState(0);
	const [alignStyle, setAlignStyle] = useState();
	const [resetTransform, setResetTransform] = useState(true);
	const [drag, setDrag] = useState(true);
	const carousel = useRef();

	useEffect(() => {
		const query = '*[_type == "works"]';

		client.fetch(query).then((data) => {
			setWorks(data);
			setFilterWork(data);
			setTimeout(() => {
				document.querySelectorAll('.app__work-item').forEach((el) => el.click());
			}, 1000);
		});
	}, []);

	// const alignCenter = () => {
	// 	let lengthForSlider = Math.ceil(window.innerWidth / 270);
	// 	filterWork.length < lengthForSlider ? setDrag(false) : setDrag(true);
	// 	let matrix = new DOMMatrix(
	// 		window.getComputedStyle(document.querySelector(".inner-carousel")).transform,
	// 	);
	// 	return filterWork.length < lengthForSlider
	// 		? { alignSelf: "center", position: "relative", left: `${Math.abs(matrix.e)}px` }
	// 		: { alignSelf: "flex-start" };
	// };

	// useEffect(() => {
	// 	setWidth(carousel.current.offsetWidth - window.innerWidth);
	// 	setAlignStyle(alignCenter());
	// 	setResetTransform(true);
	// }, [filterWork]);

	// useEffect(() => {
	// 	document.querySelector(".inner-carousel").style.transform = "translateX(0)";
	// 	document.querySelector(".inner-carousel").style.left = "0";
	// }, [resetTransform]);

	const handleWorkFilter = (item) => {
		setActiveFilter(item);
		setAnimateCard([{ y: 100, opacity: 0 }]);

		setTimeout(() => {
			setAnimateCard([{ y: 0, opacity: 1 }]);

			if (item === "All") {
				setFilterWork(works);
			} else {
				setFilterWork(works.filter((work) => work.tags.includes(item)));
			}
		}, 500);
	};

	return (
		<>
			<h2 className="head-text">{t("work-title")}</h2>
			<div className="app__work-filter">
				{["React", "Vue", "Vanilla JS", "All"].map((item, index) => (
					<div
						key={index}
						onClick={() => handleWorkFilter(item)}
						className={`app__work-filter-item app__flex p-text ${
							activeFilter === item ? "item-active" : ""
						}`}>
						{item}
					</div>
				))}
			</div>

			<motion.div
				ref={carousel}
				animate={animateCard}
				transition={{ duration: 0.3, delayChildren: 0.3 }}
				className={
					resetTransform
						? "app__work-portfolio inner-carousel resetTransform"
						: "app__work-portfolio inner-carousel"
				}
				drag={drag && "x"}
				dragConstraints={drag && { right: 0, left: -width }}
				style={alignStyle}
				onClick={() => setResetTransform(false)}>
				{filterWork.map((work, index) => (
					<motion.div
						className="app__work-item app__flex item"
						key={index}
						onClick={() => setResetTransform(false)}>
						<div className="app__work-img app__flex">
							<img src={urlFor(work.imgUrl)} alt={work.name} />

							<motion.div
								whileHover={{ opacity: [0, 1] }}
								transition={{
									duration: 0.25,
									ease: "easeInOut",
									staggerChildren: 0.5,
								}}
								className="app__work-hover app__flex">
								<a href={work.projectLink} target="_blank" rel="noreferrer">
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.9] }}
										transition={{ duration: 0.25 }}
										className="app__flex">
										<AiFillEye />
									</motion.div>
								</a>
								<a href={work.codeLink} target="_blank" rel="noreferrer">
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.9] }}
										transition={{ duration: 0.25 }}
										className="app__flex">
										<AiFillGithub />
									</motion.div>
								</a>
							</motion.div>
						</div>

						<div className="app__work-content app__flex">
							<h4 className="bold-text">{work.title}</h4>
							<p className="p-text" style={{ marginTop: 10 }}>
								{work.description}
							</p>
							<div className="app__work-tag app__flex">
								<p className="p-text">{work.tags[0]}</p>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
			{/* {drag && (
				<div className="arrowCarousel">
					<svg
						width="47"
						height="47"
						viewBox="0 0 47 47"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<circle cx="23.5" cy="23.5" r="23.5" fill="white" />
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M16.5272 7.52069C17.2301 6.82644 18.3698 6.82644 19.0727 7.52069L33.4728 21.743C34.1757 22.4373 34.1757 23.5628 33.4728 24.257L19.0727 38.4793C18.3698 39.1736 17.2301 39.1736 16.5272 38.4793C15.8243 37.785 15.8243 36.6596 16.5272 35.9653L29.6544 23L16.5272 10.0349C15.8243 9.3406 15.8243 8.21495 16.5272 7.52069Z"
							fill="#313BAC"
						/>
					</svg>
				</div>
			)} */}
		</>
	);
};

export default AppWrap(MotionWrap(Work, "app__works"), "work", "app__whitebg");
