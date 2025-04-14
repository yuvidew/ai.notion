"use client";

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUser } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Markdown from 'react-markdown';

interface ChatMsgProps {

    role: string,
    content: string | null,
}

export const ChatMsg = ({ role, content }: ChatMsgProps) => {
    const { user } = useUser();
    return (
        <div className={`flex "justify-start gap-1.5 justify-between" mb-4 `}>
            <div className={cn(`w-6 h-6 rounded-full ml-2 flex items-center justify-center`, role === "assistant" ? "bg-stone-500" : "bg-transparent")}>
                {role == "user" ?
                    <Avatar className=" w-6 h-6 rounded-full">
                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    :
                    <Avatar className=" w-6 h-6 rounded-full">
                        <AvatarFallback className="rounded-lg">
                        <Sparkles className="h-4 w-4" />
                        </AvatarFallback>
                    </Avatar>
                }
            </div>
            <div
                className={cn(
                    'w-[90%] p-3 rounded-lg text-sm',
                    role === 'assistant'
                        ? 'bg-stone-700 text-white'
                        : 'bg-stone-300 text-black'
                )}
            >

                <Markdown
                    components={{
                        pre: ({ ...props }) => (
                            <div className='overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg'>
                                <pre {...props} />
                            </div>
                        ),
                        code: ({ ...props }) => (
                            <code className='bg-black/10 p-2 rounded-lg' {...props} />
                        ),
                    }}

                >
                    {content}
                </Markdown>
            </div>
        </div>
    )
}
