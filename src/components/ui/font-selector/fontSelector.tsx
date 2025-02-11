'use client';

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown/dropdown-menu"
import { Button } from "../button";
import Image from "next/image";
import greaterThan from '../../../assets/greater-than.svg'

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
                <div><Image src={greaterThan} alt='greater-than' className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-500"/></div>
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

                {/* Custom caret (^) */}
                {/* <span
        className="absolute w-2 h-2 bg-inherit rotate-45 border box-border z-0 border-gray-200 border-r-0 border-b-0"
        style={{ left: '50%', top: '-8px', transform: 'translateX(-50%)' }}
      ></span> */}
            </div>
        </DropdownMenu>
    )
}