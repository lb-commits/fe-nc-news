import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import MainFeed from "./MainFeed";
import ArticlePage from "./ArticlePage";
import BurgerMenuButton from "./BurgerMenuButton";

const App = () => {
	return (
		<Router>
			<div className="main-container">
				<Header>
					<BurgerMenuButton />
				</Header>
				<Routes>
					<Route path="/" element={<MainFeed />} />
					<Route
						path="/articles/:articleId"
						element={<ArticlePage />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
