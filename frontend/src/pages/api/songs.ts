import type { APIRoute } from "astro";
import {
    baseURL,
    strapiUrl
} from "../../lib/utils.ts";

export const GET: APIRoute = async ({ request }) => {
    try {

        const token = import.meta.env.STRAPI_TOKEN;
        if (!token) {
            throw new Error("STRAPI_TOKEN is not defined in the environment variables.");
        }

        const url = `${strapiUrl}/api/songs`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Strapi API responded with ${response.status}: ${response.statusText}`);
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

