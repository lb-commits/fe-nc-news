import { useEffect, useState } from "react";
import { getArticles } from "./Utils/api-calls";
import CardComponent from "./CardComponent";

const MainFeed = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getArticles()
			.then((data) => {
				setArticles(data.articles);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<div className="main-feed">
			{articles.map((article) => (
				<CardComponent key={article.article_id} article={article} />
			))}
		</div>
	);
};

export default MainFeed;
