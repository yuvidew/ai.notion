"use client";

import React from 'react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { Editor } from '@/components/Editor';
import { ToolBar } from '@/app/(root)/document/_components/ToolBar';
import { Skeleton } from '@/components/ui/skeleton';
import { Cover } from '@/components/Cover';
import { useParams } from 'next/navigation';


export const WorkPage = () => {
    const params = useParams()
    const document = useQuery(api.file.getById, { id: params.id as Id<"documents"> });

    const update = useMutation(api.file.update);

    const onChange = (content : string) => {
        update({
            id : params.id as Id<"documents">,
            document : content
        })
    }

    if(document === undefined) {
        return (
        <div>
            <Cover.Skeleton/>
            <div className=" md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                <div className=" space-y-4 pl-8 pt-4">
                    <Skeleton className={"h-14 w-[50%]"} />
                    <Skeleton className={"h-4 w-[80%]"} />
                    <Skeleton className={"h-4 w-[40%]"} />
                    <Skeleton className={"h-4 w-[60%]"} />
                </div>
            </div>
        </div>
        )
    }

    if(document === null){
        return <div>Not found</div>
    }

    return (
        <div className='pb-40  h-full '>
            <Cover url = {document?.coverImage} id={document._id} preview />
            <div className='md:max-w-3xl lg:max-w-4xl mx-auto pb-40'>
                <ToolBar initialData={document} preview />
                <Editor
                    onChange={onChange}
                    initialContent={document?.document as string}
                    editable={false}
                />
            </div>
        </div>
    )
}


