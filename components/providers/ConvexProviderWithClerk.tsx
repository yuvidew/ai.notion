"use client"

import React, { ReactNode } from 'react'
import {ClerkProvider , useAuth} from "@clerk/nextjs"
import {ConvexProviderWithClerk} from "convex/react-clerk"
import {
    // AuthLoading,
    // Authenticated,
    ConvexReactClient,
} from "convex/react"
// import { Loading } from '../Loading'



const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!) 

export const ConvexWithClerkClientProvider = ({
    children
}:{
    children : ReactNode
}) => {
    
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >

            <ConvexProviderWithClerk
                useAuth={useAuth}
                client={convex}
            >
                    {children}
                {/* <Authenticated>
                </Authenticated>
                <AuthLoading>
                    <Loading/>
                </AuthLoading> */}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}
