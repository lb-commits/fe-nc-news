import axios from "axios";

const api = axios.create({
	baseURL: "https://be-bc-news.onrender.com/api",
});

export function getArticles(
	topic = "",
	sort_by = "created_at",
	order = "desc"
) {
	const route = "/articles";
	const params = { sort_by, order };
	if (topic) params.topic = topic;
	return api.get(route, { params }).then((response) => response.data);
}

export function getArticleById(article_id) {
	const route = `/articles/${article_id}`;
	return api.get(route).then((response) => response.data.article);
}

export function getCommentsByArticleId(article_id) {
	const route = `/articles/${article_id}/comments`;
	return api.get(route).then((response) => response.data.comments);
}

export function updateArticleVotes(article_id, inc_votes) {
	const route = `/articles/${article_id}`;
	return api
		.patch(route, { inc_votes })
		.then((response) => response.data.article);
}

export function postComment(article_id, commentData) {
	const route = `/articles/${article_id}/comments`;
	return api
		.post(route, commentData)
		.then((response) => response.data.comment);
}

export function deleteComment(comment_id) {
	const route = `/comments/${comment_id}`;
	return api.delete(route).then((response) => response.data);
}

export function getTopics() {
	const route = "/topics";
	return api.get(route).then((response) => response.data.topics);
}
