import type { APIRoute } from "astro";


export const GET: APIRoute = async ({ request }) => {
    try {

        const token = import.meta.env.BEEHIIV_TOKEN;
        const beehiivID = import.meta.env.BEEHIIV_V2_ID;
        if (!token) {
            throw new Error("STRAPI_TOKEN is not defined in the environment variables.");
        }

        const url = `https://api.beehiiv.com/v2/publications/${beehiivID}/posts?order_by=publish_date&direction=desc&limit=5&status=confirmed`;
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

        return new Response(JSON.stringify(data.data), {
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

