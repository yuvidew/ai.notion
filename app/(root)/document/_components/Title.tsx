"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import React, { useState } from 'react'

interface TitleProps {
    initialData: {
        title: string,
        _id: Id<"documents">,
        orgId: string;
        authorId: string;
        authorName: string;
        isPublished: boolean;
        document?: string;
        coverImage?: string;
        icon?: string;
        isPined: boolean;
    }
}

export const Title = ({ initialData }: TitleProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const update = useMutation(api.file.update);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialData.title);

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
        }, 0)
    }

    const disableInput = () => {
        setIsEditing(false)
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        update({
            id: initialData._id,
            title: e.target.value || "Untitled",
        })
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            disableInput();
        }
    }

    return (
        <div className=" flex items-center ju gap-x-1 w-[50%]" >
            {!!initialData.icon && <p>{initialData.icon}</p>}

            {isEditing ? (
                <Input
                    ref={inputRef}
                    onClick={enableInput}
                    onBlur={disableInput}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={title}
                    className='h-7 px-2 focus-visible:ring-transparent'
                />
            ) : (
                <Button
                    onClick={enableInput}
                    variant={"ghost"}
                    size={"sm"}
                    className='font-normal h-auto py-1 px2'
                >
                    {initialData.title}
                </Button>
            )}
        </div>
    )
}

Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton 
            className={"h-8 w-16 rounded-md"}
        />
    )
}
