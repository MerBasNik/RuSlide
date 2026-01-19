import { useRef, useEffect, type ReactNode } from "react";
import classes from "./Dropdown.module.css";

interface DropdownProps {
    children: ReactNode;
    onClose: () => void;
}

const Dropdown = ({ children, onClose }: DropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={dropdownRef} className={classes.dropdown}>
            {children}
        </div>
    );
};

export default Dropdown;
