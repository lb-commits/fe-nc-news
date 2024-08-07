import Header from "./Header";
import MainFeed from "./MainFeed";
import ArticlePage from "./ArticlePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<div className="main-container">
				<Header />
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
