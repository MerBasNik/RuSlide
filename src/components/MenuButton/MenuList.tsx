import classes from "./MenuButton.module.css";
import MenuButton from "./MenuButton.tsx";

type MenuButton = {
    title: string;
};

const MenuList = () => {
    const MenuButtons: MenuButton[] = [{ title: "файл" }, { title: "темы" }];
    return (
        <ul className={classes.menuItems}>
            {MenuButtons.map(item => (
                <li key={item.title} className={classes.menuItem}>
                    <MenuButton title={item.title} />
                </li>
            ))}
        </ul>
    );
};

export default MenuList;
