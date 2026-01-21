import { uploadImage } from "./lib.ts";
import { createImage } from "../../store/types/SlideObject/Image.ts";
import { addObject, addSlide } from "../../store/reducers/PresentationSlice.ts";
import { createTextStyle } from "../../store/types/SlideObject/Text/TextStyle.ts";
import { createText } from "../../store/types/SlideObject/Text/Text.ts";
import { createSlide } from "../../store/types/Presentation/Slide.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
import { type ReactNode, useContext } from "react";
import { ThemeContext } from "../EditorPage/EditorPage.tsx";

type ToolBarButtonType = {
    onClick: () => void;
    nameAction: string;
    src?: string;
    children?: ReactNode;
};

type createButtonsProps = {
    undo: () => void;
    redo: () => void;
    undoAvailable: boolean;
    redoAvailable: boolean;
    currentSlide: string;
};

export const createToolBarButtons = ({
    undo,
    redo,
    undoAvailable,
    redoAvailable,
    currentSlide,
}: createButtonsProps) => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.presentation);
    const { toggleThemeBar } = useContext(ThemeContext);

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
        console.log("askldjflkas");
        const slide = createSlide(theme);
        dispatch(addSlide(slide));
    };
    const UndoAction = () => {
        if (undoAvailable) undo();
    };
    const RedoAction = () => {
        if (redoAvailable) redo();
    };

    const ToolBarButtons: ToolBarButtonType[] = [
        {
            onClick: UndoAction,
            src: "/images/undo.png",
            nameAction: "отменить",
        },
        {
            onClick: RedoAction,
            src: "/images/redo.png",
            nameAction: "повторить",
        },
        {
            onClick: handleAddSlide,
            src: "/images/plus.png",
            nameAction: '"добавить слайд"',
        },
        {
            onClick: () => handleAddText(currentSlide),
            src: "/images/text_icon.png",
            nameAction: "создать текстовое поле",
        },
        {
            onClick: () => handleAddImage(currentSlide),
            src: "/images/image.png",
            nameAction: "загрузить картинку",
        },
        {
            onClick: toggleThemeBar,
            nameAction: "Тема",
            children: "Тема",
        },
    ];
    return {
        ToolBarButtons,
    };
};
