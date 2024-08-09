import { useLocation } from "react-router-dom";
import logo from "./Assets/logo.png";
import DarkModeToggle from "./DarkModeToggle";
import BurgerMenuButton from "./BurgerMenuButton";
import SortBy from "./SortBy";
import { Link } from "react-router-dom";

const Header = () => {
	const location = useLocation();
	const isMainPage = location.pathname === "/";

	return (
		<header className="header">
			<Link to="/" className="logo-link">
				<img src={logo} alt="Logo" className="logo" />
				<span className="site-title">Saiddit</span>
			</Link>
			<div className="actions-container">
				<SortBy disabled={!isMainPage} />
				<DarkModeToggle />
				<BurgerMenuButton />
			</div>
		</header>
	);
};

export default Header;
