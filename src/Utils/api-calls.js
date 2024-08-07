import axios from "axios";

const api = axios.create({
	baseURL: "https://be-bc-news.onrender.com/api",
});

export function getArticles() {
	const route = "/articles";
	return api.get(route).then((response) => response.data);
}
