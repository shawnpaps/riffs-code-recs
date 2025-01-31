import type { APIRoute } from "astro";

// Utility function to parse `application/x-www-form-urlencoded`
const parseFormData = async (request: Request) => {
    const text = await request.text();
    return Object.fromEntries(new URLSearchParams(text));
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const token = import.meta.env.BEEHIIV_TOKEN;
        const beehiivID = import.meta.env.BEEHIIV_V2_ID;

        if (!token || !beehiivID) {
            throw new Error("Beehiiv API credentials are missing.");
        }

        // Parse form data
        const formData = await parseFormData(request);
        const email = formData.email;

        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email is required." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Forward data to Beehiiv API
        const url = `https://api.beehiiv.com/v2/publications/${beehiivID}/subscriptions`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: email,
                send_welcome_email: true,
            }),
        });

        if (!response.ok) {
            throw new Error(`Beehiiv API responded with ${response.status}: ${response.statusText}`);

        }

        const data = await response.json();

        return new Response(null, {
            status: 307,
            headers: { Location: '/subscription-success' }, // Redirect user on success
        });


    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Something went wrong", details: error instanceof Error ? error.message : String(error) }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};