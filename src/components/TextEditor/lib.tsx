import { updateTextStyle } from "../../store/reducers/PresentationSlice.ts";
import { useDispatch } from "react-redux";
import type { Text } from "../../store/types/SlideObject/Text/Text.ts";

type TextEditorHandlersType = {
    currentSlideId: string;
    currentObject: Text | null;
    currObjId: string;
};

export const TextEditorHandlers = ({
    currentSlideId,
    currentObject,
    currObjId,
}: TextEditorHandlersType) => {
    const dispatch = useDispatch();
    const handleTextStyleUpdate = (styleUpdates: any) => {
        if (currentObject) {
            dispatch(
                updateTextStyle({
                    slideId: currentSlideId,
                    objectId: currObjId,
                    styleUpdates,
                })
            );
        }
    };
    const handleTextAlign = (alignment: "left" | "center" | "right" | "justify") => {
        handleTextStyleUpdate({ textAlign: alignment });
    };
    const handleFontChange = (fontFamily: string) => {
        handleTextStyleUpdate({ fontFamily });
    };
    const handleFontSizeChange = (fontSize: number) => {
        handleTextStyleUpdate({ fontSize });
    };
    const handleFontWeightChange = (fontWeight: number | "normal" | "bold") => {
        handleTextStyleUpdate({ fontWeight });
    };
    const handleFontStyleChange = (fontStyle: "normal" | "italic") => {
        handleTextStyleUpdate({ fontStyle });
    };
    const handleColorChange = (color: string) => {
        handleTextStyleUpdate({ color });
    };
    const handleDecorationChange = (decoration: "none" | "underline") => {
        handleTextStyleUpdate({ decoration });
    };
    const handleLineHeightChange = (lineHeight: number) => {
        handleTextStyleUpdate({ lineHeight });
    };

    return {
        handleTextStyleUpdate,
        handleFontSizeChange,
        handleFontWeightChange,
        handleFontStyleChange,
        handleLineHeightChange,
        handleDecorationChange,
        handleColorChange,
        handleTextAlign,
        handleFontChange,
    };
};
