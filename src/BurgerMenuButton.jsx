const BurgerMenuButton = () => {
	return (
		<button className="burger-button">
			<svg
				className="burger-icon"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	);
};

export default BurgerMenuButton;
