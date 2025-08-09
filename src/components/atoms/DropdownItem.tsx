import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
interface DropdownItemProps {
    value: string;
    className?: string;
    indicator: string
}
export default function DropdownItem({
    value,
    className = "",
    indicator
    } : DropdownItemProps) {
        return(
            <p
                className={`flex flex-row items-center text-left text-sm px-1 rounded-lg w-[75%]
                    ${className}`}
            >
                <FontAwesomeIcon icon={faCircle} className={`ml-1 mr-2 w-1 h-1 ${indicator} mr-1`} />
                {value}
            </p>
        );
}