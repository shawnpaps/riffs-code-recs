export { renderers } from '../../renderers.mjs';

const prerender = false;
const parseFormData = async (request) => {
  const text = await request.text();
  return Object.fromEntries(new URLSearchParams(text));
};
const POST = async ({ request }) => {
  try {
    const token = "IVkjutmO53Ir5D1oAJlQ0t8AvZQWQRLkmaaxqDPWTfyU67yc3Wobn6OGixynWVUc";
    const beehiivID = "pub_77425650-db9c-4a61-bc68-d5873180b5a9";
    if (!token || !beehiivID) ;
    const formData = await parseFormData(request);
    const email = formData.email;
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = `https://api.beehiiv.com/v2/publications/${beehiivID}/subscriptions`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        email,
        send_welcome_email: true
      })
    });
    if (!response.ok) {
      throw new Error(
        `Beehiiv API responded with ${response.status}: ${response.statusText}`
      );
    }
    const data = await response.json();
    return new Response(null, {
      status: 307,
      headers: { Location: "/subscription-success" }
      // Redirect user on success
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Something went wrong",
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
