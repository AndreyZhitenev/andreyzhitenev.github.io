import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";

import { images } from "../../constants";
import "./Navbar.scss";
import SocialMedia from "../SocialMedia";

const languages = [
	{
		code: "en",
		name: "EN",
		country_code: "en",
	},
	{
		code: "ru",
		name: "RU",
		country_code: "ru",
	},
];

const Navbar = () => {
	const { t } = useTranslation();
	const [toggle, setToggle] = useState(false);
	const currentLanguageCode = cookies.get("i18next") || "en";
	const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

	React.useEffect(() => {
		document.title = t("app_title");
	}, [currentLanguage, t]);

	return (
		<nav className="app__navbar">
			<div className="app__navbar-logo">
				<a href="#home">
					<img src={images.logo} alt="logo" />
				</a>
			</div>

			<div className="language-select">
				<ul>
					{languages.map(({ code, name, country_code }) => {
						return (
							<a
								href="#"
								className={currentLanguageCode == country_code ? "active" : ""}
								onClick={() => {
									i18next.changeLanguage(code);
								}}
								key={country_code}>
								<li>
									<span
										className={`flag-icon flag-icon-${country_code} mx-2`}
										style={{
											opacity: currentLanguageCode === code ? 0.5 : 1,
										}}></span>
									{name}
								</li>
							</a>
						);
					})}
				</ul>
			</div>

			<ul className="app__navbar-links">
				{["home", "work", "skills", "contact"].map((item) => (
					<li className="app__flex p-text" key={`link-${item}`}>
						<div />
						<a href={`#${item}`}>{t(item)}</a>
					</li>
				))}
			</ul>

			<div className="app__navbar-menu">
				<HiMenuAlt4 onClick={() => setToggle(true)} className="openSvg" />

				<div className={toggle ? "app__navbar-menu-popup open" : "app__navbar-menu-popup"}>
					<HiX onClick={() => setToggle(false)} />
					<div className="language-select">
						<ul>
							{languages.map(({ code, name, country_code }) => {
								return (
									<a
										href="#"
										className={currentLanguageCode == country_code ? "active" : ""}
										onClick={() => {
											i18next.changeLanguage(code);
										}}
										key={country_code}>
										<li>
											<span
												className={`flag-icon flag-icon-${country_code} mx-2`}
												style={{
													opacity: currentLanguageCode === code ? 0.5 : 1,
												}}></span>
											{name}
										</li>
									</a>
								);
							})}
						</ul>
					</div>
					<ul>
						{["home", "work", "skills", "contact"].map((item) => (
							<li key={item}>
								<a href={`#${item}`} onClick={() => setToggle(false)}>
									{t(item)}
								</a>
							</li>
						))}
					</ul>
					<SocialMedia />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
