import { useEffect, useState } from "react";

const DarkModeToggle = () => {
	const [darkMode, setDarkMode] = useState(true);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	return (
		<button
			onClick={toggleDarkMode}
			className={`dark-mode-toggle ${
				darkMode ? "dark-mode" : "light-mode"
			}`}
		>
			<div
				className={`toggle-switch ${
					darkMode ? "switch-dark" : "switch-light"
				}`}
			/>
			<span className="sr-only">Toggle Dark Mode</span>
		</button>
	);
};

export default DarkModeToggle;
