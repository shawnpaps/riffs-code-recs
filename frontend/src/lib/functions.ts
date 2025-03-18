import { baseURL } from './contentful.js';

export const fetchAllFromTable = async (tableName: string) => {
	try {
		const url = `${baseURL}/api/${tableName}`;
		const response = await fetch(url, {});

		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching songs:', error);
		return null; // Return null or handle error gracefully
	}
};

export const fetchAllBlogPosts = async () => {
	try {
		const url = `${baseURL}/api/posts`;
		console.log(url);
		const response = await fetch(url, {});
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching songs:', error);
		return null; // Return null or handle error gracefully
	}
};

export const subscribeUser = async (email: string) => {
	try {
		const url = `${baseURL}/api/subscribe`;
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
			}),
		});
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Subscribe user:', error);
		return null;
	}
};
