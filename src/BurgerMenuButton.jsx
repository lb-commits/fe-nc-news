import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { getTopics } from "./Utils/api-calls";

function BurgerMenuButton() {
	const [topics, setTopics] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		getTopics().then(setTopics);
	}, []);

	const handleTopicSelect = (topicSlug) => {
		if (topicSlug) {
			navigate(`/?topic=${topicSlug}`);
		} else {
			navigate("/");
		}
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="burger-button">
				<svg
					className="burger-icon"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
				>
					<path d="M3 12h18M3 6h18M3 18h18" />
				</svg>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					key="all"
					className="dropdown-item"
					onClick={() => handleTopicSelect("")}
				>
					All Topics
				</DropdownMenuItem>
				{topics.map((topic) => (
					<DropdownMenuItem
						key={topic.slug}
						className="dropdown-item"
						onClick={() => handleTopicSelect(topic.slug)}
					>
						{capitalizeFirstLetter(topic.slug)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default BurgerMenuButton;
