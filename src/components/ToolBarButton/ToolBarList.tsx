import classes from "../TopMenu/TopMenu.module.css";
import ToolBarButton from "./ToolBarButton.tsx";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import { useState } from "react";
import BackgroundDropdown from "../BackgroundDropDown/BackgroundDropDown.tsx";
import { TextEditToolbar } from "../TextEditor/TextEditorToolbar.tsx";
import { createToolBarButtons } from "./consts.ts";

type ToolBarListProps = {
    undo: () => void;
    redo: () => void;
    undoAvailable: boolean;
    redoAvailable: boolean;
};

const ToolBarList = ({ undo, redo, undoAvailable, redoAvailable }: ToolBarListProps) => {
    const presentation = useAppSelector(state => state.presentation);
    const { currentSlide } = presentation;
    const [showBackgroundDropdown, setShowBackgroundDropdown] = useState(false);
    const { ToolBarButtons } = createToolBarButtons({
        undo,
        redo,
        undoAvailable,
        redoAvailable,
        currentSlide,
    });
    const toggleBackgroundDropdown = () => {
        setShowBackgroundDropdown(!showBackgroundDropdown);
    };

    return (
        <ul className={classes.toolBar} style={{ position: "relative" }}>
            {ToolBarButtons.map(item => (
                <li key={item.nameAction}>
                    <ToolBarButton
                        clickHandle={item.onClick}
                        nameAction={item.nameAction}
                        src={item?.src}
                    >
                        {item.children}
                    </ToolBarButton>
                </li>
            ))}
            <li style={{ position: "relative" }}>
                <ToolBarButton clickHandle={toggleBackgroundDropdown} nameAction={"изменить фон"}>
                    Фон
                </ToolBarButton>
                {showBackgroundDropdown && (
                    <BackgroundDropdown
                        slideId={currentSlide}
                        onClose={() => setShowBackgroundDropdown(false)}
                    />
                )}
            </li>
            <TextEditToolbar />
        </ul>
    );
};

export default ToolBarList;
