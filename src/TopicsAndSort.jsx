import { useState, useEffect } from "react";
import { getTopics } from "./Utils/api-calls";

function TopicsAndSort() {
	const [topics, setTopics] = useState([]);

	useEffect(() => {
		getTopics().then(setTopics);
	}, []);

	return (
		<div className="header">
			Topics And Sort
			{/* {topics.map((topic) => (
				<div key={topic.id}>{topic.description}</div>
			))} */}
		</div>
	);
}

export default TopicsAndSort;
