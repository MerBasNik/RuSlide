import { ResizeHandles } from "../ResizeHandles/ResizeHandle.tsx";
import type { SlideObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../ResizeHandles/ResizeHandle.tsx";
import classes from "./SlideObject.module.css";
import type { DragItem } from "../../hooks/useDND/useDND.tsx";

interface BaseObjectProps {
    element: SlideObject;
    isSelected: boolean;
    isDragging: boolean;
    isResizing: boolean;
    isCurrent: boolean;
    onDrag: (e: React.MouseEvent<HTMLDivElement>, item: DragItem) => void;
    handleObjectClick: (objId: string, event: React.MouseEvent) => void;
    onResizeStart: (
        event: React.MouseEvent,
        direction: ResizeDirection,
        element: SlideObject
    ) => void;
    dragItem: DragItem;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const BaseObject = ({
    element,
    isSelected,
    isDragging,
    isResizing,
    isCurrent,
    onResizeStart,
    handleObjectClick,
    onDrag,
    dragItem,
    children,
    style = {},
}: BaseObjectProps) => {
    const isActive = isSelected && !isDragging && !isResizing;

    return (
        <div
            data-drag-id={element.id}
            className={`${classes.slideObj} ${
                isSelected ? classes.selected : ""
            } ${isCurrent ? classes.current : ""}`}
            style={{
                position: "absolute",
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
                cursor: isDragging && isSelected ? "grabbing" : "grab",
                ...style,
            }}
            onClick={e => handleObjectClick(element.id, e)}
            onMouseDown={e => onDrag(e, dragItem)}
        >
            {children}
            {isActive && (
                <ResizeHandles
                    elementId={element.id}
                    onResizeStart={onResizeStart}
                    isSelected={isSelected}
                />
            )}
        </div>
    );
};
