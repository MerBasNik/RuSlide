import classes from "./TopMenu.module.css";
import Input from "../../UI/Input/Input.tsx";
import ToolBarList from "../ToolBarButton/ToolBarList.tsx";
import MenuList from "../MenuButton/MenuList.tsx";
import {
    type Presentation,
    setPresentationName,
} from "../../store/types/Presentation/Presentation.ts";
import { presentationMax } from "../../store/data/max.ts";
import { dispatch } from "../../store/StoreEditor/Editor.tsx";

type TopMenuProps = {
    editor: Presentation;
    presentationName: string;
};

const TopMenu = ({ editor, presentationName }: TopMenuProps) => {
    const handleNameChange = (newName: string) => {
        dispatch(setPresentationName, { editor: presentationMax, data: [newName] });
    };
    return (
        <header className={classes.topMenu}>
            <div className={classes.menuBar}>
                <div className={classes.menuBarInner}>
                    <img src="/images/logo3.png" alt="logo" className={classes.logo} />
                    <div className={classes.menuBlock}>
                        <Input
                            onNameChange={handleNameChange}
                            presentationName={presentationName}
                        />
                        <MenuList />
                    </div>
                </div>
                <div onClick={() => console.log("слайд-шоу")} className={classes.slideShow}>
                    Слайд-шоу
                </div>
            </div>
            <div className={classes.menuBlock}>
                <ToolBarList editor={editor} />
            </div>
        </header>
    );
};

export default TopMenu;
