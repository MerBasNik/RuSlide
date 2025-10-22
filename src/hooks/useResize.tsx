import { useState, useCallback, useRef } from "react";
import type { SlideObject } from "../store/types/SlideObject/DefaultObject.ts";
import { type ResizeDirection } from "../UI/ResizeHandles/ResizeHandle.tsx";

interface UseResizeProps {
    slideRef: React.RefObject<HTMLDivElement>;
    onSizeUpdate: (objId: string, width: number, height: number) => void;
}

export const useResize = ({ slideRef, onSizeUpdate }: UseResizeProps) => {
    const [isResizing, setIsResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);
    const [resizeStartData, setResizeStartData] = useState({
        size: { width: 0, height: 0 },
        position: { x: 0, y: 0 },
        mouse: { x: 0, y: 0 },
    });

    const resizedElementRef = useRef<HTMLElement | null>(null);
    const currentElementRef = useRef<SlideObject | null>(null);

    const handleResizeStart = useCallback(
        (event: React.MouseEvent, direction: ResizeDirection, element: SlideObject) => {
            event.preventDefault();
            event.stopPropagation();

            const elementDiv = (event.target as HTMLElement).closest(
                `[data-element-id]`
            ) as HTMLElement;
            if (!elementDiv || !slideRef.current) return;
            resizedElementRef.current = elementDiv;
            currentElementRef.current = element;
            setIsResizing(true);
            setResizeDirection(direction);
            const rect = elementDiv.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(elementDiv);

            setResizeStartData({
                size: {
                    width: parseFloat(computedStyle.width) || rect.width,
                    height: parseFloat(computedStyle.height) || rect.height,
                },
                position: {
                    x: parseFloat(computedStyle.left) || rect.left,
                    y: parseFloat(computedStyle.top) || rect.top,
                },
                mouse: { x: event.clientX, y: event.clientY },
            });
        },
        [slideRef]
    );

    const handleResizeMove = useCallback(
        (moveEvent: MouseEvent) => {
            if (!isResizing || !resizedElementRef.current || !resizeDirection || !slideRef.current)
                return;
            const { size, position, mouse } = resizeStartData;
            const deltaX = moveEvent.clientX - mouse.x;
            const deltaY = moveEvent.clientY - mouse.y;
            const slideRect = slideRef.current.getBoundingClientRect();
            let newWidth = size.width;
            let newHeight = size.height;
            let newX = position.x;
            let newY = position.y;
            switch (resizeDirection) {
                case "e":
                    newWidth = Math.max(50, size.width + deltaX);
                    break;
                case "w":
                    newWidth = Math.max(50, size.width - deltaX);
                    newX = position.x + deltaX;
                    break;
                case "s":
                    newHeight = Math.max(30, size.height + deltaY);
                    break;
                case "n":
                    newHeight = Math.max(30, size.height - deltaY);
                    newY = position.y + deltaY;
                    break;
                case "se":
                    newWidth = Math.max(50, size.width + deltaX);
                    newHeight = Math.max(30, size.height + deltaY);
                    break;
                case "sw":
                    newWidth = Math.max(50, size.width - deltaX);
                    newHeight = Math.max(30, size.height + deltaY);
                    newX = position.x + deltaX;
                    break;
                case "ne":
                    newWidth = Math.max(50, size.width + deltaX);
                    newHeight = Math.max(30, size.height - deltaY);
                    newY = position.y + deltaY;
                    break;
                case "nw":
                    newWidth = Math.max(50, size.width - deltaX);
                    newHeight = Math.max(30, size.height - deltaY);
                    newX = position.x + deltaX;
                    newY = position.y + deltaY;
                    break;
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
        [isResizing, resizeDirection, resizeStartData, slideRef]
    );

    const handleResizeEnd = useCallback(() => {
        if (isResizing && resizedElementRef.current && currentElementRef.current) {
            const finalWidth =
                parseInt(resizedElementRef.current.style.width) ||
                currentElementRef.current.size.width;
            const finalHeight =
                parseInt(resizedElementRef.current.style.height) ||
                currentElementRef.current.size.height;

            onSizeUpdate(currentElementRef.current.id, finalWidth, finalHeight);
            resizedElementRef.current.style.cursor = "pointer";
        }

        setIsResizing(false);
        setResizeDirection(null);
        resizedElementRef.current = null;
        currentElementRef.current = null;
    }, [isResizing, onSizeUpdate]);

    return {
        isResizing,
        resizeDirection,
        handleResizeStart,
        handleResizeMove,
        handleResizeEnd,
    };
};
