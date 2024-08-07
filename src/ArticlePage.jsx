import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "./Utils/api-calls";
import ArticleContent from "./ArticleContent";
import ArticleButtons from "./ArticleButtons";
import Comments from "./CommentsComponent";

const ArticlePage = () => {
	const { articleId } = useParams();
	const [article, setArticle] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showComments, setShowComments] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const articleData = await getArticleById(articleId);
				setArticle(articleData);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching article:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [articleId]);

	const handleShowComments = async () => {
		if (!showComments && comments.length === 0) {
			try {
				const commentsData = await getCommentsByArticleId(articleId);
				setComments(commentsData);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
		}
		setShowComments(!showComments);
	};

	if (loading) return <div className="text-center mt-8">Loading...</div>;

	return (
		<div className="article-container">
			<ArticleContent article={article} />
			<ArticleButtons
				onToggleComments={handleShowComments}
				showComments={showComments}
			/>
			{showComments && <Comments comments={comments} />}
		</div>
	);
};

export default ArticlePage;