// Fetch technologies from Contentful
export const fetchTechnologies = async () => {
	try {
		// Use absolute URL for server-side compatibility
		const baseURL = import.meta.env.SITE || 'http://localhost:4321';
		const response = await fetch(`${baseURL}/api/technologies`);
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching technologies:', error);
		return [];
	}
};

// Fetch songs from Contentful
export const fetchSongs = async () => {
	try {
		// Use absolute URL for server-side compatibility
		const baseURL = import.meta.env.SITE || 'http://localhost:4321';
		const response = await fetch(`${baseURL}/api/songs`);
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching songs:', error);
		return [];
	}
};

// Fetch blog posts from Beehiiv
export const fetchAllBlogPosts = async () => {
	try {
		// Use absolute URL for server-side compatibility
		const baseURL = import.meta.env.SITE || 'http://localhost:4321';
		const response = await fetch(`${baseURL}/api/posts`);
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
};

// Subscribe user to newsletter
export const subscribeUser = async (email: string) => {
	try {
		// Use absolute URL for server-side compatibility
		const baseURL = import.meta.env.SITE || 'http://localhost:4321';
		const response = await fetch(`${baseURL}/api/subscribe`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
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
		// Use absolute URL for server-side compatibility
		const baseURL = import.meta.env.SITE || 'http://localhost:4321';
		const response = await fetch(
			`${baseURL}/api/verify?email=${encodeURIComponent(email)}`
		);
		if (!response.ok) {
			throw new Error(`API request failed with status ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Verify user:', error);
		return null;
	}
};
