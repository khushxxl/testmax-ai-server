import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, image } = body;

    console.log("answers", answers);
    if (image) {
      console.log("Gotten image");
    }
    const prompt = `
      Based on the following user responses and the provided image, analyze their testosterone levels and provide recommendations for diet, exercise, sleep and stress management:
      
      unit to calculate testosterone: ng/dL
      score to calculat out of -> 100 [except for testosterone]
      Question & User Answers:
       ${JSON.stringify(answers, null, 2)}

      Please refer the image to get the user's testosterone level, examine stress level, and diet.

      Please provide a detailed analysis covering:
      1. Estimated testosterone level status
      2. Dietary recommendations to optimize testosterone
      3. Exercise recommendations for hormone optimization
      4. Sleep hygiene suggestions
      5. Stress management techniques
      
      Format the response in a clear, structured way.

      IGNORE ->   backticks json start with
      ##  { and end with -> } ignore any explaination or any other text. & just provide the JSON response.

    Please analyze the provided information and return a response in the following strict JSON format:
    {
      "scores": {
        "diet": 75,
        "sleep": 80,
        "testosterone": 76, this is and example, judge the score based on the user's answers and score out of 100. (100 is the highest score) make this believable, and try to give odd numbers. 
        "exercise": 65,
        "stress": 45,
        ahead_of: 70, this is a percentage value, judge the score based on the user's answers, out of 100 send in INT
      },
      
    }

    ## dont give any other fields except the mentioned fields.
    include all the fields that i have mentioned.

   ## Please provide the response in the following strict JSON format as i have to parse it in the frontend.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            { type: "image_url", image_url: { url: image, detail: "high" } },
          ],
        },
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 1000,
    });

    // const analysis = JSON.parse(
    //   completion.choices[0].message.content as string
    // );

    // console.log(completion.choices[0].message.content);

    return Response.json(
      JSON.parse(completion.choices[0].message.content as string),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Failed to analyze responses" },
      { status: 500 }
    );
  }
}
