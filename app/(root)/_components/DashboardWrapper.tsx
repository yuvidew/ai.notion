"use client"
import React from 'react'
import { SearchInput } from './Search'
import { InviteButton } from '@/components/InviteButton'
import { FilesList } from './FilesList'
import { useOrganization } from '@clerk/nextjs'
import { Id } from '@/convex/_generated/dataModel'


export const DashboardWrapper = () => {
  const { organization } = useOrganization();
  return (
    <main className="flex flex-col gap-1 w-full h-full">
      <div className="flex items-center justify-between">
        <SearchInput />
        <InviteButton />
      </div>
      {organization?.id && (
        <FilesList
          orgId={organization.id as Id<"documents">}
        />
      )}
    </main>
  )
}
