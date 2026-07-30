import { GoogleGenAI } from "@google/genai";
import { Property } from "@/src/types";

export const getSmartPropertyRecommendations = async (
  userPrompt: string,
  properties: Property[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const propertiesContext = properties
    .map(
      (p) =>
        `${p.title} in ${p.location}, ${p.city}. Price: ${p.priceDisplay}, ${p.bhk} BHK, ${p.area} ${p.areaUnit}. Status: ${p.statuses.join(", ")}`
    )
    .join("\n");

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `You are PropScroll AI, a helpful real estate assistant for India.
      Based on the user's request: "${userPrompt}", evaluate these properties and suggest the top 3 best matches.
      Explain why each is a good fit. Use a professional yet helpful tone.

      Properties:
      ${propertiesContext}`,
    config: { temperature: 0.7, maxOutputTokens: 1000 },
  });

  return (
    response.text ||
    "I couldn't find a specific match, but let's keep scrolling through the PropScroll feed!"
  );
};
