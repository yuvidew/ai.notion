import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import { MoreHorizontal, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

interface MenuProps {
    id: Id<"documents">
}

export const Menu = ({ id }: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();

    const remove = useMutation(api.file.remove);

    const onDelete = async () => {
        try {
            const promise = remove({ id });

            toast.promise(promise, {
                loading: "Deleting the file...",
                success: "File is deleted!",
                error: "Failed to delete file.",
            });

            await promise;

            router.push("/");
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong while deleting.");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                >
                    <MoreHorizontal className=" h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-60"
                align="end"
                alignOffset={8}
                forceMount
            >

                <DropdownMenuItem onClick={onDelete}>
                    <Trash2 className=" h-4 w-4 mr-2 text-red-500" />
                    Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className=" text-xs text-muted-foreground p-2">
                    Last edited by :  {(user == undefined) || (user == null) ? "loading..." : user.fullName}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton() {
    return <Skeleton />
}
