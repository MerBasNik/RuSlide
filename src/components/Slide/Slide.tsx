import { type DragItem, useDragAndDrop } from "../../hooks/useDND.tsx";
import { useResize } from "../../hooks/useResize.tsx";
import { useRef, useEffect, useCallback, useState } from "react";
import classes from "./Slide.module.css";
import { ImageObject } from "../../UI/SlideObjects/ImageObject.tsx";
import { TextObject } from "../../UI/SlideObjects/TextObject.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import {
    addObject,
    addSlide,
    deleteObject,
    deleteSlide,
    selectObject,
    setPosition,
} from "../../store/reducers/PresentationSlice.ts";
import { type Position } from "../../store/types/SlideObject/DefaultObject.ts";
import { createSlide } from "../../store/types/Presentation/Slide.ts";
import { updateSelectionBox } from "./utils.ts";

type SlideProps = {
    slideId: string;
    push: (doFn: any, undoFn: any, ...argsToClone: any[]) => void;
};

export const Slide = ({ slideId, push }: SlideProps) => {
    const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
    const [currentObject, setCurrentObject] = useState("");
    const slideRef = useRef<HTMLDivElement>(null);
    const groupBoundingBoxRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const slide = presentation.slides[slideId];

    const objects = slide?.objects;

    const onDragEnd = (dragIds: string[]) => {
        const positionsMap: Record<string, Position> = {};
        const oldPositions: Record<string, Position> = {};

        dragIds.forEach((id: string) => {
            const object = document.querySelector(`[data-drag-id="${id}"]`) as HTMLElement;
            if (object !== null) {
                const finalX = parseInt(object.style.left);
                const finalY = parseInt(object.style.top);
                positionsMap[id] = { x: finalX, y: finalY };
                const oldObject = objects?.[id];
                if (oldObject) {
                    oldPositions[id] = { x: oldObject.position.x, y: oldObject.position.y };
                }
            }
        });

        push(
            () => dispatch(setPosition({ slideId, positions: positionsMap })),
            () => {
                dispatch(setPosition({ slideId, positions: oldPositions }));
                dispatch(selectObject({ slideId, objectIds: [] }));
                setSelectedObjects([]);
                console.log("oldPositions", oldPositions);
            },
            slideId,
            positionsMap,
            oldPositions
        );
    };

    const updateSelectionBoundingBox = updateSelectionBox(
        groupBoundingBoxRef,
        selectedObjects,
        slideRef
    );

    const { onDrag, isDragging } = useDragAndDrop({
        typeDND: "objects",
        onDragEnd,
        containerRef: slideRef,
    });

    const { isResizing, handleResizeStart } = useResize({ slideRef, slideId, push });

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
            let newSelectedObjects: string[] = [];
            let newCurrentObject = currentObject;

            if (event.metaKey || event.ctrlKey) {
                const isSelected = selectedObjects.includes(elementId);
                newSelectedObjects = isSelected
                    ? selectedObjects.filter(id => id !== elementId)
                    : [...selectedObjects, elementId];

                if (isSelected && elementId === currentObject) {
                    newCurrentObject = newSelectedObjects.length > 0 ? newSelectedObjects[0] : "";
                } else if (!isSelected) {
                    newCurrentObject = elementId;
                }
            } else if (event.shiftKey && selectedObjects.length > 0) {
                if (!selectedObjects.includes(elementId)) {
                    newSelectedObjects = [...selectedObjects, elementId];
                    newCurrentObject = elementId;
                }
            } else {
                newSelectedObjects = [elementId];
                newCurrentObject = elementId;
            }
            setSelectedObjects(newSelectedObjects);
            setCurrentObject(newCurrentObject);
        },
        [selectedObjects, currentObject]
    );

    const handleSlideClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            setSelectedObjects([]);
            setCurrentObject("");
        }
    };

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
            const interval = setInterval(updateSelectionBoundingBox, 5);
            return () => clearInterval(interval);
        }
    }, [isDragging, isResizing, updateSelectionBoundingBox]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Backspace" && selectedObjects.length > 0) {
                const objectsToDelete = [...selectedObjects];
                const deletedObjects = objectsToDelete.map(id => objects?.[id]).filter(Boolean);
                push(
                    () => {
                        dispatch(deleteObject({ slideId, objIds: objectsToDelete }));
                        setSelectedObjects([]);
                        setCurrentObject("");
                    },
                    () => {
                        selectedObjects.map(objId => {
                            const obj = objects[objId];
                            dispatch(addObject({ slideId, obj }));
                        });
                        setSelectedObjects(objectsToDelete);
                        setCurrentObject(objectsToDelete[0] || "");
                    },
                    slideId,
                    objectsToDelete,
                    deletedObjects
                );
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [dispatch, objects, push, selectedObjects, slideId]);

    const onCreateSlide = () => {
        const slide = createSlide();
        push(
            () => dispatch(addSlide(slide)),
            () => dispatch(deleteSlide([slide.id])),
            slide
        );
    };

    return (
        <div
            ref={slideRef}
            className={
                slideId !== "" ? classes.slideView : `${classes.slideView} ${classes.initial}`
            }
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
            {slideId !== "" ? (
                Object.values(objects).map(element => {
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
                                dragItem={dragItem}
                                onDrag={onDrag}
                                handleObjectClick={handleObjectClick}
                                onResizeStart={handleResizeStart}
                                style={{
                                    fontSize: element.style.fontSize,
                                    color: element.style.color,
                                }}
                                push={push}
                            />
                        );
                    }
                    return null;
                })
            ) : (
                <div onClick={onCreateSlide} className={classes.slideViewAdd}>
                    Нажмите, чтобы добавить новый слайд
                </div>
            )}
        </div>
    );
};
