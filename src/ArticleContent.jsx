import { useState } from "react";
import VoteButtons from "./VoteButtons";
import CommentForm from "./CommentForm";

const ArticleContent = ({ article }) => {
	const [expanded, setExpanded] = useState(false);

	const truncateText = (text, maxLength) => {
		if (text.length <= maxLength) return text;
		return text.substr(0, text.lastIndexOf(" ", maxLength)) + "...";
	};

	const truncatedText = truncateText(article.body, 350);
	const isTextTruncated = article.body.length > 350;

	return (
		<div className="article-content">
			<h1 className="article-title">{article.title}</h1>
			<p className="article-author">By {article.author}</p>
			{article.article_img_url && (
				<img
					src={article.article_img_url}
					alt={article.title}
					className="article-image"
				/>
			)}
			<VoteButtons
				articleId={article.article_id}
				initialVotes={article.votes}
			/>
			<CommentForm articleId={article.article_id} />
			<div className="article-body">
				{expanded ? article.body : truncatedText}
			</div>
			{isTextTruncated && (
				<button
					onClick={() => setExpanded(!expanded)}
					className="expand-button"
				>
					{expanded ? "Show Less" : "Show More"}
				</button>
			)}
		</div>
	);
};

export default ArticleContent;
