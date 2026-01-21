import { useState, useEffect, useRef, useCallback } from "react";

export type DragItem = {
    id: string;
    data?: any;
    multiple?: boolean;
    selectedIds?: string[];
};

export type DragConfig = {
    typeDND: "slide" | "objects";
    onDragEnd: (dragIds: string[], targetId?: string) => void;
    containerRef?: React.RefObject<HTMLDivElement | null>;
};

export const useDragAndDrop = ({ typeDND, onDragEnd, containerRef }: DragConfig) => {
    const [targetId, setTargetId] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const startPosRef = useRef<Map<string, { x: number; y: number }>>(new Map());
    const startMousePos = useRef({ x: 0, y: 0 });
    const dragElementsId = useRef<string[]>([]);
    const [dragPreview, setDragPreview] = useState<{
        x: number;
        y: number;
        visible: boolean;
        item: DragItem | null;
    }>({
        x: 0,
        y: 0,
        visible: false,
        item: null,
    });

    const onDrag = useCallback(
        (e: React.MouseEvent<HTMLDivElement>, item: DragItem) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(true);
            dragElementsId.current = item.selectedIds || [item.id];

            if (typeDND === "objects") {
                startPosRef.current.clear();
                dragElementsId.current.forEach((id: string) => {
                    const element = document.querySelector(`[data-drag-id="${id}"]`) as HTMLElement;
                    if (element !== null && containerRef?.current != null) {
                        const rect = element.getBoundingClientRect();
                        const containerRect = containerRef?.current.getBoundingClientRect();
                        if (containerRect) {
                            const x = rect.left - containerRect.left;
                            const y = rect.top - containerRect.top;
                            startPosRef.current.set(id, { x, y });
                            startMousePos.current = { x: e.clientX, y: e.clientY };
                        }
                    }
                });
            }
            if (typeDND === "slide") {
                const rect = e.currentTarget.getBoundingClientRect();
                setDragPreview({
                    x: rect.left,
                    y: rect.top,
                    visible: true,
                    item: item,
                });
                // Запоминаем начальную позицию мыши для слайдов
                startMousePos.current = { x: e.clientX, y: e.clientY };
            }
        },
        [containerRef, typeDND]
    );

    const onMove = useCallback(
        (e: MouseEvent) => {
            if (typeDND === "slide") {
                // Обновляем позицию превью с отступом от курсора
                const newX = e.clientX - 88; // Половина ширины миниатюры
                const newY = e.clientY - 49; // Половина высоты миниатюры

                requestAnimationFrame(() => {
                    setDragPreview(prev => ({
                        ...prev,
                        x: newX,
                        y: newY,
                    }));
                });

                // Находим элемент под курсором
                const elements = document.elementsFromPoint(e.clientX, e.clientY);
                const onDropElement = elements.find(el => el.hasAttribute("data-drag-id"));

                if (onDropElement) {
                    const targetId = onDropElement.getAttribute("data-drag-id");
                    if (targetId && targetId !== dragPreview.item?.id) {
                        setTargetId(targetId);
                    }
                } else {
                    setTargetId("");
                }
            }

            if (typeDND === "objects") {
                const deltaX = e.clientX - startMousePos.current.x;
                const deltaY = e.clientY - startMousePos.current.y;
                if (containerRef?.current != null) {
                    const containerRect = containerRef?.current.getBoundingClientRect();
                    requestAnimationFrame(() => {
                        dragElementsId.current.forEach(id => {
                            const startPosition = startPosRef.current.get(id);
                            if (startPosition) {
                                const object = document.querySelector(
                                    `[data-drag-id="${id}"]`
                                ) as HTMLElement;
                                if (object !== null) {
                                    const newX = startPosition.x + deltaX;
                                    const newY = startPosition.y + deltaY;
                                    const finalX = Math.max(
                                        0,
                                        Math.min(newX, containerRect.width - object.clientWidth)
                                    );
                                    const finalY = Math.max(
                                        0,
                                        Math.min(newY, containerRect.height - object.clientHeight)
                                    );
                                    object.style.left = `${finalX}px`;
                                    object.style.top = `${finalY}px`;
                                }
                            }
                        });
                    });
                }
            }
        },
        [containerRef, typeDND, dragPreview.item?.id]
    );

    const onDrop = useCallback(() => {
        if (isDragging) {
            if (typeDND === "slide") {
                // Вызываем onDragEnd с ID перетаскиваемых слайдов и целевым ID
                onDragEnd(dragElementsId.current, targetId || "");
            }
            if (typeDND === "objects") {
                onDragEnd(dragElementsId.current);
            }
            setIsDragging(false);
            setDragPreview({ x: 0, y: 0, visible: false, item: null });
            setTargetId("");
            startMousePos.current = { x: 0, y: 0 };
            startPosRef.current.clear();
            dragElementsId.current = [];
        }
    }, [isDragging, onDragEnd, targetId, typeDND]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onDrop);
        } else {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onDrop);
        }
        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onDrop);
        };
    }, [isDragging, onMove, onDrop]);

    return {
        onDrag,
        isDragging,
        dragPreview,
    };
};
