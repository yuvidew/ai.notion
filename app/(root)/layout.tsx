import React from 'react'
import { AppSidebar } from "@/components/AppSidebar"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { ModalProvider } from '@/components/providers/ModalProvider';


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider >
            <AppSidebar />
            <SidebarInset className='bg-[#1f1f1f]'>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </SidebarInset>
        </SidebarProvider>
    )
}
