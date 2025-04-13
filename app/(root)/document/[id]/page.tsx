
import React from 'react'
import { NavBar } from '../_components/NavBar'
import { WorkPage } from '../_components/WorkPage'
import { Id } from '@/convex/_generated/dataModel'
import { ChatBoat } from '../_components/ChatBoat'

interface Props {
    params: {
        id: Id<"documents">
    }
}

const DocumentPage = ({ params }: Props) => {
    return (
        <div className=' bg-[#1f1f1f] relative'>
            <header className=' w-full shadow-md'>
                <NavBar id={params.id} />
            </header>
            <div className=' overflow-y-auto'>
                <WorkPage id={params.id} />
            </div>
            <ChatBoat/>
        </div>
    )
}

export default DocumentPage