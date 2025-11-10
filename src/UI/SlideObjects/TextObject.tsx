import { BaseObject } from "./BaseObject";
import { type SlideObject, TypeObject } from "../../store/types/SlideObject/DefaultObject.ts";
import type { ResizeDirection } from "../ResizeHandles/ResizeHandle.tsx";
import type { DragItem } from "../../hooks/useDND/useDND.tsx";
import { setContent } from "../../store/reducers/PresentationSlice.ts";
import { useAppDispatch } from "../../hooks/useRedux.ts";

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
    // onTextUpdate: (objId: string, content: string) => void;
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
    const dispatch = useAppDispatch();
    // const presentation = useAppSelector(state => state.presentation);
    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.textContent?.trim() || "";
        const content = element.type == TypeObject.Text ? element.content : "";
        if (newContent !== content) {
            // onTextUpdate(element.id, newContent);
            dispatch(setContent({ slideId: slideId, objId: element.id, content: newContent }));
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
            isResizing={isResizing}
            isCurrent={isCurrent}
            handleObjectClick={handleObjectClick}
            onDrag={onDrag}
            onResizeStart={onResizeStart}
            dragItem={dragItem}
            style={style}
        >
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            >
                {element.type == TypeObject.Text ? element.content : ""}
            </div>
        </BaseObject>
    );
};
