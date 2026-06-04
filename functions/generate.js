export async function onRequestPost({ request, I env }) {
  try {
    const body = await request.json();
    const prompt = body.prompt?.toString().trim();

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const openaiKey = env.OPENAI_API_KEY || env.OPENAI_KEY || env.OPENAI_API_KEY_SECRET || env.OPENAI;
    if (!openaiKey) {
      return new Response(JSON.stringify({
        error: 'OpenAI API key not configured. Ensure OPENAI_API_KEY is added as a Secret in Cloudflare Pages production environment variables and redeploy.'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const imagePrompt = `Create a Roblox classic shirt template design at 585x559 pixels for the prompt: ${prompt}. Output a clean PNG suitable for Roblox upload. Use the Roblox classic shirt template style and present the design as a finished shirt texture.`;

    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt: imagePrompt,
        size: '585x559',
        response_format: 'b64_json',
        n: 1,
      }),
    });

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text();
      return new Response(JSON.stringify({ error: errorText || 'OpenAI request failed.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await openaiResponse.json();
    const imageBase64 = result.data?.[0]?.b64_json;
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: 'No image returned from OpenAI.' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ image: imageBase64 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Unexpected error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
