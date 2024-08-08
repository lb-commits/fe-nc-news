import { useState, useEffect, useRef } from "react";
import { deleteComment } from "./Utils/api-calls";
import ThreeDotsIcon from "./ThreeDotsIcon";

const TransformButton = ({ commentId, onDelete }) => {
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const buttonRef = useRef(null);

	const handleClick = async () => {
		if (isDeleteMode) {
			try {
				await deleteComment(commentId);
				onDelete(commentId);
			} catch (error) {
				console.error("Error deleting comment:", error);
			}
		} else {
			setIsDeleteMode(true);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target)
			) {
				setIsDeleteMode(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		let timer;
		if (isDeleteMode) {
			timer = setTimeout(() => {
				setIsDeleteMode(false);
			}, 3000);
		}
		return () => clearTimeout(timer);
	}, [isDeleteMode]);

	return (
		<div className="dropdown">
			<button
				ref={buttonRef}
				className={`transform-button ${
					isDeleteMode ? "delete-mode" : ""
				}`}
				onClick={handleClick}
			>
				{isDeleteMode ? "Delete" : <ThreeDotsIcon />}
			</button>
		</div>
	);
};

export default TransformButton;
