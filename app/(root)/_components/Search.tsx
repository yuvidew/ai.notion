"use client"

import qs from "query-string";
import { Search } from "lucide-react";
import { useLocalStorage } from 'usehooks-ts'
import {
    useEffect,
} from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useLocalStorage<string | number>('my-localStorage-key', "")

    useEffect(() => {
        const url = qs.stringifyUrl({
            url : "/",
            query : {
                search : value
            }
        } , {skipEmptyString : true , skipNull : true})
        router.push(url)
    } , [value, router])

    return (
        <div className="w-[20rem] relative ">
            <Search
                className=" absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
            />
            <Input 
                value={value}
                className="w-full max-w-[516px] pl-9"
                placeholder="Search boards.."
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}
