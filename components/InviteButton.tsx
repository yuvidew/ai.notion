"use client"
import React from 'react';
import { Plus } from "lucide-react";
import { OrganizationProfile, useOrganization } from '@clerk/nextjs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from './ui/button';

export const InviteButton = () => {
    const {organization} = useOrganization()

    if(!organization) return null
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className=' cursor-pointer '>
                    <Plus />
                    Invite members
                </Button>
            </DialogTrigger>
            <DialogContent className='p-0 bg-transparent border-none max-w-[880px]' >
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <OrganizationProfile
                        routing="hash"
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
