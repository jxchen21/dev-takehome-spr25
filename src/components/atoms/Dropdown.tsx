import React from "react";
import {useState, useRef, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import DropdownItem from "./DropdownItem";

interface DropdownProps {
    options: string[];
}
const colorMaps: {[key: string]: string[]} = {
    Completed: ['#ECFDF3','#14BA6D'],
    Pending: ['#FFDAC3', '#A43E00'],
    Approved: ['#FFEBC8', '#7B5F2E'],
    Rejected: ['#FFD2D2', '#8D0402']
}
export default function Dropdown({
    options
}: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleOpen = (): void => {
        setOpen(!open);
    }

    const setSelection = (value : string): void => {
        setSelected(value)
    }

    return(
        <div ref={dropdownRef}>
            <button className={`relative flex flex-row items-center w-[75%] p-2 border hover:bg-blue-100 transition-colors duration-300 ease-in-out
                ${open ? "border-blue-500" : "border-gray"} rounded-md`} onClick={toggleOpen}>
                {
                    selected === "" ? "Select" : <DropdownItem className="text-left" value={selected} colors={colorMaps[selected]} />
                }
                <FontAwesomeIcon className="absolute right-[10%] w-4 h-4" icon={faChevronDown} />
            </button>

            {
                open && (
                    <ul  className="w-[75%] shadow-md shadow-gray">
                        {
                            options.map((option) =>
                                <li key={option} className="w-[100%] p-2 hover:bg-gray-100" onClick={() => setSelection(option)}><DropdownItem value={option} colors={colorMaps[option]} /></li>
                            )
                        }
                    </ul>
                )
            }
        </div>
    );
}