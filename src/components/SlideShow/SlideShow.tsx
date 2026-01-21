import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import classes from "./SlideShow.module.css";
import type { Slide, SlideObject } from "../../store/types/Presentation/Slide.ts";

const SlideShow: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const presentation = useAppSelector(state => state.presentation);
    const slides = Object.entries(presentation?.slides).map(([_, slide]) => slide);

    const goToPreviousSlide = () => {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1));
    };

    const fullscreen = useCallback(() => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if ((elem as any).webkitRequestFullscreen) {
            (elem as any).webkitRequestFullscreen();
        }
    }, []);

    useEffect(() => {
        fullscreen();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowLeft":
                case "PageUp":
                    goToPreviousSlide();
                    break;
                case "ArrowRight":
                case "PageDown":
                case " ":
                    goToNextSlide();
                    break;
                case "Escape":
                    e.preventDefault();
                    navigate("/ruslide/presentation");
                    break;
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [currentSlideIndex, navigate]);

    if (slides.length === 0) {
        return (
            <div className={classes.container}>
                <div className={classes.emptyState}>
                    <h2>Нет слайдов для отображения</h2>
                </div>
            </div>
        );
    }

    const currentSlide: Slide = slides[currentSlideIndex];
    const objects: SlideObject[] = Object.entries(currentSlide.objects).map(([_, obj]) => obj);

    const backgroundStyle: React.CSSProperties = {};
    if (currentSlide?.background.type === "color") {
        backgroundStyle.backgroundColor = currentSlide.background.color;
    } else if (currentSlide?.background.type === "picture") {
        backgroundStyle.backgroundImage = `url(${currentSlide?.background.src})`;
        backgroundStyle.backgroundSize = "cover";
        backgroundStyle.backgroundPosition = "center";
    }

    return (
        <div className={classes.slide} style={backgroundStyle}>
            {objects.map(object => {
                const style = {
                    position: "absolute",
                    left: `${object.position.x}px`,
                    top: `${object.position.y}px`,
                    width: `${object.size.width}px`,
                    height: `${object.size.height}px`,
                } as const;

                switch (object.type) {
                    case "text":
                        return (
                            <div
                                key={object.id}
                                style={style}
                                className={classes.textObject}
                                dangerouslySetInnerHTML={{ __html: object.content }}
                            />
                        );
                    case "image":
                        return (
                            <img
                                key={object.id}
                                src={object.src}
                                style={style}
                                className={classes.imageObject}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default SlideShow;
