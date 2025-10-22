import classes from "./SlideBar.module.css";
import { deleteObject, type Slide } from "../../store/types/Presentation/Slide.ts";
import { dispatch } from "../../store/StoreEditor/Editor.tsx";
import {
    deleteSlide,
    type Presentation,
    selectSlide,
} from "../../store/types/Presentation/Presentation.ts";
import { useCallback, useEffect, useState, useRef } from "react";
import { SlideThumbnail } from "./SlideThumbnail.tsx";

type SlideBarProps = {
    editor: Presentation;
    slides: Array<Slide>;
};

const SlideBar = ({ editor, slides }: SlideBarProps) => {
    const [currentSlide, setCurrentSlide] = useState("");
    const [slidesOrder, setSlidesOrder] = useState(editor.slidesOrder);
    useEffect(() => {
        setSlidesOrder(editor.slidesOrder);
    }, [editor.slidesOrder]);

    const selectedSlidesRef = useRef<string[]>([]);
    const getSlideObjects = useCallback(
        (slideId: string) => {
            const slide = editor.slides.get(slideId);
            const objects = Array.from(slide?.objects?.values() || []);
            return objects;
        },
        [slides]
    );

    const handleClick = useCallback(
        (id: string) => {
            if (editor) {
                setCurrentSlide(id);
                dispatch(selectSlide, { editor, data: [id] });
                selectedSlidesRef.current = [id];
            }
        },
        [editor]
    );
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Delete" && currentSlide) {
                dispatch(deleteSlide, { editor: editor, data: [currentSlide] });
                setSlidesOrder(prev => prev.filter(id => id !== currentSlide));
            }
            if (event.key === "Backspace" && currentSlide) {
                const currentSlideData = editor.slides.get(currentSlide);
                const objId = currentSlideData?.selectedObjects[0];
                if (objId) {
                    dispatch(deleteObject, { editor: editor, data: [currentSlide, objId] });
                }
            }
        },
        [currentSlide, editor]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    function dragStartHandler(e: React.DragEvent<HTMLDivElement>, id: string) {
        setCurrentSlide(id);
        e.dataTransfer.setData("text/plain", id);
    }
    function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = "none";
    }
    function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.currentTarget.style.boxShadow = "0 4px 3px gray";
    }
    function dropHandler(e: React.DragEvent<HTMLDivElement>, id: string) {
        e.preventDefault();
        e.currentTarget.style.boxShadow = "none";

        const draggedId = e.dataTransfer.getData("text/plain");
        const currIndex = slidesOrder.indexOf(draggedId);
        const dropIndex = slidesOrder.indexOf(id);

        if (currIndex === dropIndex || currIndex === -1) return;

        const newSlideOrder = [...slidesOrder];
        newSlideOrder.splice(currIndex, 1);
        newSlideOrder.splice(dropIndex, 0, draggedId);
        setSlidesOrder(newSlideOrder);
    }
    function dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
        e.currentTarget.style.boxShadow = "none";
    }

    return (
        <div className={classes.slideBar}>
            {slidesOrder.map((id, index) => {
                const slide = slides.find(s => s.id === id);
                const objects = getSlideObjects(id);

                return (
                    <div
                        onDragStart={e => dragStartHandler(e, id)}
                        onDragLeave={dragLeaveHandler}
                        onDragEnd={dragEndHandler}
                        onDragOver={dragOverHandler}
                        onDrop={e => dropHandler(e, id)}
                        draggable={true}
                        key={id}
                        className={`${classes.slideBox} ${id === currentSlide ? classes.selected : ""}`}
                    >
                        <div className={classes.slideNumber}>{index + 1}</div>
                        <div className={classes.thumbnailContainer} onClick={() => handleClick(id)}>
                            <SlideThumbnail
                                slide={slide!}
                                objects={objects}
                                width={120}
                                height={80}
                                className={classes.thumbnail}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SlideBar;
