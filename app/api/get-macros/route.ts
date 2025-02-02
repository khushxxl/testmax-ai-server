import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: "No image provided",
        },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this food image and provide the macronutrient information (calories, protein, carbs, fat). Return only the numbers in a JSON format. start with { and end with } avoid backticks i need pure json 
              
              EXAMPLE RESPONSE : 
              {
                "calories": 350, (calories)
                "protein": 25, (protein)
                "carbs": 35, (carbs)
                "fat": 12, (fat)
                "test_boost": 54  (test_boost) -> score out of 100
              }

              if the image is not of food the response should be:
              {
                error: "Image not found, please try again",
               }

              
              `,
            },
            { type: "image_url", image_url: { url: image, detail: "high" } },
          ],
        },
      ],
      max_tokens: 2000,
    });

    console.log(response.choices[0].message.content);
    // Here you would integrate with a nutrition API or ML model
    // This is a mock response - replace with actual API integration

    return NextResponse.json({
      success: true,
      macros: response.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}
