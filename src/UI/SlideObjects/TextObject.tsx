import { BaseObject } from "./BaseObject";
import { type SlideObject, TypeObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../ResizeHandles/ResizeHandle.tsx";
import classes from "./SlideObject.module.css";

interface TextObjectProps {
    element: SlideObject;
    isSelected: boolean;
    isDragging: boolean;
    onMouseDown: (event: React.MouseEvent, element: SlideObject) => void;
    onClick: (objId: string, event: React.MouseEvent) => void;
    onResizeStart: (
        event: React.MouseEvent,
        direction: ResizeDirection,
        element: SlideObject
    ) => void;
    onTextUpdate: (objId: string, content: string) => void;
}

export const TextObject = ({
    element,
    isSelected,
    isDragging,
    onMouseDown,
    onClick,
    onResizeStart,
    onTextUpdate,
}: TextObjectProps) => {
    let textStyle: React.CSSProperties;
    if (element.type === TypeObject.Text) {
        textStyle = {
            fontSize: element.style.fontSize,
            color: element.style.color,
            fontFamily: element.style.fontFamily,
            fontWeight: element.style.fontWeight,
            padding: "8px",
            userSelect: "none",
            minWidth: "50px",
            minHeight: "20px",
            display: "flex",
            alignItems: "flex-start",
            overflow: "hidden",
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
        };
    } else {
        textStyle = {};
    }

    const editableStyle: React.CSSProperties = {
        width: "100%",
        height: "100%",
        outline: "none",
        border: "none",
        background: "transparent",
        cursor: "text",
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.textContent?.trim() || "";
        const content = element.type == TypeObject.Text ? element.content : "";
        if (newContent !== content) {
            onTextUpdate(element.id, newContent);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.blur();
        }
    };

    return (
        <BaseObject
            element={element}
            isSelected={isSelected}
            isDragging={isDragging}
            onMouseDown={onMouseDown}
            onClick={onClick}
            onResizeStart={onResizeStart}
            className={`${classes.textElement} ${isSelected ? classes.selected : ""}`}
            style={textStyle}
        >
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                style={editableStyle}
            >
                {element.type == TypeObject.Text ? element.content : ""}
            </div>
        </BaseObject>
    );
};
