import { type RefObject, useCallback } from "react";

export const updateSelectionBox = (
    groupBoundingBoxRef: RefObject<HTMLDivElement | null>,
    selectedObjects: string[],
    slideRef: RefObject<HTMLDivElement | null>,
) => useCallback(() => {

    if (!groupBoundingBoxRef?.current || selectedObjects.length === 0) return;

    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;
    let hasElements = false;

    selectedObjects.forEach((id: string) => {
        const element = document.querySelector(`[data-drag-id="${id}"]`) as HTMLElement;
        if (element !== null) {
            const rect = element.getBoundingClientRect();
            if (slideRef?.current) {
                const containerRect = slideRef.current.getBoundingClientRect();
                const x = rect.left - containerRect.left;
                const y = rect.top - containerRect.top;
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x + element.offsetWidth);
                maxY = Math.max(maxY, y + element.offsetHeight);
                hasElements = true;
            }
        }
    });

    if (hasElements && groupBoundingBoxRef?.current) {
        groupBoundingBoxRef.current.style.left = `${minX}px`;
        groupBoundingBoxRef.current.style.top = `${minY}px`;
        groupBoundingBoxRef.current.style.width = `${maxX - minX}px`;
        groupBoundingBoxRef.current.style.height = `${maxY - minY}px`;
        groupBoundingBoxRef.current.style.display = "block";
    }
}, [selectedObjects]);