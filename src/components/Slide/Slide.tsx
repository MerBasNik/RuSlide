import classes from "./Slide.module.css";
import type { SlideObject } from "../../store/types/SlideObject/DefaultObject.ts";
import { selectObject, type Slide as TSlide } from "./../../store/types/Presentation/Slide.ts";
import { dispatch } from "../../store/StoreEditor/Editor.tsx";
import type { Presentation } from "../../store/types/Presentation/Presentation.ts";
import { useRef, useEffect } from "react";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { useResize } from "../../hooks/useResize";
import { useSlideObjects } from "../../hooks/useSlideObjects";
import { TextObject } from "../../UI/SlideObjects/TextObject";
import { ImageObject } from "../../UI/SlideObjects/ImageObject";

type SlideProps = {
    editor: Presentation;
    slide: TSlide;
    objects: Array<SlideObject>;
    selectedObjectId?: string | null;
};

export const Slide = ({ editor, slide, objects, selectedObjectId }: SlideProps) => {
    const slideRef = useRef<HTMLDivElement>(null);
    const { updateObjectPosition, updateObjectSize, updateTextContent } = useSlideObjects({
        editor,
        slide,
    });

    const {
        isDragging,
        handleMouseDown: handleDragStart,
        handleMouseMove: handleDragMove,
        handleMouseUp: handleDragEnd,
    } = useDragAndDrop({
        slideRef,
        onPositionUpdate: updateObjectPosition,
    });

    const { isResizing, handleResizeStart, handleResizeMove, handleResizeEnd } = useResize({
        slideRef,
        onSizeUpdate: updateObjectSize,
    });

    // TODO занести внутрь хука подписку на событие
    // TODO поправить изменение размера при минимальном размере объекта
    // TODO переделать днд у списка слайдов
    // TODO добавить изменение текста
    // TODO ограничение для перетаскивания объектов слайда
    // TODO ограничение для перетаскивания слайдов в слайдере

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener("mousemove", isDragging ? handleDragMove : handleResizeMove);
            document.addEventListener("mouseup", isDragging ? handleDragEnd : handleResizeEnd);
        }

        return () => {
            document.removeEventListener("mousemove", handleDragMove);
            document.removeEventListener("mousemove", handleResizeMove);
            document.removeEventListener("mouseup", handleDragEnd);
            document.removeEventListener("mouseup", handleResizeEnd);
        };
    }, [isDragging, isResizing, handleDragMove, handleResizeMove, handleDragEnd, handleResizeEnd]);

    const handleClick = (objId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (editor) {
            dispatch(selectObject, { editor, data: [slide.id, objId] });
        }
    };

    const handleSlideClick = (event: React.MouseEvent) => {
        if (editor && event.target === event.currentTarget) {
            dispatch(selectObject, { editor, data: [slide.id, null] });
        }
    };

    const backgroundStyle: React.CSSProperties = {};
    if (slide.background.type === "color") {
        backgroundStyle.backgroundColor = slide.background.color;
    } else if (slide.background.type === "picture") {
        backgroundStyle.backgroundImage = `url(${slide.background.src})`;
        backgroundStyle.backgroundSize = "cover";
        backgroundStyle.backgroundPosition = "center";
    }

    return (
        <div
            ref={slideRef}
            className={classes.slideView}
            style={backgroundStyle}
            onClick={handleSlideClick}
        >
            {objects.map(element => {
                const isSelected = selectedObjectId === element.id;
                const commonProps = {
                    element,
                    isSelected,
                    isDragging: isDragging && isSelected,
                    onMouseDown: handleDragStart,
                    onClick: handleClick,
                    onResizeStart: handleResizeStart,
                };

                if (element.type === "image") {
                    return <ImageObject key={element.id} {...commonProps} />;
                }
                return (
                    <TextObject
                        key={element.id}
                        {...commonProps}
                        onTextUpdate={updateTextContent}
                    />
                );
            })}
        </div>
    );
};
