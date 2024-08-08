import React from "react";
import TransformButton from "./TransformButton";

const Comments = ({ comments, setComments }) => {
	const handleDeleteComment = (commentId) => {
		setComments((prevComments) =>
			prevComments.filter((comment) => comment.comment_id !== commentId)
		);
	};

	return (
		<div className="comments-container">
			<h2 className="comments-title">Comments</h2>
			{comments.length === 0 ? (
				<p className="no-comments">No comments yet.</p>
			) : (
				<ul className="comments-list">
					{comments.map((comment) => (
						<li key={comment.comment_id} className="comment-item">
							<div className="comment-header">
								<div>
									<p className="comment-author">
										{comment.author}
									</p>
									<p className="comment-date">
										{new Date(
											comment.created_at
										).toLocaleString()}
									</p>
								</div>
								<TransformButton
									commentId={comment.comment_id}
									onDelete={handleDeleteComment}
								/>
							</div>
							<p className="comment-body">{comment.body}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Comments;
