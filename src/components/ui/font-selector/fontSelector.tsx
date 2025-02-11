'use client';

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown/dropdown-menu"
import { Button } from "../button";

type fontType = {
    label: string;
    fontSize: string;
}
const fonts = [
    { label: 'A', fontSize: '16px' },
    { label: 'A+', fontSize: '18px' },
    { label: 'A-', fontSize: '14px' },
];

export default function FontSelector() {
    const [activeFont, setActiveFont] = useState('A');
    function handleSelection(font: fontType) {
        setActiveFont(font.label);
        document.documentElement.style.fontSize = font.fontSize;
    }
    return (
        <DropdownMenu >
            <div className="dropdown-content">
                <DropdownMenuTrigger>
                    <Button variant="outline" size="icon" className={`h-8 w-8 cursor-pointer`}>
                        {activeFont}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <div className="dropdown-content">
                        {fonts.map((font) => {
                            return (
                                <DropdownMenuItem key={font.label} onClick={() => handleSelection(font)}
                                    className={`hover:bg-primary-100 mx-auto w-full border-solid border-gray-200 p-2 font-bold flex ${activeFont === font.label ? 'bg-orange-200' : ''}`}
                                >
                                    {font.label}
                                </DropdownMenuItem>
                            );
                        })}
                    </div>
                </DropdownMenuContent>
            </div>
        </DropdownMenu>
    )
}