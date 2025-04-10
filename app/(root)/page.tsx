

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Sidebar } from "./_components/Sidebar";
import { DashboardWrapper } from "./_components/DashboardWrapper";
import { RenameModal } from "@/components/modals/RenameModal";
import { ChangeModal } from "@/components/modals/ChangeModal";


export default async function Home() {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect('/sign-in')
  return ( 
    <div className="px-5 py-3 flex items-start gap-2 h-full font-[family-name:var(--font-geist-sans)]">
      <Sidebar/>
      <DashboardWrapper />
      <RenameModal/>
      <ChangeModal/>
    </div>
  );
}
