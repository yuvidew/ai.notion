import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import React, { useRef, useState } from 'react'
import TextareaAutosize from "react-textarea-autosize"
import { Button } from '@/components/ui/button';
import { ImageIcon, Smile, X } from 'lucide-react';
import IconPicker from '@/components/IconPicker';
import useCoverImage from '@/hooks/useCoverImage';

interface ToolbarProps {
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
    },
    preview?: boolean
}

export const ToolBar = ({ initialData, preview }: ToolbarProps) => {

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialData.title);

    const update = useMutation(api.file.update);
    const removeIcon = useMutation(api.file.removeIcon);

    const coverImage = useCoverImage()

    const enableInput = () => {
        if (preview) return;

        setIsEditing(true);
        setTimeout(() => {
            setValue(initialData.title)
            inputRef.current?.focus()
        }, 0)
    }

    const disableInput = () => setIsEditing(false)

    const onInput = (value: string) => {
        setValue(value)
        update({
            id: initialData._id,
            title: value || "Untitled"
        });
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            disableInput();
        }
    };

    const onIconSelect = (icon: string) => {
        update({
            id: initialData._id,
            icon
        })
    }

    const onRemoveIcon = () => {
        removeIcon({
            id: initialData._id,
        })
    }

    return (
        <div
            className=" pl-[54px] group relative"
        >
            {!!initialData.icon && !preview && (
                <div className=" flex items-center gap-x-2 group/icon pt-6" >
                    <IconPicker onChange={onIconSelect}>
                        <p className=" text-6xl hover:opacity-75 transition">
                            {initialData.icon}
                        </p>
                    </IconPicker>
                    <Button
                        onClick={onRemoveIcon}
                        className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-sm"
                        variant="outline"
                        size="icon"
                    >
                        <X className=" h-4 w-4" />
                    </Button>
                </div>
            )}

            {!!initialData.icon && preview && (
                <p className=" text-6xl pt-6">
                    {initialData.icon}
                </p>
            )}

            <div className=" opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
                {!initialData.icon && !preview && (
                    <IconPicker asChild onChange={onIconSelect} >
                        <Button
                            className=" text-muted-foreground text-xs"
                            variant="outline"
                            size="sm"
                        >
                            <Smile className=" h-4 w-4 mr-2" />
                            Add icon
                        </Button>
                    </IconPicker>
                )}

                {!initialData.coverImage && !preview && (
                    <Button
                        onClick = {coverImage.onOpen}
                        className="text-muted-foreground text-xs"
                        variant="outline"
                        size="sm"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Add cover
                    </Button>
                )}
            </div>

            {isEditing && !preview ? (
                <TextareaAutosize
                    ref={inputRef}
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className=" text-5xl bg-transparent resize-none font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className=" pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3f3f3f] dark:text-[#cfcfcf]"
                >
                    {initialData.title}
                </div>
            )}
        </div>
    )
}
