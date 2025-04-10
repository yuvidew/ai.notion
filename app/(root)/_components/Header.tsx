"use client";

import React, { useEffect } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ModeToggle";
import { BreadcrumbComp } from "@/components/BreadcrumbComp";

export const Header = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push("/sign-in");
        }
    }, [isAuthenticated, isLoading, router]);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex w-full items-center justify-between px-4">
                <div className = "flex items-center gap-2.5">
                    <SidebarTrigger className="-ml-1" /> 
                    <BreadcrumbComp/>   
                </div>
                
                <div className="flex items-center justify-end gap-1.5">
                    {isLoading ? (
                        <div className="flex items-center justify-end">
                            <Spinner />
                        </div>
                    ) : isAuthenticated ? (
                        <UserButton signInUrl="/dashboard" />
                    ) : null}
                    <ModeToggle/>
                </div>
            </div>
        </header>
    );
};
