'use client'

import EmojiPicker, { Theme } from "emoji-picker-react"
import { useTheme } from "next-themes"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"
import { ReactNode } from "react"

interface IconPickerProps {
    onChange: (emoji: string) => void
    children: ReactNode
    asChild?: boolean
}

const IconPicker: React.FC<IconPickerProps> = ({ onChange, children, asChild }) => {
    const { resolvedTheme } = useTheme()
    const currentTheme = resolvedTheme || "light"

    const themeMap: Record<string, Theme> = {
        dark: Theme.DARK,
        light: Theme.LIGHT,
    }

    const theme = themeMap[currentTheme] ?? Theme.LIGHT

    return (
        <Popover>
            <PopoverTrigger asChild={asChild}>
                {children}
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full border-none shadow-none">
                <EmojiPicker
                    height={350}
                    theme={theme}
                    onEmojiClick={(data) => onChange(data.emoji)}
                />
            </PopoverContent>
        </Popover>
    )
}

export default IconPicker
