"use client"

import {
    Folder,
    Forward,
    Frame,
    MoreHorizontal,
    Trash2,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Skeleton } from "./ui/skeleton"
import { useApiMutation } from "@/hooks/useApiMutation"
import { toast } from "sonner"

export const NavProjects = ({
    orgId
}: {
    orgId: Id<"documents"> | string,
}) => {
    const {mutate} = useApiMutation(api.file.remove)
    const data = useQuery(api.files.get, {
        orgId,
        search: undefined,
        favorites: false,
        type: "project",
    });
    const { isMobile } = useSidebar()

    const onDelete = (id : Id<"documents">) => {
        mutate({
            id,
        })
        .then(() => toast.success("Project is deleted"))
        .catch(() => toast.error("Failed to delete Project"))
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
                {data == undefined && [1, 2, 3].map((item) => (
                    <Skeleton key={item} className="w-full p-3" />
                ))}

                {!data?.length &&(
                    <SidebarMenuItem className="text-[12px] text-stone-500">
                        <SidebarMenuButton>
                            No projects
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}

                {data?.map((item) => (
                    <SidebarMenuItem key={item._id}>
                        <SidebarMenuButton asChild>
                            <a href={`/${item.type}/${item._id}`}>
                                <Frame />
                                <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <Folder className="text-muted-foreground" />
                                    <span>View Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Forward className="text-muted-foreground" />
                                    <span>Share Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => onDelete(item._id)} >
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Delete Project</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
