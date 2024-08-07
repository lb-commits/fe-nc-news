import axios from "axios";

const api = axios.create({
	baseURL: "https://be-bc-news.onrender.com/api",
});

export function getArticles() {
	const route = "/articles";
	return api.get(route).then((response) => response.data);
}

export function getArticleById(article_id) {
	const route = `/articles/${article_id}`;
	return api.get(route).then((response) => response.data.article);
}

export function getCommentsByArticleId(article_id) {
	const route = `/articles/${article_id}/comments`;
	return api.get(route).then((response) => response.data.comments);
}
