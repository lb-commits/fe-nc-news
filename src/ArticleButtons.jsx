const ArticleButtons = ({ onToggleComments, showComments }) => {
	return (
		<div className="article-buttons">
			<button
				onClick={onToggleComments}
				className="comments-toggle-button"
			>
				{showComments ? "Hide Comments" : "Show Comments"}
			</button>
		</div>
	);
};

export default ArticleButtons;
