import type { APIRoute } from "astro";
import { parseMultipleWeeklyPullRequests, aggregateRecommendations } from "@/lib/postParser";

export const GET: APIRoute = async ({ request }) => {
    try {
        const token = import.meta.env.BEEHIIV_TOKEN;
        const beehiivID = import.meta.env.BEEHIIV_V2_ID;

        if (!token) {
            throw new Error("BEEHIIV_TOKEN is not defined in the environment variables.");
        }

        // Fetch more posts to get all Weekly Pull Request posts
        const url = `https://api.beehiiv.com/v2/publications/${beehiivID}/posts?order_by=publish_date&direction=desc&limit=50&status=confirmed`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Beehiiv API responded with ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const posts = data.data || [];

        // Filter for Weekly Pull Request posts
        const weeklyPosts = posts.filter((post: any) =>
            post.title && post.title.toLowerCase().includes('weekly pull request')
        );

        // Parse all Weekly Pull Request posts
        const parsedPosts = parseMultipleWeeklyPullRequests(weeklyPosts);

        // Aggregate all recommendations
        const aggregated = aggregateRecommendations(parsedPosts);

        return new Response(JSON.stringify({
            posts: parsedPosts,
            aggregated: aggregated,
            total: {
                posts: parsedPosts.length,
                musicRecs: aggregated.music.length,
                techRecs: aggregated.tech.length
            }
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(
            JSON.stringify({
                error: "Something went wrong",
                details: error instanceof Error ? error.message : String(error),
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
