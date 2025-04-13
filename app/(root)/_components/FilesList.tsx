"use client";

import React from "react";
import { EmptyFile } from "./EmptyFile";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { FileCard } from "./FileCard";
import { FileStack, Pin,} from "lucide-react";
import { EmptySearch } from "./EmptySearch";
import { EmptyPinned } from "./EmptyPinned";
import { useSearchParams } from "next/navigation";
import { NewFileBtn } from "@/components/CreateNewFile";

interface BoardListProps {
    orgId: Id<"documents">;
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
                            Documents
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
                            Documents
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
                    />
                ))}
            </div>
        </section>
    );
    return <EmptyFile />;
};

// https://www.flaticon.com/free-icon/folder_4826326?term=empty+file&page=1&position=26&origin=tag&related_id=4826326
