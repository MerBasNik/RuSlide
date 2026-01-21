import { type OptionsType } from "../../UI/Dropdown/Dropdown.tsx";
import classes from "./MenuButton.module.css";
import type { ChangeEvent } from "react";

type MenuButtonProps = {
    title: string;
    options?: OptionsType[];
};

const MenuButton = ({ title, options }: MenuButtonProps) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        event.target.value = title;
    };
    if (options?.length > 0) {
        return (
            <select className={classes.menuButton} defaultValue={title} onChange={handleChange}>
                <option value={title} disabled>
                    {title}
                </option>
                {options?.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    } else {
        return <div className={classes.menuButton}>{title}</div>;
    }
};

export default MenuButton;
