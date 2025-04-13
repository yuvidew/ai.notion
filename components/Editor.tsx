"use client"
import { useTheme } from "next-themes";
import React from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface EditorProps {
    onChange: (value: string) => void;
    initialContent: string;
    editable? : boolean;
}

export const Editor = ({
    onChange,
    initialContent,
    editable = true,
}: EditorProps) => {
    const { resolvedTheme } = useTheme();


    const editor = useCreateBlockNote({
        initialContent:
        initialContent
        ? JSON.parse(initialContent) : undefined,
    });

    return (
        <div className="h-full">
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={() => {
                    onChange(JSON.stringify(editor.document, null, 2));
                }}
            />
        </div>
    );
};
