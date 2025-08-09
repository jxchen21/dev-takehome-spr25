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
                className={`flex flex-row inline-flex items-center text-left text-sm pl-1 pr-2 rounded-lg
                    ${className}`}
            >
                <FontAwesomeIcon icon={faCircle} className={`ml-1 mr-2 w-1 h-1 ${indicator} mr-1`} />
                {value}
            </p>
        );
}