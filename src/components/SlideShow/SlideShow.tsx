import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../hooks/useRedux.tsx";
import classes from "./SlideShow.module.css";
import type { Slide, SlideObject } from "../../store/types/Presentation/Slide.ts";

const SlideShow: React.FC = () => {
    const navigate = useNavigate();
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const presentation = useAppSelector(state => state.presentation);
    const slides = Object.entries(presentation?.slides).map(([_, slide]) => slide);

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
                    if (isFullscreen) {
                        exitFullscreen();
                    } else {
                        navigate("/ruslide/presentation");
                    }
                    break;
                case "F5":
                    e.preventDefault();
                    enterFullscreen();
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [currentSlideIndex, isFullscreen]);

    const goToPreviousSlide = () => {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
    };

    const goToNextSlide = () => {
        setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1));
    };

    const enterFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
            setIsFullscreen(true);
        }
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement);
    };

    useEffect(() => {
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
    }, []);

    if (slides.length === 0) {
        return (
            <div className={classes.container}>
                <div className={classes.emptyState}>
                    <h2>Нет слайдов для отображения</h2>
                    <button
                        onClick={() => navigate("/ruslide/presentation")}
                        className={classes.backButton}
                    >
                        Вернуться к редактору
                    </button>
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
        <div className={`${classes.container} ${isFullscreen ? classes.fullscreen : ""}`}>
            <div className={classes.navigation}>
                <button
                    onClick={goToPreviousSlide}
                    disabled={currentSlideIndex === 0}
                    className={classes.navButton}
                >
                    ← Назад
                </button>

                <div className={classes.slideInfo}>
                    Слайд {currentSlideIndex + 1} из {slides.length}
                </div>

                <button
                    onClick={goToNextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    className={classes.navButton}
                >
                    Вперед →
                </button>
            </div>

            <div className={classes.slideContainer}>
                <div className={classes.slide} style={backgroundStyle}>
                    {objects.map(object => {
                        const style = {
                            position: "absolute",
                            left: `${object.position.x}px`,
                            top: `${object.position.y}px`,
                            width: `${object.size.width}px`,
                            height: `${object.size.height}px`,
                        };

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
            </div>

            <div className={classes.controls}>
                <button onClick={() => navigate(-1)} className={classes.controlButton}>
                    ← Вернуться
                </button>

                {/*<div className={classes.thumbnails}>*/}
                {/*    {slides.map((slide, index) => (*/}
                {/*        <div*/}
                {/*            key={slide.id}*/}
                {/*            className={`${classes.thumbnail} ${index === currentSlideIndex ? classes.active : ""}`}*/}
                {/*            onClick={() => setCurrentSlideIndex(index)}*/}
                {/*            // style={{*/}
                {/*            //     backgroundColor: slide.background || "#ffffff",*/}
                {/*            // }}*/}
                {/*        >*/}
                {/*            <span className={classes.thumbnailNumber}>{index + 1}</span>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
                <button
                    onClick={isFullscreen ? exitFullscreen : enterFullscreen}
                    className={classes.controlButton}
                >
                    {isFullscreen ? "Выйти из полного экрана" : "Полный экран"}
                </button>
            </div>
            {/*<div className={classes.hints}>*/}
            {/*    Используйте ← → или Пробел для навигации, F5 для полного экрана, Esc для выхода*/}
            {/*</div>*/}
        </div>
    );
};

export default SlideShow;
