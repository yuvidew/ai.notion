"use client";

import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

import Spinner from "@/components/Spinner";
import { Hint } from "@/components/Hint";
import { ChatMsg } from "@/components/ChatMsg";

type MessageType = {
    id: string;
    role: string;
    content: string | null;
};

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const apiKey = "AIzaSyB4p0uqcvltps4KLKUh7nkJwsIZ-Xhdg9c"; // or use process.env.NEXT_PUBLIC_GEMINI_API_KEY

if (!apiKey) {
    throw new Error("Google Generative AI API key is missing.");
}

const google = createGoogleGenerativeAI({
    apiKey,
});

const generate = async (prompt: string) : Promise<{ result: string | null; error: string | null }> => {
    if (!prompt) {
        return { result: "", error: "Prompt is required." };
    }

    try {
        const response = await generateText({
            model: google("gemini-1.5-pro-latest"),
            prompt,
        });

        return { result: response.text, error: "" };
    } catch (err) {
        console.error("Generation error:", err);
        return { result: "", error: "Something went wrong, please try again later." };
    }
}

export const ChatBoat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState<MessageType[]>([]);
    const random = Math.floor(Math.random() * 100) + 1;
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setMessages((prev) => [
            ...prev,
            { id: random.toString(), role: "user", content: prompt },
        ]);

        setLoading(true);

        const {result , error} = await generate(prompt);

        setMessages((prev) => [
            ...prev,
            { 
                id: random.toString() + "assistant", 
                role: "assistant", 
                content: result ? result : error, 
            },
        ]);

        setLoading(false);

        setPrompt("");

    };
    return (
        <>
            {isOpen && (
                <Card className="fixed bottom-15 right-3 overflow-hidden w-[350px] h-[500px] bg-[#1f1f1f] p-0 shadow-md rounded-lg border border-muted-foreground">
                    <CardHeader className="py-3 px-4 items-center bg-stone-600 grid-cols-2">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-4" />
                            <CardTitle className="text-sm font-medium">Notion Ai</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[80%] overflow-y-auto hide-scrollbar p-2">
                        {messages.map((msg , index) => (
                            <ChatMsg
                                key={msg.id + index}
                                role={msg.role}
                                content={msg.content}
                            />
                        ))}
                    </CardContent>
                    <CardFooter className=" p-2">
                        <div className="w-full flex items-center bg-stone-700 rounded-md">
                            <Input
                                className="border border-none rounded focus-within:border-ring-none focus-within:ring-0 focus-visible:border-none focus-visible:ring-0"
                                placeholder="Ask anything"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                            <Button className="rounded-l-none" disabled={!prompt} onClick={onSubmit}>
                                {loading ? <Spinner /> : <Send className="w-5 h-4" />}
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
            <Hint label="Ai.Notion chat boat">
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed bottom-3 right-3 rounded-full  transition text-muted-foreground text-sm dark:bg-stone-800 bg-stone-200"
                    variant="outline"
                    size="icon"
                >
                    <Sparkles className="w-5 h-4" />
                </Button>
            </Hint>
        </>
    );
};
