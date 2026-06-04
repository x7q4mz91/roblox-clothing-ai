const form = document.getElementById('prompt-form');
const promptInput = document.getElementById('prompt');
const statusEl = document.getElementById('status');
const resultImage = document.getElementById('result-image');
const downloadButton = document.getElementById('download-button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const prompt = promptInput.value.trim();
  if (!prompt) return;

  statusEl.textContent = 'Generating your Roblox shirt design…';
  downloadButton.disabled = true;
  resultImage.src = '';

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to generate image');
    }

    const data = await response.json();
    const imageUrl = `data:image/png;base64,${data.image}`;
    resultImage.src = imageUrl;
    resultImage.alt = `Roblox shirt design for: ${prompt}`;
    statusEl.textContent = 'Generated! Download your Roblox shirt PNG below.';
    downloadButton.disabled = false;
    downloadButton.onclick = () => {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'roblox-shirt-template.png';
      link.click();
    };
  } catch (error) {
    console.error(error);
    statusEl.textContent = `Error: ${error.message}`;
  }
});
