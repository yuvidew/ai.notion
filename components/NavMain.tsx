"use client"

import { BookOpen, ChevronRight, Settings2 } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { Skeleton } from "./ui/skeleton"
import { useSetting } from "@/hooks/useSetting"

const document = {
    title: "Documents",
    url: "document",
    icon: BookOpen,
    type: "document"
}
const setting = {
    title: "Settings",
    url: "#",
    icon: Settings2,
}

export const NavMain = ({ orgId }: { orgId: Id<"documents"> | string }) => {
    const data = useQuery(api.files.get, {
        orgId,
        search: undefined,
        favorites: false,
        type: document.type,
    });
    const {onOpen} = useSetting()


    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <Collapsible
                    key={document.title}
                    asChild
                    className="group/collapsible"
                >
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={document.title}>
                                {document.icon && <document.icon />}
                                <span>{document.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {data == undefined && [1, 2, 3].map((item) => (
                                    <Skeleton key={item} className="w-full p-3" />
                                ))}
                                {!data?.length && (
                                    <SidebarMenuSubItem >
                                        <SidebarMenuSubButton>
                                            No documents
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                )}

                                {data?.map((item) => (
                                    <SidebarMenuSubItem key={item._id}>
                                        <SidebarMenuSubButton asChild>
                                            <a href={`/${item.type}/${item._id}`}>
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>

                <Collapsible
                    key={setting.title}
                    asChild
                    className="group/collapsible"
                >
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={setting.title}>
                                {setting.icon && <setting.icon />}
                                <span>{setting.title}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem >
                                    <SidebarMenuSubButton onClick={onOpen}>
                                        Change Mode
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    )
}
