import Image from 'next/image'
import React from 'react'


export const Loading = () => {
    return (
        <div className='w-full h-full gap-y-4 flex items-center justify-center'>
            <Image 
                src={"/logo.svg"}
                alt='logo'
                width={100}
                height={100}
                className='animate-pulse duration-150 text-while'
            />
        </div>
    )
}
