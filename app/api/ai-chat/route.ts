import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body;
    console.log("messages", messages);

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "assistant",
          content: `YOU ARE A CHATBOT THAT ANSWERS QUESTIONS ABOUT 
           THE USER'S HEALTH SPECIFICALLY ABOUT THE USER'S TESTOSTERONE LEVEL. 
           IF THE USER ASKS ANYTHING ELSE, YOU SHOULD IGNORE IT AND ONLY ANSWER QUESTIONS
           ABOUT THE USER'S TESTOSTERONE LEVEL. YOU CAN GIVE THEM HEALTH ADVICE IF THEY ASK FOR IT.
            YOU CAN ADVICE THEM ON HOW TO IMPROVE THEIR TESTOSTERONE LEVEL. 
            YOU CAN GIVE MEDICAL ADVICES BUT DONT CLAIM TO BE A DOCTOR OR A MEDICAL PROFESSIONAL. 
            IF YOU FEEL USER IS ASKING SERIOUS QUESTIONS,  THEN ADVISE THEM TO SEE A DOCTOR.

            YOU CAN ANS ABOUT FOOD HABITS, EXERCISE, SLEEP, STRESS, AND OTHER HEALTH RELATED QUESTIONS.
            YOU CAN ANSWER QUESTIONS ABOUT THE USER'S TESTOSTERONE LEVEL.
            YOU CAN ANS ABOUT IMPROVING ONE'S OWN SELF
            HERE IS THE USER'S ANSWERS: ${messages}
            `,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000,
    });

    return Response.json(
      {
        message: completion.choices[0].message.content,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
