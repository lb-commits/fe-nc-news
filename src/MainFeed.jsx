import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles, getTopics } from "./Utils/api-calls";
import CardComponent from "./CardComponent";
import ErrorComponent from "./ErrorComponent";

const MainFeed = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchParams] = useSearchParams();

	const validQueryParams = ["topic", "sort_by", "order"];
	const validSortByOptions = [
		"created_at",
		"votes",
		"comment_count",
		"title",
	];
	const validOrderOptions = ["asc", "desc"];

	useEffect(() => {
		const fetchArticles = async () => {
			setLoading(true);
			setError(null);

			const invalidKeys = Array.from(searchParams.keys()).filter(
				(key) => !validQueryParams.includes(key)
			);
			if (invalidKeys.length > 0) {
				setError({
					message: `Invalid query parameter(s): ${invalidKeys.join(
						", "
					)}`,
				});
				setLoading(false);
				return;
			}

			const topic = searchParams.get("topic") || "";
			const sort_by = searchParams.get("sort_by") || "created_at";
			const order = searchParams.get("order") || "desc";

			if (
				searchParams.has("sort_by") &&
				!validSortByOptions.includes(sort_by)
			) {
				setError({
					message:
						"Invalid sort_by parameter. Please use a valid option.",
				});
				setLoading(false);
				return;
			}

			if (
				searchParams.has("order") &&
				!validOrderOptions.includes(order)
			) {
				setError({
					message:
						"Invalid order parameter. Please use 'asc' or 'desc'.",
				});
				setLoading(false);
				return;
			}

			if (topic) {
				try {
					const topicsData = await getTopics();
					const validTopics = topicsData.map((t) => t.slug);
					if (!validTopics.includes(topic)) {
						setError({
							message: "Invalid topic. Please use a valid topic.",
						});
						setLoading(false);
						return;
					}
				} catch (err) {
					console.error("Error fetching topics:", err);
					setError({
						message:
							"An error occurred while validating the topic.",
					});
					setLoading(false);
					return;
				}
			}

			try {
				const data = await getArticles(topic, sort_by, order);
				if (data.articles && data.articles.length === 0) {
					setError({
						message: "No articles found for the given query.",
					});
				} else {
					setArticles(data.articles || []);
				}
			} catch (err) {
				if (err.response && err.response.status === 404) {
					setError({
						message: "The requested resource was not found.",
					});
				} else {
					setError({
						message:
							"An error occurred while fetching articles. Please try again.",
					});
				}
			} finally {
				setLoading(false);
			}
		};

		fetchArticles();
	}, [searchParams]);

	if (loading) return <div className="loading-indicator">Loading...</div>;

	return (
		<div className="main-feed">
			{error ? (
				<ErrorComponent message={error.message} />
			) : (
				articles.map((article) => (
					<CardComponent key={article.article_id} article={article} />
				))
			)}
		</div>
	);
};

export default MainFeed;
