export async function getText(
  kw: string,
  age: string,
  continueStory?: Array<{ role: string; content: string }>
) {
  const instructions = `
    Conte o começo de uma história para uma criança entre ${age.replace(
      "_",
      " e "
    )} anos sobre a palavra "${kw}" em no máximo 200 palavras. Em seguida, ofereça 3 opções para continuar a história, cada uma com no máximo cinco palavras, precedidas de um algarismo numérico. Aguarde o usuário escolher uma opção e continue contando o meio da história. Caso a palavra escolhida não gere uma história, responda apenas "erro".
  `;

  const messages = [
    {
      role: "system",
      content: instructions.trim(),
    },
    { role: "user", content: kw },
  ];

  if (continueStory) {
    messages.push(...continueStory);
  }
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SRV}/generate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "",
      messages,
    }),
  });
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
