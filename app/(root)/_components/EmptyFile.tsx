"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";

export const EmptyFile = () => {
    const { organization } = useOrganization();
    const { mutate } = useApiMutation(api.file.create);
    const router = useRouter();

    const onCreate = async (orgId : Id<"documents"> | string) => {
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
        <section className="flex h-full flex-col items-center justify-center">
            <Image
                src={"/images/empty-file.png"}
                alt="image"
                height={110}
                width={110}
                className="hidden dark:block"
            />
            <Image
                src={"/images/empty-file-dark.png"}
                alt="image"
                height={110}
                width={110}
                className="block dark:hidden"
            />
            <h2 className="text-2xl font-semibold mt-6 ">
                Create your <span className=" text-stone-500">first</span> file!
            </h2>
            <br />
            {
                organization && (
                    <Button onClick={() => onCreate(organization?.id)} size={"lg"} variant={"default"} className="cursor-pointer">
                        Create file
                    </Button>
                )
            }
        </section>
    );
};
