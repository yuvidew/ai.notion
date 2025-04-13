"use client"
import React, { useEffect, useState } from 'react'
import { CreateNewTeam } from '../CreateNewTeam'
import { CoverImageModels } from '../modals/CoverImageModels'
import { ReactNode } from 'react';

export const ModalProvider = ({children} : {children : ReactNode}) => {
    const [isMounted , setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    } , []);

    

    if (!isMounted) return null;

    return (
        <>
            {children}
            <CreateNewTeam />
            <CoverImageModels/>
        </>
    )
}
