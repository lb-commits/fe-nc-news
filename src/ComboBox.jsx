import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { getTopics } from "./Utils/api-calls";

function cn(...classes) {
	return classes.filter(Boolean).join(" ");
}

function ComboBox({ isOpen, onSelect, onClose }) {
	const [value, setValue] = useState("");
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		getTopics().then(setTopics);
	}, []);

	if (!isOpen) return null;

	return (
		<div className="combo-box-dropdown">
			<ul className="combo-box-list">
				{topics.length === 0 ? (
					<li className="combo-box-empty">No topics found.</li>
				) : (
					topics.map((topic) => (
						<li
							key={topic.slug}
							className={cn(
								"combo-box-item",
								value === topic.slug &&
									"combo-box-item-selected"
							)}
							onClick={() => {
								setValue(topic.slug);
								onSelect(topic.slug);
								onClose();
							}}
						>
							<Check
								className={cn(
									"combo-box-check-icon",
									value === topic.slug
										? "opacity-100"
										: "opacity-0"
								)}
							/>
							{topic.description}
						</li>
					))
				)}
			</ul>
		</div>
	);
}

export default ComboBox;
