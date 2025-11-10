import { type DragItem, useDragAndDrop } from "../../hooks/useDND/useDND.tsx";
import { useResize } from "../../hooks/useSlideDND/useResize.tsx";
import { useRef, useEffect, useCallback, useState } from "react";
import classes from "./Slide.module.css";
// import { useSlideObjects } from "../../hooks/useSlideDND/useSlideObjects.tsx";
// import { type Presentation } from "../../store/types/Presentation/Presentation.ts";
// import type { Position, SlideObject } from "../../store/types/SlideObject/DefaultObject.ts";
// import { type Slide as TSlide } from "../../store/types/Presentation/Slide.ts";
// import { dispatch } from "../../store/StoreEditor/Editor.tsx";
import { ImageObject } from "../../UI/SlideObjects/ImageObject.tsx";
import { TextObject } from "../../UI/SlideObjects/TextObject.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import { deleteObject, setPosition } from "../../store/reducers/PresentationSlice.ts";
import { type Position } from "../../store/types/SlideObject/DefaultObject.ts";

type SlideProps = {
    slideId: string;
    // editor: Presentation;
    // slide: TSlide;
    // objects: Array<SlideObject>;
};

// export const Slide = ({ editor, slide, objects }: SlideProps) => {
export const Slide = ({ slideId }: SlideProps) => {
    const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
    const [currentObject, setCurrentObject] = useState("");
    const slideRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const slide = presentation.slides.get(slideId);
    // const { updateObjectPosition, updateObjectSize, updateTextContent } = useSlideObjects({
    //     presentation,
    //     slide,
    // });
    const groupBoundingBoxRef = useRef<HTMLDivElement>(null);
    const objects = Array.from(slide?.objects?.values() || []);

    const onDragEnd = (dragIds: string[]) => {
        const positionsMap = new Map<string, Position>();
        dragIds.forEach((id: string) => {
            const object = document.querySelector(`[data-drag-id="${id}"]`) as HTMLElement;
            if (object !== null) {
                const finalX = parseInt(object.style.left);
                const finalY = parseInt(object.style.top);
                positionsMap.set(id, { x: finalX, y: finalY });
            }
        });
        // updateObjectPosition(positionsMap);
        dispatch(setPosition({ slideId, positions: positionsMap }));
    };

    const { onDrag, isDragging } = useDragAndDrop({
        typeDND: "objects",
        onDragEnd,
        containerRef: slideRef,
    });

    const { isResizing, handleResizeStart } = useResize({ slideRef });

    const backgroundStyle: React.CSSProperties = {};
    if (slide?.background.type === "color") {
        backgroundStyle.backgroundColor = slide.background.color;
    } else if (slide?.background.type === "picture") {
        backgroundStyle.backgroundImage = `url(${slide?.background.src})`;
        backgroundStyle.backgroundSize = "cover";
        backgroundStyle.backgroundPosition = "center";
    }

    const handleObjectClick = useCallback(
        (elementId: string, event: React.MouseEvent) => {
            event.stopPropagation();
            if (event.metaKey || event.ctrlKey) {
                setSelectedObjects(prev => {
                    const isSelected = prev.includes(elementId);
                    const newSelected = isSelected
                        ? prev.filter(id => id !== elementId)
                        : [...prev, elementId];

                    if (isSelected && elementId === currentObject) {
                        setCurrentObject(newSelected.length > 0 ? newSelected[0] : "");
                    } else if (!isSelected) {
                        setCurrentObject(elementId);
                    }
                    return newSelected;
                });
            } else if (event.shiftKey && selectedObjects.length > 0) {
                if (!selectedObjects.includes(elementId)) {
                    setSelectedObjects(prev => [...prev, elementId]);
                    setCurrentObject(elementId);
                }
            } else {
                setSelectedObjects([elementId]);
                setCurrentObject(elementId);
            }
        },
        [selectedObjects, currentObject]
    );

    const handleSlideClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setSelectedObjects([]);
            setCurrentObject("");
        }
    };

    const updateSelectionBoundingBox = useCallback(() => {
        if (!groupBoundingBoxRef.current || selectedObjects.length === 0) return;

        let minX = Infinity,
            minY = Infinity,
            maxX = -Infinity,
            maxY = -Infinity;
        let hasElements = false;

        selectedObjects.forEach((id: string) => {
            const element = document.querySelector(`[data-drag-id="${id}"]`) as HTMLElement;
            if (element !== null) {
                const rect = element.getBoundingClientRect();
                if (slideRef.current) {
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

        if (hasElements && groupBoundingBoxRef.current) {
            groupBoundingBoxRef.current.style.left = `${minX}px`;
            groupBoundingBoxRef.current.style.top = `${minY}px`;
            groupBoundingBoxRef.current.style.width = `${maxX - minX}px`;
            groupBoundingBoxRef.current.style.height = `${maxY - minY}px`;
            groupBoundingBoxRef.current.style.display = "block";
        }
    }, [selectedObjects]);

    useEffect(() => {
        if (selectedObjects.length > 0) {
            updateSelectionBoundingBox();
        } else if (groupBoundingBoxRef.current) {
            groupBoundingBoxRef.current.style.display = "none";
        }
    }, [selectedObjects, updateSelectionBoundingBox]);

    useEffect(() => {
        if (isDragging || isResizing) {
            updateSelectionBoundingBox();
            const interval = setInterval(updateSelectionBoundingBox, 16);
            return () => clearInterval(interval);
        }
    }, [isDragging, isResizing, updateSelectionBoundingBox]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(selectedObjects);
            if (event.key === "Backspace" && selectedObjects.length > 0) {
                // dispatch(deleteObject, { editor: editor, data: [slide.id, selectedObjects] });
                dispatch(deleteObject({ slideId, objIds: selectedObjects }));
                setSelectedObjects([]);
                setCurrentObject("");
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, selectedObjects, slideId]);

    return (
        <div
            ref={slideRef}
            className={classes.slideView}
            style={backgroundStyle}
            onClick={handleSlideClick}
        >
            <div
                ref={groupBoundingBoxRef}
                className={classes.selectionBoundingBox}
                style={{
                    display: selectedObjects.length > 0 ? "block" : "none",
                }}
            />
            {objects.map(element => {
                const isSelected = selectedObjects.includes(element.id);
                const isCurrent = currentObject === element.id;

                const dragItem: DragItem = {
                    id: element.id,
                    selectedIds: selectedObjects,
                };

                if (element.type === "image") {
                    return (
                        <ImageObject
                            key={element.id}
                            element={element}
                            isSelected={isSelected}
                            isDragging={isDragging}
                            isCurrent={isCurrent}
                            isResizing={isResizing}
                            dragItem={dragItem}
                            onDrag={onDrag}
                            handleObjectClick={handleObjectClick}
                            onResizeStart={handleResizeStart}
                        />
                    );
                }

                if (element.type === "text") {
                    return (
                        <TextObject
                            key={element.id}
                            slideId={slideId}
                            element={element}
                            isSelected={isSelected}
                            isDragging={isDragging}
                            isCurrent={isCurrent}
                            isResizing={isResizing}
                            dragItem={dragItem}
                            onDrag={onDrag}
                            handleObjectClick={handleObjectClick}
                            onResizeStart={handleResizeStart}
                            style={{
                                fontSize: element.style.fontSize,
                                color: element.style.color,
                            }}
                        />
                    );
                }
                return null;
            })}
        </div>
    );
};
