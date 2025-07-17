// Fetch technologies from Contentful
export const fetchTechnologies = async () => {
	try {
		const response = await fetch('/api/technologies');
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching technologies:', error);
		return null;
	}
};

// Fetch songs from Contentful
export const fetchSongs = async () => {
	try {
		const response = await fetch('/api/songs');
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching songs:', error);
		return null;
	}
};

// Fetch blog posts from Beehiiv
export const fetchAllBlogPosts = async () => {
	try {
		const response = await fetch('/api/posts');
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return null;
	}
};

// Subscribe user to newsletter
export const subscribeUser = async (email: string) => {
	try {
		const response = await fetch('/api/subscribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}
		return response;
	} catch (error) {
		console.error('Subscribe user:', error);
		return null;
	}
};

// Verify user subscription
export const verifyUser = async (email: string) => {
	try {
		const response = await fetch(
			`/api/verify?email=${encodeURIComponent(email)}`
		);
		if (!response.ok) {
			throw new Error(
				`API request failed with status ${response.status}: ${response.statusText}`
			);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Verify user:', error);
		return null;
	}
};
