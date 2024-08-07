const Comments = ({ comments }) => {
	return (
		<div className="comments-container">
			<h2 className="comments-title">Comments</h2>
			{comments.length === 0 ? (
				<p className="no-comments">No comments yet.</p>
			) : (
				<ul className="comments-list">
					{comments.map((comment) => (
						<li key={comment.comment_id} className="comment-item">
							<p className="comment-author">{comment.author}</p>
							<p className="comment-date">
								{new Date(comment.created_at).toLocaleString()}
							</p>
							<p className="comment-body">{comment.body}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Comments;
