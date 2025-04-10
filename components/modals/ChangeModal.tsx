"use client"
import { useSetting } from '@/hooks/useSetting'
import { Dialog } from '@radix-ui/react-dialog'
import React from 'react'
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { ModeToggle } from '../ModeToggle'
import { Label } from "../../components/ui/label"

export const ChangeModal = () => {
    const {isOpen , onClose} = useSetting()
    return (
        <Dialog 
            open = {isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader className={"border-b pb-3"} >
                    <DialogTitle className=" text-lg font-medium">
                        My settings
                    </DialogTitle>
                </DialogHeader>
                <div className=" flex items-center justify-between">
                    <div className=" flex flex-col gap-y-1">
                        <Label>
                            Appearance
                        </Label>
                        <span className=" text-[0.8rem] text-muted-foreground">
                            Customize how Ai.Notion looks on your device
                        </span>
                    </div>
                    <ModeToggle/>
                </div>
            </DialogContent>
        </Dialog>
    )
}
