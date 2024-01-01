import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const chatCompletion = async (prompt: string) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0];
  } catch (err) {
    console.error("Failed api call to openai", err);
  }
};
