import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "./Utils/api-calls";
import CardComponent from "./CardComponent";

const MainFeed = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const topic = searchParams.get("topic") || "";
				const data = await getArticles(topic);
				setArticles(data.articles);
			} catch (err) {
				console.error(
					"An error occurred while fetching articles:",
					err
				);
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, [searchParams]);

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
