"use client"
import React from 'react'

import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from '@/lib/utils';

interface NewFileBtnProps {
    orgId: string
}

export const NewFileBtn = (
    {
        orgId
    }: NewFileBtnProps
) => {
    const router = useRouter();
    const { mutate } = useApiMutation(api.file.create);
    const onCreate = async () => {
        if (!orgId) return;


        try {
            const id = await mutate({
                orgId,
            });

            toast.success("File created");
            router.push(`/document/${id}`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to create file");
        } 
    };
    return (
        <button
            className={cn(
                "col-span-1 aspect-[100/127] dark:bg-stone-700 bg-stone-200 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-800 flex flex-col items-center justify-center py-6",
            )}
            onClick={onCreate}
        >
            <div />
            <Plus
                className="h-10 w-10 dark:text-white text-stone-700 stroke-1"
            />
            <p className="text-sm dark:text-white text-stone-700 font-light" >New board</p>
        </button>
    )
}
