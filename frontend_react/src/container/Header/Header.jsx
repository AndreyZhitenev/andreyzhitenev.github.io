import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { AppWrap } from "../../wrapper";
import { images } from "../../constants";
import "./Header.scss";

const scaleVariants = {
	whileInView: {
		scale: [0, 1],
		opacity: [0, 1],
		transition: {
			duration: 1,
			ease: "easeInOut",
		},
	},
};

const Header = () => {
	const { t } = useTranslation();
	return (
		<div className="app__header app__flex">
			<motion.div
				whileInView={{ x: [-100, 0], opacity: [0, 1] }}
				transition={{ duration: 0.5 }}
				className="app__header-info">
				<div className="app__header-badge">
					<div className="badge-cmp app__flex">
						<span>👋</span>
						<div style={{ marginLeft: 20 }}>
							<p className="p-text">{t("hello")}</p>
							<h1 className="head-text">{t("name")}</h1>
						</div>
					</div>

					<div className="tag-cmp app_flex">
						<p className="p-text">{t("frontdev")}</p>
						<p className="p-text">{t("designer")}</p>
					</div>
				</div>
			</motion.div>

			<motion.div
				whileInView={{ opacity: [0, 1] }}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className="app__header-img">
				<motion.img
					whileInView={{ y: [100, 0], opacity: [0, 1] }}
					transition={{ duration: 1, ease: "easeInOut" }}
					src={images.profile}
					alt="profile_bg"
				/>
				<img src={images.circle} alt="profile_circle" className="overlay_circle" />
			</motion.div>

			<motion.div
				variant={scaleVariants}
				whileInView={scaleVariants.whileInView}
				className="app__header-circles">
				{[images.typescript, images.react, images.vue, images.figma].map((circle, index) => (
					<div className="circle-cmp app__flex" key={`circle-${index}`}>
						<img src={circle} alt="circle" />
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default AppWrap(Header, "home");
