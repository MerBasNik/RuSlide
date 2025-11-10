import classes from "./SlideObject.module.css";
import { BaseObject } from "./BaseObject";
import { type SlideObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../ResizeHandles/ResizeHandle.tsx";
import type { DragItem } from "../../hooks/useDND.tsx";

interface ImageObjectProps {
    element: SlideObject;
    isSelected: boolean;
    isDragging: boolean;
    isCurrent: boolean;
    isResizing: boolean;
    dragItem: DragItem;
    onDrag: (e: React.MouseEvent<HTMLDivElement>, item: DragItem) => void;
    handleObjectClick: (objId: string, event: React.MouseEvent) => void;
    onResizeStart: (
        event: React.MouseEvent,
        direction: ResizeDirection,
        element: SlideObject
    ) => void;
    style?: React.CSSProperties;
}

export const ImageObject = ({
    element,
    isSelected,
    isDragging,
    isResizing,
    isCurrent,
    handleObjectClick,
    onDrag,
    dragItem,
    onResizeStart,
    style,
}: ImageObjectProps) => {
    return (
        <BaseObject
            element={element}
            isSelected={isSelected}
            isDragging={isDragging}
            isResizing={isResizing}
            isCurrent={isCurrent}
            onDrag={onDrag}
            handleObjectClick={handleObjectClick}
            onResizeStart={onResizeStart}
            dragItem={dragItem}
            style={style}
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
