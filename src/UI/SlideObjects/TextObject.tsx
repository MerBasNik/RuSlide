import { BaseObject } from "./BaseObject";
import { type SlideObject, TypeObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../ResizeHandles/ResizeHandle.tsx";
import type { DragItem } from "../../hooks/useDND.tsx";
import { setContent } from "../../store/reducers/PresentationSlice.ts";
import { useAppDispatch } from "../../hooks/useRedux.ts";
import { useEffect, useRef, useState } from "react";

interface TextObjectProps {
    slideId: string;
    element: SlideObject;
    isSelected: boolean;
    isDragging: boolean;
    isCurrent: boolean;
    isResizing: boolean;
    onDrag: (e: React.MouseEvent<HTMLDivElement>, item: DragItem) => void;
    handleObjectClick: (objId: string, event: React.MouseEvent) => void;
    onResizeStart: (
        event: React.MouseEvent,
        direction: ResizeDirection,
        element: SlideObject
    ) => void;
    dragItem: DragItem;
    style?: React.CSSProperties;
}

export const TextObject = ({
    slideId,
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
}: TextObjectProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    // const presentation = useAppSelector(state => state.presentation);
    const content = element.type === TypeObject.Text ? element.content : "";
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        setIsEditing(false);
        const newContent = e.currentTarget.textContent?.trim() || "";
        if (newContent !== content) {
            dispatch(setContent({ slideId: slideId, objId: element.id, content: newContent }));
        }
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isSelected && !isDragging && !isResizing) {
            setIsEditing(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.blur();
        }
        if (e.key === "Escape") {
            if (textRef.current) {
                textRef.current.textContent = content;
            }
            setIsEditing(false);
        }
    };

    useEffect(() => {
        if (isEditing && textRef.current) {
            textRef.current.focus();
            const range = document.createRange();
            const selection = window.getSelection();
            if (textRef.current.firstChild) {
                range.setStart(
                    textRef.current.firstChild,
                    textRef.current.firstChild.textContent?.length || 0
                );
                range.collapse(true);
                selection?.removeAllRanges();
                selection?.addRange(range);
            }
        }
    }, [isEditing]);

    return (
        <BaseObject
            element={element}
            isSelected={isSelected}
            isDragging={isDragging}
            isResizing={isResizing}
            isCurrent={isCurrent}
            handleObjectClick={handleObjectClick}
            onDrag={onDrag}
            onResizeStart={onResizeStart}
            dragItem={dragItem}
            style={style}
            onDoubleClick={handleDoubleClick}
        >
            <div
                ref={textRef}
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onDoubleClick={handleDoubleClick}
            >
                {content}
            </div>
        </BaseObject>
    );
};
