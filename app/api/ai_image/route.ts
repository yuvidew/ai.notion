import {NextRequest , NextResponse} from "next/server";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if(!apiKey) {
    throw new Error("Missing Google Generative AI API Key")
}

const google = createGoogleGenerativeAI({
    apiKey
})

export async function POST(req: NextRequest) {
    try {
        const {prompt} = await req.json();

        if(!prompt){
            return NextResponse.json({error: "Prompt is required"}, {status: 400})
        }

        const response = await generateText({
            model : google('gemini-2.0-flash-exp'),
            providerOptions : {
                google : {responseModalities: ['TEXT', 'IMAGE'] },
            },
            prompt: `${prompt}`,
        })

        return NextResponse.json({result : response.files} , { status: 201 });
    } catch (error) {
        console.error("AI API Error:", error);

        return NextResponse.json({ error: "Failed to generate text" }, { status: 500 });
    }
}
