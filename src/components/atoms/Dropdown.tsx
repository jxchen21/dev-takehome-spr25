import React from "react";
import {useState, useRef, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {faChevronUp} from '@fortawesome/free-solid-svg-icons';
import DropdownItem from "./DropdownItem";

interface DropdownProps {
    options: string[];
    value?: string;
}
const colorMaps: {[key: string]: { text: string; fill: string; indicator: string }} = {
  Completed: { text: "text-success-text", fill: "bg-success-fill", indicator: "text-success-indicator" },
  Pending: { text: "text-negative-text", fill: "bg-negative-fill", indicator: "text-negative-indicator" },
  Approved: { text: "text-warning-text", fill: "bg-warning-fill", indicator: "text-warning-indicator" },
  Rejected: { text: "text-danger-text", fill: "bg-danger-fill", indicator: "text-danger-indicator" }
};
export default function Dropdown({
    options,
    value = ""
}: DropdownProps) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(value);
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
        <div ref={dropdownRef} className="relative flex flex-col items-center">
            <button className={`relative flex flex-row justify-between items-center min-w-fit w-full text-sm p-2 border hover:bg-primary-fill transition-colors duration-300 ease-in-out
                ${open ? "border-primary" : "border-gray"} rounded-md`} onClick={toggleOpen}>
                {
                    selected === "" ? "Select" : <DropdownItem value={selected}
                                        className={`${colorMaps[selected].text}
                                        ${colorMaps[selected].fill}`}
                                        indicator={`${colorMaps[selected].indicator}`} />
                }
                <FontAwesomeIcon className="w-4 h-4" icon={open ? faChevronUp : faChevronDown} />
            </button>

            {
                open && (
                    <ul  className="absolute top-full w-full shadow-md bg-white shadow-gray z-10">
                        {
                            options.map((option) =>
                                <li key={option} className="p-2 hover:bg-gray-fill transition-colors duration-300 ease-in-out" onClick={() => setSelection(option)}>
                                    <DropdownItem value={option}
                                        className={`${colorMaps[option].text}
                                        ${colorMaps[option].fill}`}
                                        indicator={`${colorMaps[option].indicator}`} />
                                </li>
                            )
                        }
                    </ul>
                )
            }
        </div>
    );
}