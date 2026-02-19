import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
	try {
		const token = import.meta.env.BEEHIIV_TOKEN;
		const beehiivID = import.meta.env.BEEHIIV_V2_ID;

		if (!token || !beehiivID) {
			throw new Error("Beehiiv credentials not configured");
		}

		// Fetch publication stats from Beehiiv - get first page to check total count
		const url = `https://api.beehiiv.com/v2/publications/${beehiivID}/subscriptions?status=active&limit=1`;
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(
				`Beehiiv API responded with ${response.status}: ${response.statusText}`,
			);
		}

		const data = await response.json();

		// Beehiiv API returns total count in the pagination metadata
		const subscriberCount =
			data.total_results || data.total || data.data?.length || 0;

		console.log(`Fetched subscriber count: ${subscriberCount}`);

		return new Response(
			JSON.stringify({
				count: subscriberCount,
				formatted: formatSubscriberCount(subscriberCount),
				lastUpdated: new Date().toISOString(),
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "public, max-age=1800", // Cache for 30 minutes
				},
			},
		);
	} catch (error) {
		console.error("Error fetching subscriber count:", error);

		// Return a fallback response instead of failing
		return new Response(
			JSON.stringify({
				count: 0,
				formatted: "100+",
				lastUpdated: new Date().toISOString(),
				error: error instanceof Error ? error.message : String(error),
			}),
			{
				status: 200, // Return 200 with error info so UI can still render
				headers: { "Content-Type": "application/json" },
			},
		);
	}
};

// Format subscriber count for display (e.g., 1234 -> "1.2K")
function formatSubscriberCount(count: number): string {
	if (count >= 1000000) {
		return `${(count / 1000000).toFixed(1)}M`;
	} else if (count >= 10000) {
		return `${(count / 1000).toFixed(0)}K`;
	} else if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}K`;
	} else if (count >= 100) {
		return `${count}`;
	} else {
		return `${count}+`;
	}
}
