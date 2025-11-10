import classes from "./TopMenu.module.css";
import Input from "../../UI/Input/Input.tsx";
import ToolBarList from "../ToolBarButton/ToolBarList.tsx";
import MenuList from "../MenuButton/MenuList.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import { setPresentationName } from "../../store/reducers/PresentationSlice.ts";

const TopMenu = () => {
    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const { name } = presentation;
    const handleNameChange = (newName: string) => {
        dispatch(setPresentationName(newName));
    };
    return (
        <header className={classes.topMenu}>
            <div className={classes.menuBar}>
                <div className={classes.menuBarInner}>
                    <img src="/images/logo3.png" alt="logo" className={classes.logo} />
                    <div className={classes.menuBlock}>
                        <Input onNameChange={handleNameChange} presentationName={name} />
                        <MenuList />
                    </div>
                </div>
                <div onClick={() => console.log("слайд-шоу")} className={classes.slideShow}>
                    Слайд-шоу
                </div>
            </div>
            <div className={classes.menuBlock}>
                <ToolBarList />
            </div>
        </header>
    );
};

export default TopMenu;
