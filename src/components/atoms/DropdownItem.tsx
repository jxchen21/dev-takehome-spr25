interface DropdownItemProps {
    value: string;
    colors: string[];
    className?: string;
}
export default function DropdownItem({
    value,
    colors,
    className = ""
    } : DropdownItemProps) {
        console.log(colors[1]);
        return(
            <p
                className={`px-1 rounded-lg w-[75%] bg-[var(--bg)] text-[var(--fg)] ${className}`}
                style={{
                    '--bg': colors[0],
                    '--fg': colors[1]
                } as React.CSSProperties}
            >
                • {value}
            </p>
        );
}