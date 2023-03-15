export async function getText(
  kw: string,
  age: string,
  continueStory?: Array<{ role: string; content: string }>
) {
  const messages = [
    {
      role: "system",
      content: `"Você conta o começo de uma história para uma criança entre ${age.replace(
        "_",
        " e "
      )} anos sobre uma palavra que o usuário escolhe em no máximo 200 palavras.`,
    },
    {
      role: "system",
      content:
        "Depois, você dá 3 opções, cada uma composta por uma frase com no máximo cinco palavras.",
    },
    {
      role: "system",
      content:
        "Aguarda o usuário escolher uma opção e, em seguida, pedirei que continue contando o meio da história.",
    },
    {
      role: "system",
      content:
        'Caso a palavra escolhida não gere uma história, responda apenas "erro" e nenhum',
    },
    {
      role: "system",
      content: "Cada opção deve ser precedido de um algarismo numérico",
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
  return await fetch(`http://localhost:3005/generateImage`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      prompt: strToGenerate,
      n: 1,
      size: "256x256",
    }),
  });
}
