import { Id } from '@/convex/_generated/dataModel'
import React from 'react'
import { WorkPage } from '../_components/WorkPage'

interface PublishPageProps {
    params: {
        id: Id<"documents">
    }
}

const PublishPage = ({ params }: PublishPageProps) => {
    return (
        <div className=' bg-[#1f1f1f] relative' >
            <div className=' overflow-y-auto'>
                <WorkPage id={params.id} />
            </div>
        </div>
    )
}

export default PublishPage;
