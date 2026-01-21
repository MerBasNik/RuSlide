import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./SlideBar.module.css";
import { SlideThumbnail } from "../../UI/SlideThumbnail/SlideThumbnail.tsx";
import { DragPreview } from "../../UI/SlideThumbnail/DragPreview.tsx";
import { useDragAndDrop } from "../../hooks/useDND.tsx";
import type { DragItem } from "../../hooks/useDND.tsx";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.tsx";
import {
    deleteSlide,
    selectSlide,
    setCurrentSlide,
    setSlidesOrder,
} from "../../store/reducers/PresentationSlice.ts";
import { usePDFExport } from "../../hooks/usePDFExport.tsx";

const SlideBar = () => {
    const selectedSlidesRef = useRef<string[]>([]);
    const widthThumbnail = 176;
    const heightThumbnail = 99;
    const dispatch = useAppDispatch();
    const presentation = useAppSelector(state => state.presentation);
    const { slidesOrder, slides, selectedSlides, currentSlide } = presentation;

    const getSlideObjects = useCallback(
        (slideId: string) => {
            const slide = slides[slideId];
            return slide ? slide.objects : {};
        },
        [slides]
    );

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Delete" && selectedSlides.length > 0) {
                const slidesToDelete = [...selectedSlides];
                dispatch(deleteSlide(slidesToDelete));
            }
        },
        [dispatch, selectedSlides]
    );

    const onDragEnd = useCallback(
        (dragIds: string[], targetId?: string) => {
            if (!targetId || dragIds.includes(targetId)) return;

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

                dispatch(setSlidesOrder(newOrder));
            }
        },
        [dispatch, slidesOrder]
    );

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

            if (event.ctrlKey || event.metaKey) {
                if (selectedSlides.includes(slideId)) {
                    newSelectedSlides = selectedSlides.filter(id => id !== slideId);
                    if (slideId === currentSlide && newSelectedSlides.length > 0) {
                        const removedIndex = selectedSlides.indexOf(slideId);
                        const newCurrentSlide =
                            newSelectedSlides[Math.max(0, removedIndex - 1)] ||
                            newSelectedSlides[0];
                        dispatch(setCurrentSlide(newCurrentSlide));
                    } else if (newSelectedSlides.length === 0) {
                        dispatch(setCurrentSlide(""));
                    }
                } else {
                    newSelectedSlides = [...selectedSlides, slideId];
                    dispatch(setCurrentSlide(slideId));
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
                    dispatch(setCurrentSlide(slideId));
                }
            } else {
                newSelectedSlides = [slideId];
                dispatch(setCurrentSlide(slideId));
            }

            selectedSlidesRef.current = newSelectedSlides;
            dispatch(selectSlide(newSelectedSlides));
            if (newSelectedSlides.length > 0) {
                dispatch(setCurrentSlide(newSelectedSlides[0]));
            }
        },
        [selectedSlides, currentSlide, dispatch, slidesOrder]
    );

    const handleSlideBarClick = useCallback(
        (event: React.MouseEvent) => {
            if (event.target === event.currentTarget) {
                dispatch(selectSlide([]));
                dispatch(setCurrentSlide(""));
            }
        },
        [dispatch]
    );

    const renderThumbnail = (dragItem: DragItem) => {
        const slide = slides[dragItem.id];
        const objects = getSlideObjects(dragItem.id);
        return (
            <SlideThumbnail
                slide={slide}
                objects={objects}
                width={widthThumbnail}
                height={heightThumbnail}
            />
        );
    };

    const { setSlidesData, exportToPDF } = usePDFExport();
    const [isExporting, setIsExporting] = useState(false);

    useEffect(() => {
        const slidesArray = slidesOrder.map(id => slides[id]).filter(Boolean);
        setSlidesData(slidesArray);
    }, [slides, slidesOrder, setSlidesData]);

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            await exportToPDF("моя_презентация.pdf");
        } catch (error) {
            alert("Не удалось экспортировать PDF. Проверьте консоль для деталей.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className={classes.slideBar} onClick={handleSlideBarClick}>
            <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className={classes.exportButton}
            >
                {isExporting ? "Экспортируем..." : "Скачать PDF"}
            </button>

            <DragPreview
                visible={dragPreview.visible}
                position={{
                    x: dragPreview.x,
                    y: dragPreview.y,
                }}
                width={widthThumbnail}
                height={heightThumbnail}
                item={dragPreview.item}
                renderThumbnail={renderThumbnail}
            />

            {slidesOrder.map((id, index) => {
                const slide = slides[id];
                if (!slide) return null;

                const isSelected = selectedSlides.includes(id);
                const isMultiple = selectedSlides.length > 1 && isSelected;

                const dragItem: DragItem = {
                    id,
                    data: { index, slide },
                    multiple: isMultiple,
                    selectedIds: isMultiple ? selectedSlides : undefined,
                };

                return (
                    <div key={id} className={classes.container}>
                        <div className={classes.slideNumber}>{index + 1}</div>
                        <div
                            data-drag-id={id}
                            onClick={e => handleSlideClick(id, e)}
                            onMouseDown={e => onDrag(e, dragItem)}
                            className={`${classes.slideBox} ${isSelected ? classes.selected : ""}`}
                            style={{
                                width: `${widthThumbnail}px`,
                                height: `${heightThumbnail}px`,
                                cursor: "grab",
                            }}
                        >
                            {renderThumbnail(dragItem)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SlideBar;
