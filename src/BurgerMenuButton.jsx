import { useState, useEffect } from "react";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { getTopics } from "./Utils/api-calls";

function BurgerMenuButton() {
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		getTopics().then(setTopics);
	}, []);

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
			<DropdownMenuContent className="dropdown-content">
				{topics.map((topic) => (
					<DropdownMenuItem
						key={topic.slug}
						className="dropdown-item"
					>
						{topic.description}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default BurgerMenuButton;
