import type { APIRoute } from 'astro';
import {
	contentfulAccessToken,
	contentfulSpaceID,
	contentfulURL,
} from '../../lib/contentful.js';

export const GET: APIRoute = async ({ request }) => {
	try {
		const token = contentfulAccessToken;
		console.log(token);
		if (!token) {
			throw new Error(
				'Contentful Token is not defined in the environment variables.'
			);
		}

		const url = `${contentfulURL}/spaces/${contentfulSpaceID}/environments/master/entries?access_token=${token}&content_type=technologies`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
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
