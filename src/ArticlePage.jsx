import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getCommentsByArticleId } from "./Utils/api-calls";
import ArticleContent from "./ArticleContent";
import Comments from "./CommentsComponent";
import CommentForm from "./CommentForm";

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

	const handleAddComment = (newComment) => {
		setComments((prevComments) => [newComment, ...prevComments]);
		if (!showComments) {
			setShowComments(true);
		}
	};

	if (loading) return <div className="loading-indicator">Loading...</div>;

	return (
		<div className="article-page-container">
			<ArticleContent article={article} />
			<button
				onClick={handleShowComments}
				className="show-comments-button"
			>
				{showComments ? "Hide Comments" : "Show Comments"}
			</button>
			{showComments && (
				<>
					{/* <CommentForm
						articleId={articleId}
						onCommentAdded={handleAddComment}
					/> */}
					<Comments comments={comments} setComments={setComments} />
				</>
			)}
		</div>
	);
};

export default ArticlePage;
