import axios from "axios";

const api = axios.create({
	baseURL: "https://be-bc-news.onrender.com/api",
});

const handleApiError = (error) => {
	if (error.response) {
		throw new Error(
			error.response.data.msg || "An error occurred while fetching data"
		);
	} else if (error.request) {
		throw new Error(
			"No response received from server. Please try again later."
		);
	} else {
		throw new Error("An error occurred while setting up the request");
	}
};

export function getArticles(
	topic = "",
	sort_by = "created_at",
	order = "desc"
) {
	const route = "/articles";
	const params = { sort_by, order };
	if (topic) params.topic = topic;
	return api
		.get(route, { params })
		.then((response) => response.data)
		.catch(handleApiError);
}

export function getArticleById(article_id) {
	const route = `/articles/${article_id}`;
	return api
		.get(route)
		.then((response) => response.data.article)
		.catch((error) => {
			if (error.response && error.response.status === 404) {
				throw new Error("Article not found");
			}
			throw error;
		});
}

export function getCommentsByArticleId(article_id) {
	const route = `/articles/${article_id}/comments`;
	return api
		.get(route)
		.then((response) => response.data.comments)
		.catch(handleApiError);
}

export function updateArticleVotes(article_id, inc_votes) {
	const route = `/articles/${article_id}`;
	return api
		.patch(route, { inc_votes })
		.then((response) => response.data.article)
		.catch(handleApiError);
}

export function postComment(article_id, commentData) {
	const route = `/articles/${article_id}/comments`;
	return api
		.post(route, commentData)
		.then((response) => response.data.comment)
		.catch(handleApiError);
}

export function deleteComment(comment_id) {
	const route = `/comments/${comment_id}`;
	return api
		.delete(route)
		.then((response) => response.data)
		.catch(handleApiError);
}

export function getTopics() {
	const route = "/topics";
	return api
		.get(route)
		.then((response) => response.data.topics)
		.catch(handleApiError);
}
