export async function getText(
  kw: string,
  age: string,
  continueStory?: Array<{ role: string; content: string }>
) {
  const messages = [];

  if (continueStory) {
    messages.push(...continueStory);
  }
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SRV}/generate/${kw}/${age}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "",
        messages,
      }),
    }
  );
}

// image generation
export async function generateImage(strToGenerate: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SRV}/generateImage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: `${process.env.NEXT_PUBLIC_BACKEND_SRV}`,
    },
    body: JSON.stringify({
      prompt: strToGenerate,
      n: 1,
      size: "256x256",
    }),
  });
}
