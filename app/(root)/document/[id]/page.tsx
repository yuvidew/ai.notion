
import React from 'react'
import { NavBar } from '../_components/NavBar'
import { WorkPage } from '../_components/WorkPage'
import { ChatBoat } from '../_components/ChatBoat'


const DocumentPage = () => {
    return (
        <div className=' bg-[#1f1f1f] relative'>
            <header className=' w-full shadow-md'>
                <NavBar />
            </header>
            <div className=' overflow-y-auto'>
                <WorkPage />
            </div>
            <ChatBoat/>
        </div>
    )
}

export default DocumentPage