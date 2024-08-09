const ErrorComponent = ({ message }) => {
	return (
		<div className="error-container">
			<h2>Oops! Something went wrong.</h2>
			<p>{message}</p>
		</div>
	);
};

export default ErrorComponent;
