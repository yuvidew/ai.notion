import Image from 'next/image'
import React from 'react'

export const EmptySearch = () => {
    return (
        <search className="flex h-full flex-col items-center justify-center" >
            <Image
                src={"/images/empty-search.png"}
                alt="image"
                height={110}
                width={110}
                className="hidden dark:block"
            />
            <Image
                src={"/images/empty-search-dark.png"}
                alt="image"
                height={110}
                width={110}
                className="block dark:hidden"
            />
            <h2 className="text-2xl font-semibold mt-6 ">
                <span className=" text-stone-500">No</span> result found!
            </h2>
            <p className=" text-muted-foreground text-sm mt-2">
                Try searching for something else
            </p>
        </search>
    )
}
