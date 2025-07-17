import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
	try {
		const token = import.meta.env.CONTENTFUL_TOKEN;
		const spaceID = import.meta.env.CONTENTFUL_SPACE_ID;

		if (!token || !spaceID) {
			throw new Error(
				'Contentful credentials are not defined in the environment variables.'
			);
		}

		const url = `https://cdn.contentful.com/spaces/${spaceID}/environments/master/entries?access_token=${token}&content_type=songs`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(
				`Contentful API responded with ${response.status}: ${response.statusText}`
			);
		}

		const data = await response.json();

		return new Response(JSON.stringify(data.items), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				error: 'Something went wrong',
				details: error instanceof Error ? error.message : String(error),
			}),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};
