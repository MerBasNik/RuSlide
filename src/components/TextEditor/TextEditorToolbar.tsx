import classes from "./TextEditorToolbar.module.css";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import { COMMON_FONTS, FONT_SIZE_OPTIONS, LINE_HEIGHT_OPTIONS } from "./consts.tsx";
import { TextEditorHandlers } from "./lib.tsx";
import BackgroundDropdown from "../BackgroundDropDown/BackgroundDropDown.tsx";
import ToolBarButton from "../ToolBarButton/ToolBarButton.tsx";
import { useState } from "react";

export const TextEditToolbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { slides, currentSlide } = useAppSelector(state => state.presentation);
    if (!currentSlide || !slides[currentSlide]) {
        return null;
    }
    const currObjId = slides[currentSlide].currentObject;
    if (!currObjId || !slides[currentSlide].objects[currObjId]) {
        return null;
    }
    const currObj = slides[currentSlide].objects[currObjId];
    if (currObj.type !== "text") {
        return null;
    }
    const currentObject = currObj;
    const {
        handleTextAlign,
        handleDecorationChange,
        handleFontChange,
        handleFontSizeChange,
        handleLineHeightChange,
        handleFontWeightChange,
        handleFontStyleChange,
    } = TextEditorHandlers({ currentSlideId: currentSlide, currentObject, currObjId });
    const toggleBackgroundDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className={classes.toolbar}>
            <div className={classes.toolbarGroup}>
                <button
                    onClick={() => handleTextAlign("left")}
                    className={`${classes.toolbarButton} ${currentObject?.style.textAlign === "left" ? classes.active : ""}`}
                    title="По левому краю"
                >
                    л
                </button>
                <button
                    onClick={() => handleTextAlign("center")}
                    className={`${classes.toolbarButton} ${currentObject?.style.textAlign === "center" ? classes.active : ""}`}
                    title="По центру"
                >
                    ц
                </button>
                <button
                    onClick={() => handleTextAlign("right")}
                    className={`${classes.toolbarButton} ${currentObject?.style.textAlign === "right" ? classes.active : ""}`}
                    title="По правому краю"
                >
                    п
                </button>
                <button
                    onClick={() => handleTextAlign("justify")}
                    className={`${classes.toolbarButton} ${currentObject?.style.textAlign === "justify" ? classes.active : ""}`}
                    title="По ширине"
                >
                    ш
                </button>
            </div>

            <div className={classes.toolbarGroup}>
                <select
                    value={currentObject?.style.fontFamily || "Arial"}
                    onChange={e => handleFontChange(e.target.value)}
                    className={classes.select}
                >
                    {COMMON_FONTS.map(font => (
                        <option key={font} value={font}>
                            {font}
                        </option>
                    ))}
                </select>
            </div>

            <div className={classes.toolbarGroup}>
                <select
                    value={currentObject?.style.fontSize || 16}
                    onChange={e => handleFontSizeChange(Number(e.target.value))}
                    className={classes.select}
                >
                    {FONT_SIZE_OPTIONS.map(size => (
                        <option key={size} value={size}>
                            {size}px
                        </option>
                    ))}
                </select>
            </div>

            <div className={classes.toolbarGroup}>
                <button
                    onClick={() =>
                        handleFontWeightChange(
                            currentObject?.style.fontWeight === "bold" ? "normal" : "bold"
                        )
                    }
                    className={`${classes.toolbarButton} ${currentObject?.style.fontWeight === "bold" ? classes.active : ""}`}
                    title="Жирный"
                >
                    B
                </button>
                <button
                    onClick={() =>
                        handleFontStyleChange(
                            currentObject?.style.fontStyle === "italic" ? "normal" : "italic"
                        )
                    }
                    className={`${classes.toolbarButton} ${currentObject?.style.fontStyle === "italic" ? classes.active : ""}`}
                    title="Курсив"
                >
                    I
                </button>
                <button
                    onClick={() =>
                        handleDecorationChange(
                            currentObject?.style.decoration === "underline" ? "none" : "underline"
                        )
                    }
                    className={`${classes.toolbarButton} ${currentObject?.style.decoration === "underline" ? classes.active : ""}`}
                    title="Подчеркнутый"
                >
                    U
                </button>
            </div>

            <ToolBarButton
                className={classes.toolbarGroup}
                clickHandle={toggleBackgroundDropdown}
                nameAction={"изменить фон"}
            >
                Цвет
            </ToolBarButton>
            {showDropdown && (
                <BackgroundDropdown
                    slideId={currentSlide}
                    objId={currObjId}
                    onClose={() => setShowDropdown(false)}
                />
            )}
            <div className={classes.toolbarGroup}>
                <select
                    value={currentObject?.style.lineHeight || 1.2}
                    onChange={e => handleLineHeightChange(Number(e.target.value))}
                    className={classes.select}
                >
                    {LINE_HEIGHT_OPTIONS.map(height => (
                        <option key={height} value={height}>
                            {height}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};
