import { useState, useCallback, useRef, useEffect, type RefObject } from "react";
import type { SlideObject } from "../store/types/SlideObject/DefaultObject.ts";
import { type ResizeDirection } from "../UI/ResizeHandles/ResizeHandle.tsx";
import { setSize } from "../store/reducers/PresentationSlice.ts";
import { useAppDispatch } from "./useRedux.tsx";

interface UseResizeProps {
    slideRef: RefObject<HTMLDivElement | null>;
    slideId: string;
}

export const useResize = ({ slideRef, slideId }: UseResizeProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const resizeDirectionRef = useRef<ResizeDirection | null>(null);
    const resizeStartDataRef = useRef({
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        mouseX: 0,
        mouseY: 0,
    });

    const resizedElementRef = useRef<HTMLElement | null>(null);
    const currentElementRef = useRef<SlideObject | null>(null);
    const dispatch = useAppDispatch();
    const handleResizeStart = useCallback(
        (event: MouseEvent, direction: ResizeDirection, element: SlideObject) => {
            event.preventDefault();
            event.stopPropagation();

            const target = event.currentTarget as HTMLElement;
            const elementDiv = target.closest("[data-drag-id]") as HTMLElement;

            if (!elementDiv || !slideRef?.current) return;

            resizedElementRef.current = elementDiv;
            currentElementRef.current = element;
            resizeDirectionRef.current = direction;
            setIsResizing(true);

            const rect = elementDiv.getBoundingClientRect();
            const slideRect = slideRef.current.getBoundingClientRect();

            resizeStartDataRef.current = {
                width: rect.width,
                height: rect.height,
                x: rect.left - slideRect.left,
                y: rect.top - slideRect.top,
                mouseX: event.clientX,
                mouseY: event.clientY,
            };

            elementDiv.style.cursor = `${direction}-resize`;
        },
        [slideRef]
    );

    const handleResizeMove = useCallback(
        (moveEvent: MouseEvent) => {
            if (
                !isResizing ||
                !resizedElementRef.current ||
                !resizeDirectionRef.current ||
                !slideRef?.current
            )
                return;

            const slideRect = slideRef.current.getBoundingClientRect();
            const startData = resizeStartDataRef.current;
            const direction = resizeDirectionRef.current;

            const deltaX = moveEvent.clientX - startData.mouseX;
            const deltaY = moveEvent.clientY - startData.mouseY;

            let newX, newY: number;
            let proposedWidth = startData.width;
            let proposedHeight = startData.height;
            let proposedX = startData.x;
            let proposedY = startData.y;

            switch (direction) {
                case "e":
                    proposedWidth = startData.width + deltaX;
                    break;
                case "w":
                    proposedWidth = startData.width - deltaX;
                    proposedX = startData.x + deltaX;
                    break;
                case "s":
                    proposedHeight = startData.height + deltaY;
                    break;
                case "n":
                    proposedHeight = startData.height - deltaY;
                    proposedY = startData.y + deltaY;
                    break;
                case "se":
                    proposedWidth = startData.width + deltaX;
                    proposedHeight = startData.height + deltaY;
                    break;
                case "sw":
                    proposedWidth = startData.width - deltaX;
                    proposedHeight = startData.height + deltaY;
                    proposedX = startData.x + deltaX;
                    break;
                case "ne":
                    proposedWidth = startData.width + deltaX;
                    proposedHeight = startData.height - deltaY;
                    proposedY = startData.y + deltaY;
                    break;
                case "nw":
                    proposedWidth = startData.width - deltaX;
                    proposedHeight = startData.height - deltaY;
                    proposedX = startData.x + deltaX;
                    proposedY = startData.y + deltaY;
                    break;
            }

            let newWidth = Math.max(50, proposedWidth);
            let newHeight = Math.max(30, proposedHeight);

            if (direction.includes("w")) {
                if (proposedWidth < 50) {
                    newX = startData.x + (startData.width - 50);
                } else {
                    newX = proposedX;
                }
            } else {
                newX = startData.x;
            }

            if (direction.includes("n")) {
                if (proposedHeight < 30) {
                    newY = startData.y + (startData.height - 30);
                } else {
                    newY = proposedY;
                }
            } else {
                newY = startData.y;
            }

            newX = Math.max(0, Math.min(newX, slideRect.width - newWidth));
            newY = Math.max(0, Math.min(newY, slideRect.height - newHeight));
            newWidth = Math.min(newWidth, slideRect.width - newX);
            newHeight = Math.min(newHeight, slideRect.height - newY);

            resizedElementRef.current.style.width = newWidth + "px";
            resizedElementRef.current.style.height = newHeight + "px";
            resizedElementRef.current.style.left = newX + "px";
            resizedElementRef.current.style.top = newY + "px";
        },
        [isResizing, slideRef]
    );

    const handleResizeEnd = useCallback(() => {
        if (isResizing && resizedElementRef.current && currentElementRef.current) {
            const finalWidth = parseInt(resizedElementRef.current.style.width);
            const finalHeight = parseInt(resizedElementRef.current.style.height);
            const objId = currentElementRef.current.id;
            if (!isNaN(finalWidth) && !isNaN(finalHeight)) {
                dispatch(
                    setSize({
                        slideId: slideId,
                        objId: objId,
                        size: { width: finalWidth, height: finalHeight },
                    })
                );
            }
            resizedElementRef.current.style.cursor = "grab";
        }

        setIsResizing(false);
        resizeDirectionRef.current = null;
        resizedElementRef.current = null;
        currentElementRef.current = null;
    }, [dispatch, isResizing, slideId]);

    useEffect(() => {
        if (isResizing) {
            document.addEventListener("mousemove", handleResizeMove);
            document.addEventListener("mouseup", handleResizeEnd);
        }

        return () => {
            document.removeEventListener("mousemove", handleResizeMove);
            document.removeEventListener("mouseup", handleResizeEnd);
        };
    }, [isResizing, handleResizeMove, handleResizeEnd]);

    return {
        isResizing,
        handleResizeStart,
    };
};
