import classes from "./SlideObject.module.css";
import { BaseObject } from "./BaseObject";
import { type SlideObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../ResizeHandles/ResizeHandle.tsx";
import type { DragItem } from "../../hooks/useDND.tsx";
import type { Ref } from "react";

interface ImageObjectProps {
    ref: Ref<HTMLDivElement>;
    element: SlideObject;
    isSelected: boolean;
    isDragging: boolean;
    isCurrent: boolean;
    dragItem: DragItem;
    onDrag: (e: React.MouseEvent<HTMLDivElement>, item: DragItem) => void;
    handleObjectClick: (objId: string, event: React.MouseEvent) => void;
    onResizeStart: (
        event: React.MouseEvent,
        direction: ResizeDirection,
        element: SlideObject
    ) => void;
}

export const ImageObject = ({
    ref,
    element,
    isSelected,
    isDragging,
    isCurrent,
    handleObjectClick,
    onDrag,
    dragItem,
    onResizeStart,
}: ImageObjectProps) => {
    return (
        <BaseObject
            ref={ref}
            element={element}
            isSelected={isSelected}
            isDragging={isDragging}
            isCurrent={isCurrent}
            onDrag={onDrag}
            handleObjectClick={handleObjectClick}
            onResizeStart={onResizeStart}
            dragItem={dragItem}
        >
            <img
                src={element.type == "image" ? element.src : ""}
                alt="Slide content"
                className={classes.image}
                draggable={false}
            />
        </BaseObject>
    );
};
