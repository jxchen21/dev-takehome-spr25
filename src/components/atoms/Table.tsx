import React from "react";
import {useState, useRef, useEffect} from "react";

interface TableProps {
    columns: string[];
    data: any[];
    tabs: string[];
}

export default function Table({ columns, data, tabs }: TableProps) {
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const notSelected = `bg-[#F2F2F2] rounded-tl-md
                        rounded-tr-md font-semibold text-[#666666]
                        hover:bg-blue-100 transition-colors duration-300 ease-in-out`
    const selected = `bg-[]`
    return(
    <>
        <div className="relative flex flex-col border-black border">
            <div className="flex flex-row gap-2">
                {
                    tabs.map((tab) => (<p key={tab}
                        className={`${notSelected} px-[3vw] py-4 text-center`}>{tab}</p>))
                }
            </div>
        </div>
    </>);
}