import { cn } from '@/lib/utils'
import { Pin } from 'lucide-react'
import React from 'react'

interface props {
    isPinned : boolean ,
    disabled : boolean ,
    title : string,
    authorLabel : string,
    createdAtLabel : string,
    onClick : () => void
}

export const Footer = ({
    isPinned ,
    title ,
    authorLabel ,
    createdAtLabel,
    onClick,
    disabled,
} : props) => {

    const handleClick = (
        event : React.MouseEvent<HTMLButtonElement , MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();
        onClick()
    }

    return (
        <div className=' relative bg-white dark:bg-stone-700 p-3'>
            <p className="text-[13px] truncate dark:text-stone-100 text-stone-800 max-w-[calc(100%-20px)]">
                {title}
            </p>
            <p className='opacity-0 group-hover:opacity-100 transition-opacity text-[11px] truncate text-muted-foreground dark:text-stone-300/80'>
                {authorLabel} , {createdAtLabel}
            </p>
            <button
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-stone-600 dark:text-stone-400 hover:text-stone-600 dark:hover:text-stone-400",
                    disabled && "cursor-not-allowed opacity-75"
                )}
            >
                <Pin 
                    className={cn('h-5 w-5', isPinned && "dark:fill-stone-400 fill-stone-600")}
                />
            </button>
        </div>
    )
}
