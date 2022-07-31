import React, { useState } from "react";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { useTranslation } from "react-i18next";
import "./Footer.scss";
import { BsGithub, BsLinkedin, BsTelegram, BsEnvelopeFill } from "react-icons/bs";

const Footer = () => {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const { name, email, message } = formData;

	const handleChangeInput = (e) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = () => {
		setLoading(true);

		const contact = {
			_type: "contact",
			name: name,
			email: email,
			message: message,
		};

		client.create(contact).then(() => {
			setLoading(false);
			setIsFormSubmitted(true);
		});
	};

	return (
		<>
			<h2 className="head-text">{t("footer-h2")}</h2>
			<div className="app__footer-cards">
				<div className="app__footer-card">
					<a href="https://t.me/azhitenev" target="_blank" rel="noreferrer" className="p-text">
						<BsTelegram />
						Telegram
					</a>
				</div>
				<div className="app__footer-card">
					<a href="https://github.com/twiar" target="_blank" rel="noreferrer" className="p-text">
						<BsGithub />
						Github
					</a>
				</div>
				<div className="app__footer-card">
					<a
						href="https://www.linkedin.com/in/andrey-zhitenev-2494a517b/"
						target="_blank"
						rel="noreferrer"
						className="p-text">
						<BsLinkedin />
						LinkedIn
					</a>
				</div>
				<div className="app__footer-card">
					<a href="mailto:zhitenev.andr@gmail.com" className="p-text">
						<BsEnvelopeFill />
						E-mail
					</a>
				</div>
			</div>

			<h3 className="sub-text">{t("send-message")}</h3>
			{!isFormSubmitted ? (
				<div className="app__footer-form app__flex">
					<div className="app__flex">
						<input
							className="p-text"
							type="text"
							placeholder={t("your-name")}
							name="name"
							value={name}
							onChange={handleChangeInput}
						/>
					</div>
					<div className="app__flex">
						<input
							className="p-text"
							type="email"
							placeholder={t("your-email")}
							name="email"
							value={email}
							onChange={handleChangeInput}
						/>
					</div>
					<div>
						<textarea
							className="p-text"
							placeholder={t("your-message")}
							value={message}
							name="message"
							onChange={handleChangeInput}
						/>
					</div>
					<button type="button" className="p-text" onClick={handleSubmit}>
						{loading ? t("sending") : t("send-message-btn")}
					</button>
				</div>
			) : (
				<div>
					<h3 className="head-text">{t("thanks")}</h3>
				</div>
			)}
		</>
	);
};

export default AppWrap(MotionWrap(Footer, "app__footer"), "contact", "app__whitebg");
