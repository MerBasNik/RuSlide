import { useEffect, useRef } from "react";
import classes from "./Popup.module.css";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

const Popup = ({ isOpen, onClose, content }: PopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
        const id = setTimeout(() => {
            onClose();
        }, 2000);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
            clearTimeout(id);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={classes.overlay}>
            <div ref={popupRef} className={classes.popup}>
                <div className={classes.header}>
                    <h3 className={classes.title}>{content}</h3>
                    <button onClick={onClose} className={classes.closeButton}>x</button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
