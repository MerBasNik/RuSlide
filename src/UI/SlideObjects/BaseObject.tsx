// BaseObject.tsx
import { ResizeHandles } from "../ResizeHandles/ResizeHandle.tsx";
import type { SlideObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../../hooks/useResize.tsx";
import classes from "./SlideObject.module.css"; // Добавить импорт

interface BaseObjectProps {
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
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const BaseObject = ({
    element,
    isSelected,
    isDragging,
    onMouseDown,
    onClick,
    onResizeStart,
    children,
    className = "",
    style = {},
}: BaseObjectProps) => {
    return (
        <div
            data-element-id={element.id}
            className={`${className} ${isSelected ? classes.selected : ""}`} // Исправить классы
            style={{
                position: "absolute",
                left: `${element.position.x}px`,
                top: `${element.position.y}px`,
                width: `${element.size.width}px`,
                height: `${element.size.height}px`,
                cursor: isDragging ? "grabbing" : "pointer",
                ...style,
            }}
            onClick={e => onClick(element.id, e)}
            onMouseDown={e => onMouseDown(e, element)}
            onDragStart={e => e.preventDefault()}
        >
            {children}
            <ResizeHandles
                elementId={element.id}
                onResizeStart={onResizeStart}
                isSelected={isSelected}
            />
        </div>
    );
};
