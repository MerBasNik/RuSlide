import classes from "./TopMenu.module.css";
import Input from "../../UI/Input/Input.tsx";
import ToolBarList from "../ToolBarButton/ToolBarList.tsx";
import MenuList from "../MenuButton/MenuList.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import { setPresentationName } from "../../store/reducers/PresentationSlice.ts";

type TopMenuProps = {
    push: (doFn: any, undoFn: any, ...argsToClone: any[]) => void;
    undo: () => void;
    redo: () => void;
    clear: () => boolean;
    undoAvailable: boolean;
    redoAvailable: boolean;
};

const TopMenu = ({ push, undo, redo, clear, undoAvailable, redoAvailable }: TopMenuProps) => {
    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const { name } = presentation;
    const handleNameChange = (newName: string) => {
        push(
            () => dispatch(setPresentationName(newName)),
            () => dispatch(setPresentationName(name)),
            newName,
            name
        );
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
                <ToolBarList
                    push={push}
                    undo={undo}
                    redo={redo}
                    clear={clear}
                    undoAvailable={undoAvailable}
                    redoAvailable={redoAvailable}
                />
            </div>
        </header>
    );
};

export default TopMenu;
