import { BaseObject } from "./BaseObject";
import { type SlideObject, TypeObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../ResizeHandles/ResizeHandle.tsx";
import type { DragItem } from "../../hooks/useDND.tsx";
import { type Ref } from "react";
import classes from "./SlideObject.module.css";

interface TextObjectProps {
    ref: Ref<HTMLDivElement>;
    element: SlideObject;
    isSelected: boolean;
    isDragging: boolean;
    isCurrent: boolean;
    onDrag: (e: React.MouseEvent<HTMLDivElement>, item: DragItem) => void;
    handleObjectClick: (objId: string, event: React.MouseEvent) => void;
    onResizeStart: (
        event: React.MouseEvent,
        direction: ResizeDirection,
        element: SlideObject
    ) => void;
    dragItem: DragItem;
    style?: React.CSSProperties;
    isEditing: boolean;
}

export const TextObject = ({
    ref,
    element,
    isSelected,
    isDragging,
    isCurrent,
    handleObjectClick,
    onDrag,
    dragItem,
    onResizeStart,
    style,
    isEditing,
}: TextObjectProps) => {
    const content = element.type === TypeObject.Text ? element.content : "";

    return (
        <BaseObject
            ref={ref}
            element={element}
            isSelected={isSelected}
            isDragging={isDragging}
            isCurrent={isCurrent}
            handleObjectClick={handleObjectClick}
            onDrag={onDrag}
            onResizeStart={onResizeStart}
            dragItem={dragItem}
            style={style}
        >
            <div
                className={classes.textElement}
                contentEditable={isEditing}
                suppressContentEditableWarning
                style={{
                    visibility: isEditing ? "hidden" : "visible",
                    opacity: isEditing ? 0 : 1,
                }}
            >
                {content}
            </div>
        </BaseObject>
    );
};
