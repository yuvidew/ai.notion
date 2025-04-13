"use client";

import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Title } from './Title';
import { Publish } from './Publish';
import { Menu } from './Menu';
import Link from 'next/link';

interface props {
    id: Id<"documents">
}

export const NavBar = ({ id }: props) => {
    const document = useQuery(api.file.getById, { id: id as Id<"documents"> });

    if (document === undefined) {
        return (
            <nav className=" bg-background dark:bg-[#1f1f1f] px-3 py-2 w-full 
            flex items-center justify-between">
                <Title.Skeleton />
                <div className="flex items-center gap-x-2">
                    <Menu.Skeleton />
                </div>
            </nav>
        )
    }

    if (document === null) return null

    return (
        <nav className=" bg-background dark:bg-stone-900 px-3 py-2 w-full 
        flex items-center gap-x-4">
            <SidebarTrigger className="-ml-1" />
            <div className='flex items-center justify-between w-full'>
                {document._id !== undefined && (
                    <>
                        <Title initialData={document} />
                        <div className='flex items-center gap-x-2'>
                            <Link href={"/"} className='text-sm'>Dashboard</Link>
                            <Publish id={document._id} isPublished={document.isPublished} />
                            <Menu id={document._id} />
                        </div>
                    </>
                )}
            </div>
        </nav>
    )
}
