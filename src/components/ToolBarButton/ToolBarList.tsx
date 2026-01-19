import classes from "../TopMenu/TopMenu.module.css";
import ToolBarButton from "./ToolBarButton.tsx";
import { createText } from "../../store/types/SlideObject/Text/Text.ts";
import { createTextStyle } from "../../store/types/SlideObject/Text/TextStyle.ts";
import { createImage } from "../../store/types/SlideObject/Image.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
import { addObject, addSlide } from "../../store/reducers/PresentationSlice.ts";
import { createSlide } from "../../store/types/Presentation/Slide.ts";
import { useState } from "react";
import BackgroundDropdown from "../BackgroundDropDown/BackgroundDropDown.tsx";
import { TextEditToolbar } from "../TextEditor/TextEditorToolbar.tsx";
import { uploadImage } from "./lib.ts";

type ToolBarListProps = {
    undo: () => void;
    redo: () => void;
    undoAvailable: boolean;
    redoAvailable: boolean;
};

const ToolBarList = ({ undo, redo, undoAvailable, redoAvailable }: ToolBarListProps) => {
    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const { currentSlide } = presentation;
    const [showBackgroundDropdown, setShowBackgroundDropdown] = useState(false);

    const handleAddImage = async (slideId: string) => {
        try {
            const data = await uploadImage();
            if (data === null) return;
            const parseData = JSON.parse(data);
            const image = createImage(
                parseData.fileUrl,
                { width: parseData.dimensions.width, height: parseData.dimensions.height },
                { x: 100, y: 100 },
                parseData.base64
            );

            if (slideId) {
                dispatch(addObject({ slideId, obj: image }));
            }
        } catch (error) {
            console.error("Error adding image:", error);
        }
    };

    const handleAddText = (slideId: string) => {
        const newStyles = createTextStyle({
            fontSize: 20,
            fontWeight: "normal",
            fontFamily: "sans-serif",
            fontStyle: "normal",
            lineHeight: 1,
            color: "black",
            decoration: "none",
        });
        const newText = createText("Text", newStyles, { width: 200, height: 200 }, { x: 0, y: 0 });
        dispatch(addObject({ slideId, obj: newText }));
    };

    const handleAddSlide = () => {
        const slide = createSlide();
        dispatch(addSlide(slide));
    };

    const UndoAction = () => {
        if (undoAvailable) undo();
    };

    const RedoAction = () => {
        if (redoAvailable) redo();
    };

    const toggleBackgroundDropdown = () => {
        setShowBackgroundDropdown(!showBackgroundDropdown);
    };

    return (
        <ul className={classes.toolBar} style={{ position: "relative" }}>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"приблизить"}
                    src={"/images/magnifier.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={UndoAction}
                    nameAction={"отменить"}
                    src={"/images/undo.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={RedoAction}
                    nameAction={"повторить"}
                    src={"/images/redo.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={handleAddSlide}
                    nameAction={"добавить слайд"}
                    src={"/images/plus.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"создать текстовое поле"}
                    src={"/images/text_icon.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"добавить линию"}
                    src={"/images/vector.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddText(currentSlide)}
                    nameAction={"добавить фигуру"}
                    src={"/images/geometric_symbol.png"}
                />
            </li>
            <li>
                <ToolBarButton
                    clickHandle={() => handleAddImage(currentSlide)}
                    nameAction={"загрузить картинку"}
                    src={"/images/image.png"}
                />
            </li>
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
