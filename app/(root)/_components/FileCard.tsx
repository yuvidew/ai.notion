import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Action } from "@/components/Action";
import { MoreHorizontal } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

interface cardProps {
    id: Id<"documents">;
    title: string;
    imageUrl: string;
    authorName: string;
    authorId: string;
    orgId: string;
    createdAt: number;
    isPinned: boolean;
    type : string;
}

export const FileCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    orgId,
    createdAt,
    isPinned,
    type,
}: cardProps) => {
    const { userId } = useAuth();

    const authorLabel = userId == authorId ? "You" : authorName;
    const createAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    });
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const onSaveMutation = useMutation(api.file.favorites);
    const onUnSaveMutation = useMutation(api.file.unFavorites)

    const toggleFavorite = async () => {
        try {
            
            if (isPinned) {
                await onUnSaveMutation({id , orgId})
                toast.success("Unpinned successfully")
            }else{
                await onSaveMutation({id , orgId})
                toast.success("Pinned successfully");
            }

        } catch{
            toast.error("Something went wrong");
        } finally{
            setIsProcessing(false)
        }
    };

    return (
        <Link href={`/board/${id}`}>
            <div className=" group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-amber-50 dark:bg-stone-700">
                    <Image src={imageUrl} alt={title} fill className=" object-fit" />
                    <div className=" opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black" />
                    <Action id={id} title={title} type = {type} side="right">
                        <button className=" absolute z-50 top-1 right-1">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
                        </button>
                    </Action>
                </div>
                <Footer
                    isPinned={isPinned}
                    title={title}
                    authorLabel={authorLabel}
                    createdAtLabel={createAtLabel}
                    disabled={isProcessing}
                    onClick={toggleFavorite}
                />
            </div>
        </Link>
    );
};

FileCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className=" group aspect-[100/127] border rounded-lg  overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    );
};
