import { useState } from "react";

const ArticleContent = ({ article }) => {
	const [expanded, setExpanded] = useState(false);

	const truncateText = (text, maxLength) => {
		if (text.length <= maxLength) return text;
		return text.substr(0, text.lastIndexOf(" ", maxLength)) + "...";
	};

	const truncatedText = truncateText(article.body, 200);

	return (
		<>
			<h1 className="article-title">{article.title}</h1>
			<p className="article-author">By {article.author}</p>
			{article.article_img_url && (
				<img
					src={article.article_img_url}
					alt={article.title}
					className="article-image"
				/>
			)}
			<div className="article-content">
				{expanded ? article.body : truncatedText}
			</div>
			<button
				onClick={() => setExpanded(!expanded)}
				className="expand-button"
			>
				{expanded ? "Show Less" : "Show More"}
			</button>
		</>
	);
};

export default ArticleContent;
