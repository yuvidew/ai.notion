"use client"

import * as React from "react"

import { NavMain } from "@/components/NavMain"
// import { NavProjects } from "@/components/NavProjects"
import { NavUser } from "@/components/NavUser"
import { TeamSwitcher } from "@/components/TeamSwitcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"
import { useOrganization } from "@clerk/nextjs"


export const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const {organization} = useOrganization()


    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher  />
            </SidebarHeader>
            <SidebarContent>
                {organization?.id && (
                    <>
                    <NavMain orgId={organization?.id} />
                    </>
                )}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
