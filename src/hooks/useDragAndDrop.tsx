import { useState, useCallback, useRef } from "react";
import type { SlideObject } from "../store/types/SlideObject/DefaultObject.ts";

interface UseDragAndDropProps {
    slideRef: React.RefObject<HTMLDivElement>;
    onPositionUpdate: (objId: string, x: number, y: number) => void;
}

export const useDragAndDrop = ({ slideRef, onPositionUpdate }: UseDragAndDropProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const draggedElementRef = useRef<HTMLElement | null>(null);
    const currentElementRef = useRef<SlideObject | null>(null);

    const handleMouseDown = useCallback(
        (event: React.MouseEvent, element: SlideObject) => {
            event.preventDefault();
            event.stopPropagation();

            const target = event.target as HTMLElement;
            console.log(target);
            if (target.classList.contains("resize-handle")) {
                return;
            }
            const elementDiv = target.closest(`[data-element-id]`) as HTMLElement;
            console.log(elementDiv);
            if (!elementDiv || slideRef.current) return;
            draggedElementRef.current = elementDiv;
            currentElementRef.current = element;
            setIsDragging(true);

            const rect = elementDiv.getBoundingClientRect();
            console.log(rect);
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;
            setDragOffset({ x: offsetX, y: offsetY });

            elementDiv.style.cursor = "grabbing";
        },
        [slideRef]
    );

    const handleMouseMove = useCallback(
        (moveEvent: MouseEvent) => {
            if (!isDragging || !draggedElementRef.current || !slideRef.current) return;
            const slideRect = slideRef?.current.getBoundingClientRect();
            let newX = moveEvent.clientX - slideRect.left - dragOffset.x;
            let newY = moveEvent.clientY - slideRect.top - dragOffset.y;
            newX = Math.max(
                0,
                Math.min(newX, slideRect.width - draggedElementRef.current.offsetWidth)
            );
            newY = Math.max(
                0,
                Math.min(newY, slideRect.height - draggedElementRef.current.offsetHeight)
            );
            draggedElementRef.current.style.left = newX + "px";
            draggedElementRef.current.style.top = newY + "px";
        },
        [isDragging, dragOffset, slideRef]
    );

    const handleMouseUp = useCallback(() => {
        if (isDragging && draggedElementRef.current && currentElementRef.current) {
            const finalX =
                parseInt(draggedElementRef.current.style.left) ||
                currentElementRef.current.position.x;
            const finalY =
                parseInt(draggedElementRef.current.style.top) ||
                currentElementRef.current.position.y;

            onPositionUpdate(currentElementRef.current.id, finalX, finalY);
            draggedElementRef.current.style.cursor = "pointer";
        }

        setIsDragging(false);
        draggedElementRef.current = null;
        currentElementRef.current = null;
    }, [isDragging, onPositionUpdate]);

    return {
        isDragging,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
    };
};
