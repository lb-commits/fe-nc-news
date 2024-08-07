import { useEffect, useState } from "react";
import { getArticles } from "./Utils/api-calls";
import CardComponent from "./CardComponent";

const MainFeed = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const data = await getArticles();
				setArticles(data.articles);
			} catch (err) {
				setError(
					err.message || "An error occurred while fetching articles"
				);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
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
