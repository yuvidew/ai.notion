"use client";
import { usePathname } from 'next/navigation';
import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const BreadcrumbComp = () => {
    const path = usePathname();
    const allPaths = path.split("/").filter(Boolean); 

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    {allPaths.length > 0 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
                {allPaths.map((text, index) => {
                    const href = `/${allPaths.slice(0, index + 1).join("/")}`;
                    const isLast = index === allPaths.length - 1;

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{text}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{text}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
