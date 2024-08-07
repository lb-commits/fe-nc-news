import { useState } from "react";
import { updateArticleVotes } from "./Utils/api-calls";

const VoteButtons = ({ articleId, initialVotes }) => {
	const [voteCount, setVoteCount] = useState(initialVotes);
	const [userVote, setUserVote] = useState(0);
	const [error, setError] = useState(null);

	const handleVote = async (voteChange) => {
		if (userVote === voteChange) return;

		setVoteCount((prevCount) => prevCount + voteChange);
		setUserVote(voteChange);
		setError(null);

		try {
			const updatedArticle = await updateArticleVotes(
				articleId,
				voteChange
			);
			if (updatedArticle.votes !== voteCount + voteChange) {
				setVoteCount(updatedArticle.votes);
			}
		} catch (error) {
			setVoteCount((prevCount) => prevCount - voteChange);
			setUserVote(0);
			setError("Failed to update vote. Please try again.");
			console.error("Error updating votes:", error);
		}
	};

	return (
		<div className="vote-buttons">
			<button
				onClick={() => handleVote(1)}
				className={`vote-button vote-up ${
					userVote === 1 ? "voted" : ""
				}`}
				aria-label="Upvote"
			>
				▲
			</button>
			<span className="votes-count">{voteCount}</span>
			<button
				onClick={() => handleVote(-1)}
				className={`vote-button vote-down ${
					userVote === -1 ? "voted" : ""
				}`}
				aria-label="Downvote"
			>
				▼
			</button>
			{error && <p className="vote-error">{error}</p>}
		</div>
	);
};

export default VoteButtons;
