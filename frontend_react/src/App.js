import React from "react";
import "./index.css";

import { Footer, Header, Skills, Work } from "./container";
import { Navbar, SocialMedia } from "./components";

import { FullPageContainer, FullPagePanel } from "fullpage-react-fs";

import "fullpage-react-fs/dist/index.css";
import "./App.scss";

const App = () => {
	if (document.querySelector("._ytvCK")) {
		if (
			document.querySelector("._ytvCK").offsetTop <
			document.querySelector(".app__header").offsetHeight
		) {
			document.querySelector("._ytvCK").style.top = 0;
		}
	}

	return (
		<div className="app">
			<SocialMedia />

			<Navbar />
			<FullPageContainer showIndicators={true}>
				<FullPagePanel>
					<Header />
				</FullPagePanel>
				<FullPagePanel>
					<Work />
				</FullPagePanel>
				<FullPagePanel>
					<Skills />
				</FullPagePanel>
				<FullPagePanel>
					<Footer />
				</FullPagePanel>
			</FullPageContainer>
		</div>
	);
};

export default App;
