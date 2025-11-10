import { useCallback, useEffect, useRef, useState } from "react";
// import {
//     // deleteSlide,
//     type Presentation,
//     // selectSlide,
//     // setSlidesOrder,
// } from "../../store/types/Presentation/Presentation.ts";
import classes from "./SlideBar.module.css";
// import { dispatch } from "../../store/StoreEditor/Editor.tsx";
import { SlideThumbnail } from "../../UI/SlideThumbnail/SlideThumbnail.tsx";
import { DragPreview } from "../../UI/SlideThumbnail/DragPreview.tsx";
import { useDragAndDrop } from "../../hooks/useDND/useDND.tsx";
import type { DragItem } from "../../hooks/useDND/useDND.tsx";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import {
    deleteSlide,
    selectSlide,
    setSlidesOrder,
} from "../../store/reducers/PresentationSlice.ts";

// type SlideBarProps = {
//     editor: Presentation;
// };

// const SlideBar = ({ editor }: SlideBarProps) => {
const SlideBar = () => {
    // const [slidesOrderPres, setSlidesOrderPres] = useState(editor.slidesOrder);
    // const [selectedSlides, setSelectedSlides] = useState<string[]>([]);
    const [currentSlide, setCurrentSlide] = useState("");
    const selectedSlidesRef = useRef<string[]>([]);
    const widthThumbnail = 120;
    const heightThumbnail = 80;
    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const { slidesOrder, slides, selectedSlides } = presentation;
    //
    // useEffect(() => {
    //     setSlidesOrderPres(editor.slidesOrder);
    // }, [editor.slidesOrder]);

    const getSlideObjects = useCallback(
        (slideId: string) => {
            const slide = slides.get(slideId);
            return Array.from(slide?.objects?.values() || []);
        },
        [slides]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Delete" && selectedSlides.length > 0) {
                // dispatch(deleteSlide, { editor: editor, data: [selectedSlides] });
                dispatch(deleteSlide(selectedSlides));
                // setSlidesOrderPres(prev => prev.filter(id => !selectedSlides.includes(id)));
                // setSelectedSlides([]);
                setCurrentSlide("");
            }
        },
        [dispatch, selectedSlides]
    );

    //TODO паттерн стратегия
    const onDragEnd = (dragIds: string[], targetId?: string) => {
        if (!targetId) return;
        if (!dragIds.includes(targetId) && targetId !== "") {
            const currentOrder = [...slidesOrder];
            const orderedDragIds = currentOrder.filter(id => dragIds.includes(id));
            const withoutDragged = currentOrder.filter(id => !dragIds.includes(id));
            const targetIndex = withoutDragged.indexOf(targetId);

            if (targetIndex !== -1) {
                const newOrder = [
                    ...withoutDragged.slice(0, targetIndex),
                    ...orderedDragIds,
                    ...withoutDragged.slice(targetIndex),
                ];

                // setSlidesOrderPres(newOrder);
                // setSelectedSlides(orderedDragIds);
                // dispatch(setSlidesOrder, { editor, data: [newOrder] });
                dispatch(setSlidesOrder(newOrder));
            }
        }
    };

    const { onDrag, dragPreview } = useDragAndDrop({
        onDragEnd,
        typeDND: "slide",
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    const handleSlideClick = useCallback(
        (slideId: string, event: React.MouseEvent) => {
            event.stopPropagation();

            let newSelectedSlides: string[] = [];

            if (event.metaKey) {
                if (selectedSlides.includes(slideId)) {
                    newSelectedSlides = selectedSlides.filter(id => id !== slideId);
                    if (slideId === currentSlide && newSelectedSlides.length > 0) {
                        const removedIndex = selectedSlides.indexOf(slideId);
                        const newCurrentSlide =
                            newSelectedSlides[Math.max(0, removedIndex - 1)] ||
                            newSelectedSlides[0];
                        setCurrentSlide(newCurrentSlide);
                    } else if (newSelectedSlides.length === 0) {
                        setCurrentSlide("");
                    }
                } else {
                    newSelectedSlides = [...selectedSlides, slideId];
                    setCurrentSlide(slideId);
                }
            } else if (event.shiftKey && selectedSlides.length > 0) {
                const lastSelectedIndex = slidesOrder.indexOf(
                    selectedSlides[selectedSlides.length - 1]
                );
                const currentIndex = slidesOrder.indexOf(slideId);

                if (lastSelectedIndex !== -1 && currentIndex !== -1) {
                    const start = Math.min(lastSelectedIndex, currentIndex);
                    const end = Math.max(lastSelectedIndex, currentIndex);
                    const rangeSelection = slidesOrder.slice(start, end + 1);

                    newSelectedSlides = Array.from(new Set([...selectedSlides, ...rangeSelection]));
                    setCurrentSlide(slideId);
                }
            } else {
                newSelectedSlides = [slideId];
                setCurrentSlide(slideId);
            }

            // setSelectedSlides(newSelectedSlides);
            selectedSlidesRef.current = newSelectedSlides;
            // dispatch(selectSlide, { editor, data: [slideId] });
            dispatch(selectSlide(slideId));
        },
        [selectedSlides, dispatch, currentSlide, slidesOrder]
    );

    const handleSlideBarClick = useCallback((event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            // setSelectedSlides([]);
            setCurrentSlide("");
        }
    }, []);

    const renderThumbnail = (dragItem: DragItem) => {
        const slide = slides.get(dragItem.id) || null;
        const objects = getSlideObjects(dragItem.id);
        return (
            <>
                <div className={classes.slideNumber}>{dragItem.data.index + 1}</div>
                <div className={classes.thumbnailContainer}>
                    <SlideThumbnail
                        slide={slide}
                        objects={objects}
                        width={widthThumbnail}
                        height={heightThumbnail}
                        className={classes.thumbnail}
                    />
                </div>
            </>
        );
    };

    return (
        <div className={classes.slideBar} onClick={handleSlideBarClick}>
            <DragPreview
                visible={dragPreview.visible}
                position={{
                    x: dragPreview.x,
                    y: dragPreview.y,
                }}
                item={dragPreview.item}
                renderThumbnail={renderThumbnail}
            />
            {slidesOrder.map((id, index) => {
                const slide = slides.get(id) || null;
                const isSelected = selectedSlides.includes(id);
                const isMultiple = selectedSlides.length > 1 && isSelected;

                const dragItem: DragItem = {
                    id,
                    data: { index, slide },
                    multiple: isMultiple,
                    selectedIds: isMultiple ? selectedSlides : undefined,
                };

                return (
                    <div
                        data-drag-id={id}
                        onMouseDown={e => onDrag(e, dragItem)}
                        draggable={true}
                        key={id}
                        className={`${classes.slideBox} ${isSelected ? classes.selected : ""}`}
                        onClick={e => handleSlideClick(id, e)}
                    >
                        {renderThumbnail(dragItem)}
                    </div>
                );
            })}
        </div>
    );
};

export default SlideBar;
