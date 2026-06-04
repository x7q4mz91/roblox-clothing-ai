<<<<<<< HEAD
# roblox-clothing-ai
AI-powered Roblox clothing generator that creates shirt and hoodie textures from text prompts.
=======
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

## Setup

1. Install Wrangler if you want to develop locally:

```bash
npm install -g @cloudflare/wrangler
```

2. Set your OpenAI API key in Cloudflare Pages environment variables:

- `OPENAI_API_KEY`

3. Deploy to Cloudflare Pages or run locally:

```bash
wrangler pages dev ./public --port 8787
```

Then open `http://127.0.0.1:8787`.

## Notes

- The function expects a valid OpenAI Images API key.
- The prompt is converted into an image request sized at `585x559`.
- If you want to deploy this to GitHub and connect to Cloudflare, push this folder to your repository and configure Pages to use it.
>>>>>>> 5ddecc6 (Add Cloudflare Pages Roblox clothing AI site)
