import { type OptionsType } from "../../UI/Dropdown/Dropdown.tsx";
import classes from "./MenuButton.module.css";

type MenuButtonProps = {
    title: string;
    options: OptionsType[];
};

const MenuButton = ({ title, options }: MenuButtonProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        console.log("Выбрана опция:", selectedValue);
        event.target.value = title;
    };
    return (
        <select className={classes.menuButton} defaultValue={title} onChange={handleChange}>
            <option value={title} disabled>
                {title}
            </option>
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default MenuButton;
