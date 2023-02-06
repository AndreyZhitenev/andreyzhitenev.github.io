import React from "react";
import { BsBehance, BsGithub, BsLinkedin, BsTelegram } from "react-icons/bs";

const SocialMedia = () => {
	return (
		<div className="app__social">
			<div>
				<a href="https://t.me/kraavc" target="_blank" rel="noreferrer">
					<BsTelegram />
				</a>
			</div>
			<div>
				<a href="https://github.com/twiar" target="_blank" rel="noreferrer">
					<BsGithub />
				</a>
			</div>
			<div>
				<a
					href="https://www.linkedin.com/in/andrey-zhitenev-2494a517b/"
					target="_blank"
					rel="noreferrer">
					<BsLinkedin />
				</a>
			</div>
			<div>
				<a href="https://www.behance.net/zhitenev_andr/" target="_blank" rel="noreferrer">
					<BsBehance />
				</a>
			</div>
		</div>
	);
};

export default SocialMedia;
