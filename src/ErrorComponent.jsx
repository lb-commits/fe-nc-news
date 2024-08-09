import { useNavigate } from "react-router-dom";

const ErrorComponent = ({ message }) => {
	const navigate = useNavigate();

	return (
		<div className="error-page">
			<div className="error-container">
				<h2 className="error-title">Oops! Something went wrong.</h2>
				<p className="error-message">{message}</p>
				<button className="error-button" onClick={() => navigate("/")}>
					Return to Home
				</button>
			</div>
		</div>
	);
};

export default ErrorComponent;
