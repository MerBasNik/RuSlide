import { type DragItem, useDragAndDrop } from "../../hooks/useDND.tsx";
import { useResize } from "../../hooks/useResize.tsx";
import { useRef, useEffect, useCallback, useState } from "react";
import classes from "./Slide.module.css";
import { ImageObject } from "../../UI/SlideObjects/ImageObject.tsx";
import { TextObject } from "../../UI/SlideObjects/TextObject.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
import {
    addSlide,
    deleteObject,
    setPosition,
    updateTextObject,
    setCurrentObject,
} from "../../store/reducers/PresentationSlice.ts";
import { type Position } from "../../store/types/SlideObject/DefaultObject.ts";
import { createSlide } from "../../store/types/Presentation/Slide.ts";
import { updateSelectionBox } from "./utils.ts";

type SlideProps = {
    slideId: string;
};

export const Slide = ({ slideId }: SlideProps) => {
    const [selectedObjects, setSelectedObjects] = useState<string[]>([]);
    const [currObject, setCurrObject] = useState("");
    const [isEditingText, setIsEditingText] = useState(false);
    const [textEditValue, setTextEditValue] = useState("");
    const slideRef = useRef<HTMLDivElement>(null);
    const groupBoundingBoxRef = useRef<HTMLDivElement>(null);
    const textEditRef = useRef<HTMLTextAreaElement>(null);

    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const slide = presentation.slides[slideId];
    const objects = slide?.objects;
    const theme = presentation.theme;

    // Находим текущий текстовый объект
    const currentTextObject =
        currObject && objects?.[currObject]?.type === "text" ? objects[currObject] : null;

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

        dispatch(setPosition({ slideId, positions: positionsMap }));
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

    const { isResizing, handleResizeStart } = useResize({ slideRef, slideId });

    const backgroundStyle: React.CSSProperties = {};
    if (slide?.background.type === "color") {
        backgroundStyle.backgroundColor = slide.background.color;
    } else if (slide?.background.type === "picture") {
        backgroundStyle.backgroundImage = `url(${slide?.background.src})`;
        backgroundStyle.backgroundSize = "cover";
        backgroundStyle.backgroundPosition = "center";
    }

    const handleTextEditStart = useCallback(
        (elementId: string) => {
            if (objects?.[elementId]?.type === "text") {
                setCurrObject(elementId);
                setSelectedObjects([elementId]);
                setIsEditingText(true);
                setTextEditValue(objects[elementId].content);

                setTimeout(() => {
                    if (textEditRef.current) {
                        textEditRef.current.focus();
                        textEditRef.current.select();
                    }
                }, 10);
            }
        },
        [objects]
    );

    const handleTextEditSave = useCallback(() => {
        if (currentTextObject) {
            dispatch(
                updateTextObject({
                    slideId,
                    objectId: currObject,
                    updates: { content: textEditValue },
                })
            );
        }
        setIsEditingText(false);
    }, [currentTextObject, currObject, slideId, textEditValue, dispatch]);

    const handleTextEditCancel = useCallback(() => {
        setIsEditingText(false);
        setTextEditValue("");
    }, []);

    const handleObjectClick = useCallback(
        (elementId: string, event: React.MouseEvent) => {
            // Если сейчас редактируем текст, сохраняем изменения
            if (isEditingText) {
                handleTextEditSave();
            }

            let newSelectedObjects: string[] = [];
            let newCurrentObject = currObject;

            if (event.metaKey || event.ctrlKey) {
                const isSelected = selectedObjects.includes(elementId);
                newSelectedObjects = isSelected
                    ? selectedObjects.filter(id => id !== elementId)
                    : [...selectedObjects, elementId];

                if (isSelected && elementId === currObject) {
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
            setCurrObject(newCurrentObject);
            dispatch(setCurrentObject({ slideId: slideId, objectId: newCurrentObject }));
        },
        [isEditingText, currObject, selectedObjects, dispatch, slideId, handleTextEditSave]
    );

    const handleSlideClick = (event: React.MouseEvent) => {
        if (isEditingText) {
            handleTextEditSave();
        }

        if (event.target === event.currentTarget) {
            setSelectedObjects([]);
            setCurrObject("");
            setIsEditingText(false);
            dispatch(setCurrentObject({ slideId: slideId, objectId: "" }));
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Backspace" && selectedObjects.length > 0 && !isEditingText) {
                const objectsToDelete = [...selectedObjects];
                dispatch(deleteObject({ slideId, objIds: objectsToDelete }));
                setSelectedObjects([]);
                setCurrObject("");
                setIsEditingText(false);
            }

            if (event.key === "Escape" && isEditingText) {
                handleTextEditCancel();
            }

            if (event.key === "Enter" && isEditingText && event.ctrlKey) {
                handleTextEditSave();
            }

            if (
                (event.key === "F2" || event.key === "Enter") &&
                currentTextObject &&
                !isEditingText &&
                !event.ctrlKey
            ) {
                event.preventDefault();
                handleTextEditStart(currObject);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        dispatch,
        objects,
        selectedObjects,
        slideId,
        isEditingText,
        currentTextObject,
        currObject,
        handleTextEditSave,
        handleTextEditCancel,
        handleTextEditStart,
    ]);

    useEffect(() => {
        if (isEditingText && textEditRef.current && currentTextObject) {
            const textarea = textEditRef.current;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";

            const objectElement = document.querySelector(`[data-drag-id="${currObject}"]`);
            if (objectElement) {
                const rect = objectElement.getBoundingClientRect();
                const slideRect = slideRef.current?.getBoundingClientRect();
                if (slideRect) {
                    textarea.style.left = `${rect.left - slideRect.left}px`;
                    textarea.style.top = `${rect.top - slideRect.top}px`;
                    textarea.style.width = `${rect.width}px`;
                    textarea.style.minHeight = `${rect.height}px`;
                }
            }
        }
    }, [isEditingText, textEditValue, currentTextObject, currObject]);

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

    const onCreateSlide = () => {
        const slide = createSlide(theme);
        dispatch(addSlide(slide));
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

            {/* Поле для редактирования текста */}
            {isEditingText && currentTextObject && (
                <textarea
                    ref={textEditRef}
                    className={classes.textEditArea}
                    value={textEditValue}
                    onChange={e => setTextEditValue(e.target.value)}
                    onBlur={handleTextEditSave}
                    onKeyDown={e => {
                        if (e.key === "Escape") {
                            handleTextEditCancel();
                        } else if (e.key === "Enter" && e.ctrlKey) {
                            handleTextEditSave();
                        }
                    }}
                    style={{
                        fontSize: currentTextObject.style.fontSize,
                        fontFamily: currentTextObject.style.fontFamily,
                        fontWeight: currentTextObject.style.fontWeight,
                        fontStyle: currentTextObject.style.fontStyle,
                        color: currentTextObject.style.color,
                        textDecoration: currentTextObject.style.decoration,
                        lineHeight: currentTextObject.style.lineHeight,
                        textAlign: currentTextObject.style.textAlign as any,
                    }}
                />
            )}

            {slideId !== "" ? (
                Object.values(objects).map(element => {
                    const isSelected = selectedObjects.includes(element.id);
                    const isCurrent = currObject === element.id;

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
                        const handleDoubleClick = (e: React.MouseEvent) => {
                            if (e.detail === 2) {
                                // Двойной клик
                                handleTextEditStart(element.id);
                            }
                        };

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
                                handleObjectClick={(id, e) => {
                                    handleObjectClick(id, e);
                                    handleDoubleClick(e);
                                }}
                                onResizeStart={handleResizeStart}
                                style={{
                                    fontSize: element.style.fontSize,
                                    color: element.style.color,
                                    fontFamily: element.style.fontFamily,
                                    fontWeight: element.style.fontWeight,
                                    fontStyle: element.style.fontStyle,
                                    textDecoration: element.style.decoration,
                                    lineHeight: element.style.lineHeight,
                                    textAlign: element.style.textAlign as any,
                                }}
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
