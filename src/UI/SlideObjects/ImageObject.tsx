import classes from "./SlideObject.module.css";
import { BaseObject } from "./BaseObject";
import { type SlideObject, TypeObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../../hooks/useResize.tsx";

interface ImageObjectProps {
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
}

export const ImageObject = ({
    element,
    isSelected,
    isDragging,
    onMouseDown,
    onClick,
    onResizeStart,
}: ImageObjectProps) => {
    return (
        <BaseObject
            element={element}
            isSelected={isSelected}
            isDragging={isDragging}
            onMouseDown={onMouseDown}
            onClick={onClick}
            onResizeStart={onResizeStart}
            className={`${classes.slideObj} ${isSelected ? classes.selected : ""}`}
        >
            <img
                src={element.type == TypeObject.Image ? element.src : ""}
                alt="Slide content"
                className={classes.image}
                draggable={false}
            />
        </BaseObject>
    );
};
