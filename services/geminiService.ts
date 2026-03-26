const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function analyzeUserVibe(bio: string): Promise<string> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a cool futuristic cyberpunk vibe in one short line for this bio: "${bio}"`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Neon Digital Soul ⚡"
    );
  } catch (err) {
    console.error(err);
    return "Cyber Mystic with glowing aura ✨";
  }
}