import React from "react";
import {useState, useRef, useEffect} from "react";
import Dropdown from "./Dropdown";
interface TableProps {
    columns: string[];
    tabs: string[];
}

export default function Table({ columns, tabs }: TableProps) {
    const data = [
        { name: "Alice", item: "Blanketsasdfasfadsfajsdfklasjdflkajsdlfk;jasdkl;fjkladfjl;kasdjflkasjdfklasjdfkljasdklfjalskdfjkalsdfjaklsdjflkasdjfasdf", created: "2025-08-01", updated: "2025-08-02", status: "Pending" },
        // ...more rows
        ];
    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const notSelected = `bg-gray-fill text-gray-text
                        hover:bg-primary-fill transition-colors duration-300 ease-in-out`
    const selected = `bg-primary text-white`
    const tableText = `text-left text-sm px-[1vw] py-2 bg-white
                        flex-1 font-semibold text-gray-text`
    const selectTab = (tab: string) : void => {
        setCurrentTab(tab);
    }
    return(
    <>
        <div className="relative w-[85vw] flex flex-col">
            <div className="flex flex-row md:gap-2 gap-1">
                {
                    tabs.map((tab) => (<p key={tab}
                        className={`${tab === currentTab ? selected : notSelected}
                        font-semibold rounded-tl-md rounded-tr-md px-[3vw] py-4 text-center`}
                        onClick={() => selectTab(tab)}>{tab}</p>))
                }
            </div>
            <table className="w-full table-fixed">
                <thead>
                    <tr className="border-gray-stroke border-t border-b">
                        {
                            columns.map((column) => (
                                <th key={column} className={tableText}>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => (
                    <tr key={idx}>
                        <td className={`${tableText} overflow-auto`}>{row.name}</td>
                        <td className={`${tableText} overflow-auto`}>{row.item}</td>
                        <td className={`${tableText} overflow-auto`}>{row.created}</td>
                        <td className={`${tableText} overflow-auto`}>{row.updated}</td>
                        <td className={tableText}><Dropdown options={["Completed", "Pending", "Approved", "Rejected"]} value={row.status} /></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>);
}