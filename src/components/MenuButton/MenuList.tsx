import classes from "./MenuButton.module.css";
import MenuButton from "./MenuButton.tsx";
import type { OptionsType } from "../../UI/Dropdown/Dropdown.tsx";

const MenuList = () => {
    const FileOptions: OptionsType[] = [
        { value: "создать", label: "создать" },
        { value: "открыть", label: "открыть" },
        { value: "импорт", label: "импорт" },
    ];
    return (
        <ul className={classes.menuItems}>
            <li className={classes.menuItem}>
                <MenuButton title={"файл"} options={FileOptions} />
            </li>
            <li>
                <MenuButton title={"правка"} options={FileOptions} />
            </li>
            <li>
                <MenuButton title={"вид"} options={FileOptions} />
            </li>
            <li>
                <MenuButton title={"вставка"} options={FileOptions} />
            </li>
            <li>
                <MenuButton title={"формат"} options={FileOptions} />
            </li>
            <li>
                <MenuButton title={"слайд"} options={FileOptions} />
            </li>
            <li>
                <MenuButton title={"объект"} options={FileOptions} />
            </li>
        </ul>
    );
};

export default MenuList;
