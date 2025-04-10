"use client"
import { Button } from '@/components/ui/button'
import { FileStack, Pin } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export const Sidebar = () => {
    const searchParams = useSearchParams();
    const pinedFiles = searchParams.get("pinedFiles");
    return (
        <main className='  lg:flex md:flex hidden items-start gap-1.5 flex-col w-[10rem] '>
            <Button
                asChild
                variant={pinedFiles ? "ghost" :"primary"}
                size={"sm"}
                className='w-full font-normal flex justify-start px-2 cursor-pointer'
            >
                <Link href={"/"} >
                    <FileStack className='h-4 w-4 mr-2' />Teams files
                </Link>
            </Button>
            <Button
                asChild
                variant={pinedFiles ? "primary" :"ghost"}
                size={"sm"}
                className='w-full font-normal flex justify-start px-2 cursor-pointer'
            >
                <Link href={{
                    pathname : "/",
                    query : {pinedFiles : true}
                }} >
                    <Pin className='h-4 w-4 mr-2' />Pined files
                </Link>
            </Button>
        </main>
    )
}
