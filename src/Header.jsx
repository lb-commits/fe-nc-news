import logo from "./Assets/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import BurgerMenuButton from "./BurgerMenuButton";

const Header = () => {
	return (
		<header className="header">
			<div className="logo-container">
				<img src={logo} alt="Logo" className="logo" />
				<span className="Saiddit">Saiddit</span>
			</div>
			<div className="logo-container">
				<DarkModeToggle />
				<BurgerMenuButton />
			</div>
		</header>
	);
};

export default Header;
