const CardComponent = ({ article }) => {
	return (
		<div className="card">
			<h2 className="card-title">{article.title}</h2>
			<p className="card-author">{article.author}</p>
			<p className="card-body">{article.body}</p>
		</div>
	);
};

export default CardComponent;
