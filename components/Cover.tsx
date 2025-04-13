"use client"

import useCoverImage from '@/hooks/useCoverImage';
import React from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CoverProps {
    url : string | undefined,
    preview? : boolean,
    id : Id<"documents">
}

export const Cover = ({url , preview , id} : CoverProps) => {
    const coverImage = useCoverImage()
    const removeCoverImage = useMutation(api.file.removeCoverImage)

    const onRemove = async () => {
        removeCoverImage({
            id
        })
    }
    return (
        <div className={cn(
            " relative w-full h-[45vh] group",
            !url && "h-[12vh]",
            url && "bg-muted"
        )}>
            {!!url && (
                <Image 
                    src={url} 
                    fill 
                    alt="cover Image" 
                    className=" object-cover" 
                />
            )}
            {url && !preview && (
                <div className=" opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
                    <Button
                        onClick = {() => coverImage.onReplace(url)}
                        className = " text-muted-foreground text-xs"
                        variant = "outline"
                        size = "sm"
                    >
                        <ImageIcon 
                            className=" h-4 w-4 mr-2" 
                        />
                        Change Cover
                    </Button>
                    <Button
                        onClick = {onRemove}
                        className = " text-muted-foreground text-xs"
                        variant = "outline"
                        size = "sm"
                    >
                        <X 
                            className=" h-4 w-4 mr-2" 
                        />
                        Remove
                    </Button>
                </div>
            )}
        </div>
    )
}

Cover.Skeleton = function CoverSkeleton(){
    return (
        <Skeleton className={"w-full h-[12vh]"}/>
    )
}
