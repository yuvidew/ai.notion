"use client";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import useCoverImage from "@/hooks/useCoverImage";
import { Button } from "../ui/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Sparkles } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import axios from "axios";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import Spinner from "../Spinner";

const apiKey = "AIzaSyB4p0uqcvltps4KLKUh7nkJwsIZ-Xhdg9c";

if (!apiKey) {
    throw new Error("Missing Google Generative AI API Key")
}

const google = createGoogleGenerativeAI({
    apiKey
})

interface DefaultGeneratedFile {
    base64Data: string;
    mimeType: string;
    uint8ArrayData?: Uint8Array;
    base64?: string;
    uint8Array?: Uint8Array;
  }

export const CoverImageModels = () => {
    const params = useParams();
    const update = useMutation(api.file.update);
    const coverImg = useCoverImage();
    const [switchToGenAi, setSwitchToGenAi] = useState(false);
    const generateUploadUrl = useMutation(api.file.generateUploadUrl);
    const getImageUrl = useMutation(api.file.getImageUrl);
    const [url, setUrl] = useState("");
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const postUrl = await generateUploadUrl();
            const result = await axios.post(postUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });

            const { storageId } = await result.data;
            const pdfUrl = await getImageUrl({ storageId: storageId });

            setUrl(pdfUrl || "");
        } catch {
            toast.error("Uploading error");
        }
    };

    const onUpload = async () => {
        if (url) {
            try {
                await update({
                    id: params.id as Id<"documents">,
                    coverImage: url,
                });
                toast.success("Image is successfully uploaded!");
                coverImg.onClose();
            } catch {
                toast.error("Failed to upload image.");
            }
        }
    };

    const onGenerateImage = async () => {
        if (!prompt) {
            toast.error("Please enter a prompt");
            return;
        }
        setIsGenerating(true);
        try {
            const response = await generateText({
                model: google('gemini-2.0-flash-exp'),
                providerOptions: {
                    google: { responseModalities: ['TEXT', 'IMAGE'] },
                },
                prompt: `${prompt}`,
            })

            const result = response.files as DefaultGeneratedFile[];



            // Convert base64 to File object
            const byteCharacters = atob(result[0].base64Data);
            const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: result[0].mimeType });
            const file = new File([blob], "image.png", { type: result[0].mimeType });

            const postUrl = await generateUploadUrl();

            const res = await axios.post(postUrl, file, {
                headers: {
                    "Content-Type": file.type,
                },
            });

            const { storageId } = await res.data;
            const pdfUrl = await getImageUrl({ storageId: storageId });


            await update({
                id: params.id as Id<"documents">,
                coverImage: pdfUrl || "",
            })

            toast.success("Image is successfully uploaded!");
            coverImg.onClose();

        } catch {
            toast.error("Failed to upload image.");
        } finally {
            setIsGenerating(false);
            setPrompt("");
        }
    }


    return (
        <Dialog open={coverImg.isOpen} onOpenChange={coverImg.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className=" text-left text-lg font-semibold">
                        Cover Image
                    </DialogTitle>
                    <DialogDescription className="text-sm mb-3">
                        Upload and generate cover image
                    </DialogDescription>
                    {switchToGenAi ? (
                        <div className="flex flex-col gap-2">
                            <Textarea
                                className=" resize-none h-22"
                                onChange={(e) => setPrompt(e.target.value)}
                                value={prompt}
                            />
                            <Button variant={"default"} disabled={isGenerating == true} onClick={onGenerateImage}>
                                {isGenerating ? (
                                    <Spinner />
                                ) : (<>
                                    <Sparkles className="w-5 h-4 ml-5" />
                                    Generate
                                </>)}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 mt-2">
                                <Input id="picture" type="file" onChange={onChange} />
                                <Button
                                    variant={"default"}
                                    disabled={url.length == 0}
                                    onClick={onUpload}
                                >
                                    Submit
                                </Button>
                            </div>
                            <p className="text-[.7rem]">
                                Generate image with help to{" "}
                                <Badge
                                    className=" cursor-pointer"
                                    onClick={() => setSwitchToGenAi(true)}
                                >
                                    Notion Ai
                                </Badge>
                            </p>
                        </div>
                    )}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
