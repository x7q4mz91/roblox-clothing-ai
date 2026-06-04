# Roblox Clothing AI

A Cloudflare Pages website that lets users generate Roblox shirt template PNGs from text prompts.

## Features

- Web form to ask for a Roblox shirt design (example: "Make me a cool hoodie")
- Cloudflare Pages Function that calls OpenAI Images API
- Returns a **585 × 559 PNG** styled as a Roblox classic shirt template
- Ready for Roblox upload

## Files

- `public/index.html` — UI form and preview
- `public/style.css` — styling for the front-end
- `public/script.js` — client-side fetch and image preview
- `functions/generate.js` — Cloudflare Pages Function for OpenAI image generation
- `wrangler.toml` — Cloudflare Pages configuration
- `package.json` — project metadata
- `.gitignore` — ignored files
- `.env.example` — sample local environment file

## Setup

1. Install Wrangler if you want to develop locally:

```bash
npm install -g @cloudflare/wrangler
```

2. Configure your OpenAI API key:

- In Cloudflare Pages: set `OPENAI_API_KEY` in the Pages project environment variables.
- Locally: copy `.env.example` to `.env` and put your key there, or export `OPENAI_API_KEY` in your shell.

3. Run locally:

```bash
wrangler pages dev ./public --port 8787
```

Then open `http://127.0.0.1:8787`.

## Notes

- The function requires `OPENAI_API_KEY` to be set.
- If you see the error `OpenAI API key not configured.`, the key is missing from Cloudflare Pages or your local environment.
- The prompt is converted into an image request sized at `585x559`.
- To deploy to GitHub and Cloudflare, push this folder to your repository and configure Pages to use it.
