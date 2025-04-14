
"use client";

import React, { useState } from "react";
import { ChevronsUpDown, Plus, SquareCheck, Trash2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { usePopupStore } from "@/hooks/useZustandHook";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Spinner from "./Spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import { useDeleteOrganization } from "@/hooks/useDeleteOrganization";
import { deleteOrganization } from "@/lib/deleteOrganization";

const TeamMembers = ({
    id,
    name,
    imageUrl,
    membersCount,
    setActive,
    isActive,
}: {
    id: string;
    name: string;
    imageUrl: string;
    membersCount: number;
    isActive: boolean;
    setActive: ({ organization }: { organization: string }) => void;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    // const { deleteOrganization } = useDeleteOrganization();

    // this function is help to select the team
    const onClick = () => {
        if (!setActive) return null;

        setActive({ organization: id });
    };

    // this function is help to delete the team
    const onDeleteOrganization = async (organizationId: string) => {
        setLoading(true);
        try {
            // const response = await axios.delete("/api/organization", {
            //     data: { organizationId },
            // });

            const result = await deleteOrganization(organizationId);

            if (result.success) {
                toast.success("Successfully delete the team.");
                window.location.reload();
            }else{
                toast.error(result.error);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <DropdownMenuItem
            key={id}
            className={cn(
                "gap-2 p-2 cursor-pointer opacity-60 hover:opacity-100",
                isActive && "opacity-100"
            )}
        >
            <div onClick={onClick} className="flex items-center w-full gap-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                    <Image
                        width={500}
                        height={500}
                        alt={name}
                        src={imageUrl}
                        className={
                            "rounded-sm cursor-pointer opacity-75 hover:opacity-100 h-full"
                        }
                    />
                </div>
                {name}
                <DropdownMenuShortcut>⌘{membersCount}</DropdownMenuShortcut>
            </div>
            <Button
                variant={"ghost"}
                size={"icon"}
                className=" cursor-pointer"
                onClick={() => onDeleteOrganization(id)}
            >
                {loading ? <Spinner /> : <Trash2 />}
            </Button>
        </DropdownMenuItem>
    );
};

const Invitations = ({
    id,
    email,
    onAccept,
}: {
    id: string;
    email: string;
    onAccept: () => void;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handelAccept = async () => {
        setIsLoading(true);
        await onAccept();
        window.location.reload();
        router.push("/");
        setIsLoading(false);
    };
    return (
        <DropdownMenuItem
            key={id}
            className={cn("gap-2 justify-between p-2 cursor-pointer opacity-60 hover:opacity-100")}
        >
            <p className=" truncate w-24">{email}</p>
            <Button
                variant={"ghost"}
                size={"sm"}
                className=" cursor-pointer"
                onClick={handelAccept}
            >
                {isLoading ? <Spinner /> : <SquareCheck />}
            </Button>
        </DropdownMenuItem>
    );
};

export const TeamSwitcher = () => {
    const { isMobile } = useSidebar();
    const { openPopup } = usePopupStore();
    const { userMemberships, setActive, userInvitations } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
        userInvitations: {
            infinite: true,
            keepPreviousData: true,
        },
    });

    const { organization } = useOrganization();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {/* start:-  it's header which is showing current team */}
                        {organization ? (
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="flex aspect-square w-[2rem] h-[2rem] items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Image
                                        alt={organization?.name || ""}
                                        width={500}
                                        height={500}
                                        src={organization?.imageUrl || ""}
                                        className="rounded-sm h-full"
                                    />
                                </div>
                                <div className="flex justify-between items-center  w-full text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {organization?.name}
                                    </span>
                                    {organization?.pendingInvitationsCount !== 0 && (
                                        <span className="px-2 text-[.7rem] py-1 rounded-sm bg-stone-700">
                                            {organization?.pendingInvitationsCount}
                                        </span>
                                    )}
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        ) : (
                            <Button variant={"primary"} className="w-full cursor-pointer">
                                {" "}
                                <Plus /> Create new Team
                            </Button>
                        )}

                        {/* end:-  it's header which is showing current team */}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Teams
                        </DropdownMenuLabel>

                        {/* start:- it's list of all other teams */}
                        {userMemberships.data?.map((team) => (
                            <TeamMembers
                                key={team.organization.id}
                                id={team.organization.id}
                                name={team.organization.name}
                                imageUrl={team.organization.imageUrl}
                                membersCount={team.organization.membersCount}
                                setActive={setActive ?? (() => { })}
                                isActive={organization?.id == team.organization.id}
                            />
                        ))}

                        {userInvitations.data?.length != 0 && (
                            <DropdownMenuLabel className="text-xs text-muted-foreground">
                                Invitations
                            </DropdownMenuLabel>
                        )}

                        {userInvitations.data?.map((invitation) => (
                            <Invitations
                                key={invitation.id}
                                id={invitation.id}
                                email={invitation.emailAddress}
                                onAccept={invitation.accept}
                            />
                        ))}

                        {/* end:- it's list of all other teams */}
                        <DropdownMenuSeparator />

                        {/* start: - it.s help to create new team */}
                        <DropdownMenuItem className="gap-2 p-2" onClick={openPopup}>
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4" />
                            </div>
                            <div className="font-medium text-muted-foreground">Add team</div>
                        </DropdownMenuItem>
                        {/* start: - it.s help to create new team */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};
