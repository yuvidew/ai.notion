import React from 'react'
import { AppSidebar } from "@/components/AppSidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Header } from './_components/Header'
import { CreateNewTeam } from '@/components/CreateNewTeam';


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset>
                <Header />
                {children}
                <CreateNewTeam />
            </SidebarInset>
        </SidebarProvider>
    )
}
