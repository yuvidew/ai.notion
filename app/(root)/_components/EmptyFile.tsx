"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useOrganization } from "@clerk/nextjs";
import { CreateNewFile } from "@/components/CreateNewFile";

export const EmptyFile = () => {
    const { organization } = useOrganization();

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
                <CreateNewFile orgId={organization?.id} >
                    <Button size={"lg"} variant={"default"} className="cursor-pointer">
                        Create file
                    </Button>
                </CreateNewFile>
                )
            }
        </section>
    );
};
