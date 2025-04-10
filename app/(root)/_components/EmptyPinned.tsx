import Image from 'next/image'
import React from 'react'

export const EmptyPinned = () => {
    return (
        <search className="flex h-full flex-col items-center justify-center" >
            <Image
                src={"/images/empty-pinned.png"}
                alt="image"
                height={110}
                width={110}
                className="hidden dark:block"
            />
            <Image
                src={"/images/empty-pinned-dark.png"}
                alt="image"
                height={110}
                width={110}
                className="block dark:hidden"
            />
            <h2 className="text-2xl font-semibold mt-6 ">
                <span className=" text-stone-500">No</span> pinned file!
            </h2>
            <p className=" text-muted-foreground text-sm mt-2">
                Try pin a file
            </p>
        </search>
    )
}
