"use client";

import React, { useEffect } from "react";
import { CreateOrganization } from "@clerk/nextjs";
import { usePopupStore } from "@/hooks/useZustandHook";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export const CreateNewTeam = () => {
  const { isOpen, closePopup } = usePopupStore();

  useEffect(() => {
    closePopup();
  }, [closePopup]);

  return (
    <div
      className={cn(
        "h-full w-full absolute items-center z-50 justify-center bg-stone-900/60",
        isOpen ? "flex" : "hidden"
      )}
    >
      <div className="flex items-end flex-col">
        <X className=" dark:text-stone-100 text-stone-900 cursor-pointer" onClick={closePopup}/>
        <CreateOrganization  />
      </div>
    </div>
  );
};
