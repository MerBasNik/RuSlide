import classes from "./TopMenu.module.css";
import Input from "../../UI/Input/Input.tsx";
import ToolBarList from "../ToolBarButton/ToolBarList.tsx";
import MenuList from "../MenuButton/MenuList.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
import { setPresentationName } from "../../store/reducers/PresentationSlice.ts";
import { undo, redo } from "../../store/reducers/historySlice.ts";
import { selectCanUndo, selectCanRedo } from "../../store/reducers/historySlice.ts";
import type { User } from "../../../services/appwrite/auth.ts";

type TopMenuProps = {
    user: User;
    onLogout: () => void;
};

const TopMenu = ({ user, onLogout }: TopMenuProps) => {
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
                <div onClick={onLogout}>Выйти</div>
                {user && <div>{user.name}</div>}
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
