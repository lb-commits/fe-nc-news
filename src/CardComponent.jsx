import { Link } from "react-router-dom";

const CardComponent = ({ article }) => {
	return (
		<Link to={`/articles/${article.article_id}`} className="card">
			<h2 className="card-title">{article.title}</h2>
			<p className="card-author">{article.author}</p>
			<p className="card-body">{article.body}</p>
		</Link>
	);
};

export default CardComponent;
