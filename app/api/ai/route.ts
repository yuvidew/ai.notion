import { NextRequest, NextResponse } from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
    throw new Error("Google Generative AI API key is missing. Check .env.local file.");
}

const google = createGoogleGenerativeAI({
    apiKey: apiKey,
});

export async function POST(req:NextRequest) {
    try {

        const {prompt} = await req.json();
        console.log(prompt)
        if(!prompt){
            return NextResponse.json({error : "Prompt is required"}, { status: 400 });
        }

        const response = await generateText({
            model : google("gemini-1.5-pro-latest" ),
            prompt : prompt,
        })

        return NextResponse.json({ result: response.text });
        
    } catch (error) {
        console.error("AI API Error:", error);
        return NextResponse.json({ error: "Failed to generate text" }, { status: 500 });
    }
}
