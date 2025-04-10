"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { useRenameModel } from "@/hooks/useRenameModel"

import React, { FormEvent, useEffect, useState } from 'react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/useApiMutation"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

export const RenameModal = () => {
    const {mutate , pending} = useApiMutation(api.file.update)
    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModel()

    const [title , setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title)
    } , [initialValues.title])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutate({
            id : initialValues.id,
            title
        })
        .then(() => {
            toast.success("Board is renamed")
            onClose()
        })
        .catch(() => toast.error("Failed to rename"))
    };

    return (
        <Dialog open = {isOpen} onOpenChange={onClose}>
            <DialogContent className="p-5 w-[30rem]">
                <DialogHeader>
                    <DialogTitle>Edit board title</DialogTitle>
                    <DialogDescription>
                        Enter a new title for this board
                    </DialogDescription>
                    <div className=" mt-3" />
                    <form onSubmit={onSubmit} className=" space-y-4">
                        <Input 
                            disabled = {pending}
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title.."
                            maxLength={60}
                        />
                        <DialogFooter className=" mt-4">
                            <DialogClose asChild>
                                <Button type="button" variant={"outline"}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled = {pending} type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

