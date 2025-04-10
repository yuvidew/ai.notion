"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2, Link2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./ConfirmModal";
import { Button } from "./ui/button";
import { useRenameModel } from "@/hooks/useRenameModel";


interface Props {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string,
    type :string
}

export const Action = ({
    children,
    side,
    sideOffset,
    id,
    title,
    type
}: Props) => {
    const {onOpen} = useRenameModel()
    const {mutate , pending} = useApiMutation(api.file.remove)

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/${type}/${id}`
        )
        .then(() => toast.success("Link copied"))
        .catch(() => toast.error("Failed to copy link"))
    }

    const onDelete = () => {
        mutate({
            id,
        })
        .then(() => toast.success("File is deleted"))
        .catch(() => toast.error("Failed to delete file"))
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild >{children}</DropdownMenuTrigger>
                <DropdownMenuContent
                    onClick={(e) => e.stopPropagation()}
                    side={side}
                    sideOffset={sideOffset}
                    className="w-60"
                >
                    
                    <DropdownMenuItem 
                        className="p-3 cursor-pointer"
                        onClick={onCopyLink}
                    >
                        <Link2 className="h-4 w-4 mr-2" />
                        Copy board link
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        className="p-3 cursor-pointer"
                        onClick={() => onOpen(id , title)}
                    >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Rename
                    </DropdownMenuItem>
                    <ConfirmModal
                        header =  "Delete board"
                        description="This will delete the board and all of its contents."
                        disabled = {pending}
                        onConfirm={onDelete}
                    >
                        <Button 
                            className="p-3 cursor-pointer flex items-center gap-2 w-full justify-start"
                            variant={"ghost"}
                            size={"sm"}
                            
                        >
                            <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                            Delete
                        </Button>
                    </ConfirmModal>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
