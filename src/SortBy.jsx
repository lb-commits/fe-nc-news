import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function SortBy() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const sortOptions = [
		{ value: "created_at", label: "Date" },
		{ value: "votes", label: "Votes" },
		{ value: "comment_count", label: "Comments" },
		{ value: "title", label: "Title" },
	];

	const handleSort = (sortBy, order) => {
		const currentTopic = searchParams.get("topic") || "";
		const newParams = new URLSearchParams(searchParams);
		newParams.set("sort_by", sortBy);
		newParams.set("order", order);
		if (currentTopic) newParams.set("topic", currentTopic);
		navigate(`/?${newParams.toString()}`);
		setIsOpen(false);
	};

	return (
		<div className="sort-by-container">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="sort-by-button"
			>
				Sort By ▼
			</button>
			{isOpen && (
				<div className="sort-by-dropdown">
					{sortOptions.map((option) => (
						<div key={option.value} className="sort-option">
							<span>{option.label}</span>
							<div>
								<button
									onClick={() =>
										handleSort(option.value, "asc")
									}
								>
									▲
								</button>
								<button
									onClick={() =>
										handleSort(option.value, "desc")
									}
								>
									▼
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default SortBy;
