import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "./Utils/api-calls";
import ArticleContent from "./ArticleContent";
import Comments from "./CommentsComponent";
import ErrorComponent from "./ErrorComponent";

const ArticlePage = () => {
	const { articleId } = useParams();
	const [article, setArticle] = useState(null);
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showComments, setShowComments] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const articleData = await getArticleById(articleId);
				setArticle(articleData);
			} catch (error) {
				console.error("Error fetching article:", error);
				if (error.message === "The requested resource was not found.") {
					setError(
						"Article not found. Please check the article ID and try again."
					);
				} else {
					setError(
						"An error occurred while fetching the article. Please try again later."
					);
				}
			} finally {
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
				// Optionally, you can set an error state for comments here
			}
		}
		setShowComments(!showComments);
	};

	const handleAddComment = (newComment) => {
		setComments((prevComments) => [newComment, ...prevComments]);
		if (!showComments) {
			setShowComments(true);
		}
	};

	if (loading) return <div className="loading-indicator">Loading...</div>;
	if (error) return <ErrorComponent message={error} />;

	return (
		<div className="article-page-container">
			<ArticleContent
				article={article}
				onCommentAdded={handleAddComment}
			/>
			<button
				onClick={handleShowComments}
				className="show-comments-button"
			>
				{showComments ? "Hide Comments" : "Show Comments"}
			</button>
			{showComments && (
				<>
					<Comments comments={comments} setComments={setComments} />
				</>
			)}
		</div>
	);
};

export default ArticlePage;
