import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import cookies from "js-cookie";
import uuid from "node-uuid";

import "./Skills.scss";

const Skills = () => {
	const { t } = useTranslation();
	const [experiencesEn, setExperiencesEn] = useState([]);
	const [experiencesRu, setExperiencesRu] = useState([]);
	const [skills, setSkills] = useState([]);

	useEffect(() => {
		const queryEn = '*[_type == "experiences_en"]';
		const queryRu = '*[_type == "experiences_ru"]';
		const skillsQuery = '*[_type == "skills"]';

		client.fetch(queryEn).then((data) => {
			setExperiencesEn(data);
		});

		client.fetch(queryRu).then((data) => {
			setExperiencesRu(data);
		});

		client.fetch(skillsQuery).then((data) => {
			setSkills(data);
		});
	}, []);

	experiencesEn.sort((a, b) => {
		return b.year.split("-")[0] - a.year.split("-")[0];
	});

	experiencesRu.sort((a, b) => {
		return b.year.split("-")[0] - a.year.split("-")[0];
	});

	return (
		<>
			<h2 className="head-text">{t("skills_exp")}</h2>

			<div className="app__skills-container">
				<motion.div className="app__skills-list">
					{skills.map((skill, i) => (
						<motion.div
							whileInView={{ opacity: [0, 1] }}
							transition={{ duration: 0.5 }}
							className="app__skills-item app__flex"
							key={uuid()}>
							<div className="app__flex" style={{ backgroundColor: skill.bgColor }}>
								<img src={urlFor(skill.icon)} alt={skill.name} />
							</div>
							<p className="p-text">{skill.name}</p>
						</motion.div>
					))}
				</motion.div>
				<div className="app__skills-exp">
					{cookies.get("i18next") == "en" &&
						experiencesEn.map((experienceEn) => (
							<motion.div className="app__skills-exp-item" key={`${experienceEn.year}en`}>
								<div className="app__skills-exp-year">
									<p className="bold-text">{experienceEn.year}</p>
								</div>
								<motion.div className="app__skills-exp-works">
									{experienceEn.works.map((work) => (
										<div key={uuid()}>
											<motion.div
												whileInView={{ opacity: [0, 1] }}
												transition={{ duration: 0.5 }}
												className="app__skills-exp-work"
												data-tip
												data-for={work.name}
												key={uuid()}>
												<h4 className="bold-text">{work.name}</h4>
												<p className="p-text">{work.company}</p>
											</motion.div>
											<ReactTooltip
												id={work.name}
												effect="solid"
												arrowColor="#fff"
												className="skills-tooltip">
												{work.desc}
											</ReactTooltip>
										</div>
									))}
								</motion.div>
							</motion.div>
						))}
					{cookies.get("i18next") == "ru" &&
						experiencesRu.map((experienceRu) => (
							<motion.div className="app__skills-exp-item" key={`${experienceRu.year}ru`}>
								<div className="app__skills-exp-year">
									<p className="bold-text">{experienceRu.year}</p>
								</div>
								<motion.div className="app__skills-exp-works">
									{experienceRu.works.map((work) => (
										<div key={uuid()}>
											<motion.div
												whileInView={{ opacity: [0, 1] }}
												transition={{ duration: 0.5 }}
												className="app__skills-exp-work"
												data-tip
												data-for={work.name}>
												<h4 className="bold-text">{work.name}</h4>
												<p className="p-text">{work.company}</p>
											</motion.div>
											<ReactTooltip
												id={work.name}
												effect="solid"
												arrowColor="#fff"
												className="skills-tooltip">
												{work.desc}
											</ReactTooltip>
										</div>
									))}
								</motion.div>
							</motion.div>
						))}
				</div>
			</div>
		</>
	);
};

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills", "app__primarybg");
