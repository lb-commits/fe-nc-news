import React, { useState } from "react";
import { postComment } from "./Utils/api-calls";

const CommentForm = ({ articleId, onCommentAdded }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [comment, setComment] = useState("");

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};

	const handlePostComment = async () => {
		if (!comment.trim()) return;

		const exampleUser = "grumpy19";
		const commentData = {
			username: exampleUser,
			body: comment,
		};

		try {
			const newComment = await postComment(articleId, commentData);
			if (onCommentAdded && typeof onCommentAdded === "function") {
				onCommentAdded(newComment);
			}
			setComment("");
			setIsExpanded(false);
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	return (
		<div className="comment-form-container mt-4">
			{!isExpanded ? (
				<button
					onClick={() => setIsExpanded(true)}
					className="add-comment-button"
				>
					+ Add a Comment
				</button>
			) : (
				<>
					<textarea
						id="comment-form"
						value={comment}
						onChange={handleCommentChange}
						placeholder="Write a comment..."
						className="comment-input"
					/>
					<button
						onClick={handlePostComment}
						className="comment-submit-button"
					>
						Post Comment
					</button>
				</>
			)}
		</div>
	);
};

export default CommentForm;
