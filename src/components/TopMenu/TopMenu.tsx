import classes from "./TopMenu.module.css";
import Input from "../../UI/Input/Input.tsx";
import ToolBarList from "../ToolBarButton/ToolBarList.tsx";
import MenuList from "../MenuButton/MenuList.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
import { setPresentationName } from "../../store/reducers/PresentationSlice.ts";
import { undo, redo } from "../../store/reducers/historySlice.ts";
import { selectCanUndo, selectCanRedo } from "../../store/reducers/historySlice.ts";
import { NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/context.ts";

type TopMenuProps = {
    onLogout: () => void;
};

const TopMenu = ({ onLogout }: TopMenuProps) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const undoAvailable = useAppSelector(selectCanUndo);
    const redoAvailable = useAppSelector(selectCanRedo);

    const { name } = presentation;

    const handleNameChange = (newName: string) => {
        dispatch(setPresentationName(newName));
    };

    const handleUndo = () => {
        if (undoAvailable) {
            dispatch(undo());
        }
    };

    const handleRedo = () => {
        if (redoAvailable) {
            dispatch(redo());
        }
    };

    return (
        <header className={classes.topMenu}>
            <NavLink to={"/ruslide/home"} className={classes.backButton}>
                Назад
            </NavLink>
            <div className={classes.menuBar}>
                <div className={classes.menuBarInner}>
                    <NavLink to={"/ruslide/home"}>
                        <img src="/images/logo.png" alt="logo" className={classes.logo} />
                    </NavLink>
                    <div className={classes.menuBlock}>
                        <Input onNameChange={handleNameChange} presentationName={name} />
                        <MenuList />
                    </div>
                </div>
                <div className={classes.extraBlock}>
                    <div
                        onClick={() => {
                            navigate("/ruslide/slide_show");
                            console.log("слайд-шоу");
                        }}
                        className={classes.slideShow}
                    >
                        Слайд-шоу
                    </div>
                    <div className={classes.userBlock}>
                        {user && <div>{user.username}</div>}
                        <div onClick={onLogout} className={classes.logoutButton}>
                            Выйти
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.menuBlock}>
                <ToolBarList
                    undo={handleUndo}
                    redo={handleRedo}
                    undoAvailable={undoAvailable}
                    redoAvailable={redoAvailable}
                />
            </div>
        </header>
    );
};

export default TopMenu;
