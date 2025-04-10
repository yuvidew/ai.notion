"use client";

import React from "react";
import { EmptyFile } from "./EmptyFile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FileCard } from "./FileCard";
import { FileStack, Frame, Pin, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CreateNewFile } from "@/components/CreateNewFile";
import { EmptySearch } from "./EmptySearch";
import { EmptyPinned } from "./EmptyPinned";
import { useSearchParams } from "next/navigation";

interface BoardListProps {
    orgId: Id<"documents">;
}

const NewFileBtn = ({orgId} : {orgId : string}) => {
    return(
        <CreateNewFile orgId = {orgId} >
            <button
                className={cn(
                    "col-span-1 aspect-[100/127] dark:bg-stone-700 bg-stone-200 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-800 flex flex-col items-center justify-center py-6",
                )}
            >
                <div/>
                <Plus
                    className="h-10 w-10 dark:text-white text-stone-700 stroke-1"
                />
                <p className="text-sm dark:text-white text-stone-700 font-light" >New board</p>
            </button>
        </CreateNewFile>
    )
}

export const FilesList = ({ orgId }: BoardListProps) => {
    const params = useSearchParams()
    const data = useQuery(api.files.get, {
        orgId,
        search: params.get("search") ?? undefined,
        favorites: params.get("pinedFiles") == "true" ?  true : false,
    });


    if (data == undefined) {
        return (
            <div>
                <h2 className="text-xl mt-5">
                {params.get("pinedFiles") == "true" ? (
                    <div className="flex items-center gap-2">
                        <Pin className="w-5 h-5" />
                        <p className=" text-stone-600 dark:text-stone-300  font-medium text-xl">
                            Pined files
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <FileStack className="w-5 h-5" />
                        <p className=" text-stone-600 dark:text-stone-300  font-medium text-xl">
                            Docs
                        </p>

                        <span>&</span>

                        <Frame className="w-5 h-5" />
                        <p className=" text-stone-600 dark:text-stone-300  font-medium text-xl">
                            Projects
                        </p>
                    </div>
                )}
            </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-5 pb-10">
                    <NewFileBtn orgId={orgId} />
                    <FileCard.Skeleton />
                    <FileCard.Skeleton />
                    <FileCard.Skeleton />
                    <FileCard.Skeleton />
                </div>
            </div>
        );
    }

    if (!data?.length && params.get("search")) {
        return <EmptySearch/>;
    }

    if (!data?.length && params.get("pinedFiles") == "true") {
        return <EmptyPinned/>;
    }

    if (!data?.length) {
        return <EmptyFile/>;
    }

    return (
        <section className=" flex-1 h-[calc(100%-80px)]">
            <h2 className="text-xl mt-5">
                {params.get("pinedFiles") == "true" ? (
                    <div className="flex items-center gap-2">
                        <Pin className="w-5 h-5" />
                        <p className=" text-stone-600 dark:text-stone-300  font-medium text-xl">
                            Pined files
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <FileStack className="w-5 h-5" />
                        <p className=" text-stone-600 dark:text-stone-300  font-medium text-xl">
                            Docs
                        </p>

                        <span>&</span>

                        <Frame className="w-5 h-5" />
                        <p className=" text-stone-600 dark:text-stone-300  font-medium text-xl">
                            Projects
                        </p>
                    </div>
                )}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-5 pb-10">
                <NewFileBtn orgId={orgId} />
                {data?.map((file) => (
                    <FileCard
                        key={file._id}
                        id={file._id}
                        title={file.title}
                        imageUrl={file.coverImage!}
                        authorId={file.authorId}
                        authorName={file.authorName}
                        createdAt={file._creationTime}
                        orgId={file.orgId}
                        isPinned={file.isPined}
                        type = {file.type}
                    />
                ))}
            </div>
        </section>
    );
    return <EmptyFile />;
};

// https://www.flaticon.com/free-icon/folder_4826326?term=empty+file&page=1&position=26&origin=tag&related_id=4826326
