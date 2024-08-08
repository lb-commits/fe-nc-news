import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../components/ui/dropdown-menu";

function SortBy({ disabled = false }) {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const sortOptions = [
		{ value: "created_at", label: "Date" },
		{ value: "votes", label: "Votes" },
		{ value: "comment_count", label: "Comments" },
		{ value: "title", label: "Title" },
	];

	const currentSortBy = searchParams.get("sort_by") || "created_at";
	const currentOrder = searchParams.get("order") || "desc";

	const handleSort = (sortBy) => {
		if (disabled) return;
		const currentTopic = searchParams.get("topic") || "";
		const newParams = new URLSearchParams(searchParams);
		newParams.set("sort_by", sortBy);
		if (currentTopic) newParams.set("topic", currentTopic);
		navigate(`/?${newParams.toString()}`);
	};

	const toggleOrder = () => {
		if (disabled) return;
		const newOrder = currentOrder === "asc" ? "desc" : "asc";
		const newParams = new URLSearchParams(searchParams);
		newParams.set("order", newOrder);
		navigate(`/?${newParams.toString()}`);
	};

	return (
		<div className={`sort-by-container ${disabled ? "disabled" : ""}`}>
			<DropdownMenu>
				<DropdownMenuTrigger
					className="sort-by-button"
					disabled={disabled}
				>
					Sort:{" "}
					{sortOptions.find(
						(option) => option.value === currentSortBy
					)?.label || "Date"}
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					{sortOptions.map((option) => (
						<DropdownMenuItem
							key={option.value}
							className={`sort-option ${
								currentSortBy === option.value ? "active" : ""
							}`}
							onClick={() => handleSort(option.value)}
							disabled={disabled}
						>
							{option.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<button
				onClick={toggleOrder}
				className="order-toggle-button"
				disabled={disabled}
			>
				{currentOrder === "asc" ? "▲" : "▼"}
			</button>
		</div>
	);
}

export default SortBy;
