"use client"
import React, { ReactNode, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Frame } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";

interface CreateNewFileProps {
    children : ReactNode,
    orgId : string
} 

export const CreateNewFile = (
    {
        children,
        orgId
    }:CreateNewFileProps
) => {
    const router = useRouter();
    const { mutate } = useApiMutation(api.file.create);
    const [isLoading, setIsLoading] = useState("");
    const onCreate = async (type: string) => {
        if (!orgId) return;

        setIsLoading(type);

        try {
            const id = await mutate({
                orgId,
                type,
            });

            toast.success("File created");
            router.push(`/${type}/${id}`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create file");
        } finally {
            setIsLoading("");
        }
    };
    return (
        <Dialog>
                <DialogTrigger asChild >
                    {children}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader className="flex flex-col">
                        <DialogTitle className="font-medium text-lg">
                            Chose your file type
                        </DialogTitle>
                        <DialogDescription className=" text-muted-foreground text-sm mb-2" >
                        Start by creating a file for your team
                        </DialogDescription>
                        <div className="flex items-center gap-2">
                            <Button
                                variant={"default"}
                                size={"lg"}
                                className="flex items-center w-[50%] cursor-pointer"
                                onClick={() => onCreate("document")}  
                            >
                                {isLoading !== "document" ? (
                                    <>
                                        <BookOpen />
                                        Document
                                    </>
                                ) : (
                                    <Spinner  />
                                )}
                            </Button>
                            <Button
                                variant={"default"}
                                size={"lg"}
                                className="flex items-center w-[50%] cursor-pointer"
                                onClick={() => onCreate("project")} 
                            >
                                {isLoading !== "project" ? (
                                    <>
                                        <Frame />
                                        Project
                                    </>
                                ) : (
                                    <Spinner  />
                                )}
                            </Button>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    )
}
