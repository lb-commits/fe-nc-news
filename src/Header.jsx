import logo from "./Assets/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import BurgerMenuButton from "./BurgerMenuButton";
import { Link } from "react-router-dom";
import TopicsAndSort from "./TopicsAndSort";

const Header = () => {
	return (
		<>
			<header className="header">
				<Link to="/" className="logo-link">
					<img src={logo} alt="Logo" className="logo" />
					<span className="site-title">Saiddit</span>
				</Link>
				<div className="actions-container">
					<DarkModeToggle />
					<BurgerMenuButton />
				</div>
			</header>
			<TopicsAndSort />
		</>
	);
};

export default Header;
